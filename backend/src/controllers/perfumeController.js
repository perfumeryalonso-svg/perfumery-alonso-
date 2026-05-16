import { Perfume } from '../models/index.js';
import { HTTP_STATUS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../config/constants.js';

export const getPerfumes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const { perfumes, total, pages } = await Perfume.getAll(page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.FETCHED,
      data: {
        perfumes,
        pagination: {
          current: page,
          total: pages,
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPerfumesByCategory = async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const { perfumes, total, pages } = await Perfume.getByCategory(categoria, page, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.FETCHED,
      data: {
        perfumes,
        pagination: {
          current: page,
          total: pages,
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPerfumeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const perfume = await Perfume.getById(id);

    if (!perfume) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.PERFUME_NOT_FOUND
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.FETCHED,
      data: perfume
    });
  } catch (error) {
    next(error);
  }
};

export const createPerfume = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, ml, categoria, imagen_url } = req.body;

    // Validación detallada de campos requeridos
    const missingFields = [];
    if (!nombre || nombre.trim() === '') missingFields.push('nombre');
    if (!descripcion || descripcion.trim() === '') missingFields.push('descripcion');
    if (!precio) missingFields.push('precio');
    if (!ml) missingFields.push('ml');
    if (!categoria || categoria.trim() === '') missingFields.push('categoria');
    if (!imagen_url) missingFields.push('imagen_url');

    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields: missingFields
      });
    }

    // Validaciones de tipo
    const precioNum = parseFloat(precio);
    const mlNum = parseInt(ml, 10);
    
    if (isNaN(precioNum) || precioNum <= 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Price must be a positive number'
      });
    }

    if (isNaN(mlNum) || mlNum <= 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Volume must be a positive number'
      });
    }

    const result = await Perfume.create({
      nombre,
      descripcion,
      precio: precioNum,
      ml: mlNum,
      categoria,
      imagen_url
    });

    console.log('✅ Perfume created with ID:', result.insertId);

    // Obtener el perfume que se acaba de crear
    const newPerfume = await Perfume.getById(result.insertId);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.CREATED,
      data: newPerfume
    });
  } catch (error) {
    console.error('❌ Error creating perfume:', error);
    next(error);
  }
};

export const updatePerfume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, ml, categoria, imagen_url } = req.body;

    const perfume = await Perfume.getById(id);
    if (!perfume) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.PERFUME_NOT_FOUND
      });
    }

    await Perfume.update(id, {
      nombre: nombre || perfume.nombre,
      descripcion: descripcion || perfume.descripcion,
      precio: precio || perfume.precio,
      ml: ml || perfume.ml,
      categoria: categoria || perfume.categoria,
      imagen_url: imagen_url || perfume.imagen_url
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.UPDATED
    });
  } catch (error) {
    next(error);
  }
};

export const deletePerfume = async (req, res, next) => {
  try {
    const { id } = req.params;

    const perfume = await Perfume.getById(id);
    if (!perfume) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.PERFUME_NOT_FOUND
      });
    }

    await Perfume.delete(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.DELETED
    });
  } catch (error) {
    next(error);
  }
};
