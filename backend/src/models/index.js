import pool from '../config/database.js';

const mapPerfume = (perfume) => {
  if (!perfume) return null;
  return {
    ...perfume,
    precio: parseFloat(perfume.precio),
    ml: parseInt(perfume.ml, 10)
  };
};

export const Perfume = {
  async create(perfumeData) {
    const { nombre, descripcion, precio, ml, categoria, imagen_url } = perfumeData;
    const query = `
      INSERT INTO perfumes (nombre, descripcion, precio, ml, categoria, imagen_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;
    const [result] = await pool.execute(query, [nombre, descripcion, precio, ml, categoria, imagen_url]);
    return result;
  },

  async getAll(page = 1, limit = 6) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 6);
    const offsetNum = (pageNum - 1) * limitNum;
    
    console.log(`📄 Paginación: page=${pageNum}, limit=${limitNum}, offset=${offsetNum}`);
    
    const query = `
      SELECT * FROM perfumes
      ORDER BY created_at DESC
      LIMIT ${limitNum} OFFSET ${offsetNum}
    `;
    const [perfumes] = await pool.query(query);
    
    const countQuery = 'SELECT COUNT(*) as total FROM perfumes';
    const [countResult] = await pool.query(countQuery);
    const total = countResult[0].total;

    return { perfumes: perfumes.map(mapPerfume), total, pages: Math.ceil(total / limitNum) };
  },

  async getById(id) {
    const query = 'SELECT * FROM perfumes WHERE id = ?';
    const [perfumes] = await pool.execute(query, [id]);
    return mapPerfume(perfumes[0]) || null;
  },

  async getByCategory(categoria, page = 1, limit = 6) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 6);
    const offsetNum = (pageNum - 1) * limitNum;
    
    console.log(`📂 Categoría: ${categoria}, page=${pageNum}, limit=${limitNum}`);
    
    const query = `
      SELECT * FROM perfumes
      WHERE categoria = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    const [perfumes] = await pool.execute(query, [categoria, limitNum, offsetNum]);
    
    const countQuery = `SELECT COUNT(*) as total FROM perfumes WHERE categoria = ?`;
    const [countResult] = await pool.execute(countQuery, [categoria]);
    const total = countResult[0].total;

    return { perfumes: perfumes.map(mapPerfume), total, pages: Math.ceil(total / limitNum) };
  },

  async update(id, perfumeData) {
    const { nombre, descripcion, precio, ml, categoria, imagen_url } = perfumeData;
    const query = `
      UPDATE perfumes
      SET nombre = ?, descripcion = ?, precio = ?, ml = ?, categoria = ?, imagen_url = ?
      WHERE id = ?
    `;
    const [result] = await pool.execute(query, [nombre, descripcion, precio, ml, categoria, imagen_url, id]);
    return result;
  },

  async delete(id) {
    const query = 'DELETE FROM perfumes WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result;
  }
};

export const Admin = {
  async create(adminData) {
    const { email, password } = adminData;
    const query = `
      INSERT INTO admins (email, password, created_at)
      VALUES (?, ?, NOW())
    `;
    const [result] = await pool.execute(query, [email, password]);
    return result;
  },

  async getByEmail(email) {
    const query = 'SELECT * FROM admins WHERE email = ?';
    const [admins] = await pool.execute(query, [email]);
    return admins[0] || null;
  },

  async getById(id) {
    const query = 'SELECT id, email FROM admins WHERE id = ?';
    const [admins] = await pool.execute(query, [id]);
    return admins[0] || null;
  }
};
