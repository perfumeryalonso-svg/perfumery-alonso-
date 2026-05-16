import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { perfumeService } from '../services/perfumeService';
import { Container, Button, Input, Loading, Card } from '../components/common/BaseComponents';

/* eslint react-hooks/set-state-in-effect: "off" */

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, admin } = useAuth();
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    ml: '',
    categoria: '',
    imagen_url: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchPerfumes = async () => {
    try {
      const response = await perfumeService.getPerfumes(1, 100);
      setPerfumes(response.data.data.perfumes);
    } catch {
      setFormError('Failed to load perfumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchPerfumes();
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setFormError('Image file is too large. Maximum size is 5MB.');
        return;
      }

      // Read and compress image
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create canvas and compress
          const canvas = document.createElement('canvas');
          const maxWidth = 600;
          const maxHeight = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Get compressed base64 with quality reduction
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
          setImagePreview(compressedBase64);
          setFormData(prev => ({ ...prev, imagen_url: compressedBase64 }));
          setFormError('');
        };
        img.onerror = () => {
          setFormError('Failed to load image. Please try another file.');
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');

    // Detailed field validation
    const missingFields = [];
    if (!formData.nombre || formData.nombre.trim() === '') missingFields.push('name');
    if (!formData.descripcion || formData.descripcion.trim() === '') missingFields.push('description');
    if (!formData.precio) missingFields.push('price');
    if (!formData.ml) missingFields.push('volume');
    if (!formData.categoria || formData.categoria.trim() === '') missingFields.push('category');
    if (!imagePreview) missingFields.push('image');

    if (missingFields.length > 0) {
      setFormError(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate price is a positive number
    const precioNum = parseFloat(formData.precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      setFormError('Price must be a positive number');
      return;
    }

    // Validate ml is a positive number
    const mlNum = parseInt(formData.ml);
    if (isNaN(mlNum) || mlNum <= 0) {
      setFormError('Volume must be a positive number');
      return;
    }

    try {
      const perfumeData = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        precio: precioNum,
        ml: mlNum,
        categoria: formData.categoria.trim(),
        imagen_url: imagePreview
      };

      if (editingId) {
        await perfumeService.updatePerfume(editingId, perfumeData);
        setSuccessMessage('Perfume updated successfully!');
      } else {
        const createResponse = await perfumeService.createPerfume(perfumeData);
        console.log('Perfume created:', createResponse);
        setSuccessMessage('Perfume created successfully!');
      }
      
      // Clear form
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        ml: '',
        categoria: '',
        imagen_url: ''
      });
      setImagePreview('');
      setEditingId(null);
      setShowForm(false);
      
      // Refresh list immediately
      try {
        setLoading(true);
        const response = await perfumeService.getPerfumes(1, 100);
        console.log('Perfumes refreshed:', response.data.data.perfumes);
        setPerfumes(response.data.data.perfumes);
      } catch (fetchErr) {
        console.error('Error refreshing perfumes:', fetchErr);
        setFormError('Perfume saved but error refreshing list');
      } finally {
        setLoading(false);
      }
      
      // Show message for 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving perfume:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Operation failed';
      setFormError(errorMsg);
    }
  };

  const handleEdit = (perfume) => {
    setFormData({
      nombre: perfume.nombre,
      descripcion: perfume.descripcion,
      precio: String(perfume.precio),
      ml: String(perfume.ml),
      categoria: perfume.categoria,
      imagen_url: perfume.imagen_url
    });
    setImagePreview(perfume.imagen_url);
    setEditingId(perfume.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this perfume?')) {
      try {
        await perfumeService.deletePerfume(id);
        setSuccessMessage('Perfume deleted successfully!');
        
        // Refresh list immediately
        try {
          setLoading(true);
          const response = await perfumeService.getPerfumes(1, 100);
          setPerfumes(response.data.data.perfumes);
        } catch (fetchErr) {
          console.error('Error refreshing perfumes:', fetchErr);
          setFormError('Perfume deleted but error refreshing list');
        } finally {
          setLoading(false);
        }
        
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Error deleting:', err);
        setFormError('Error deleting perfume');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      ml: '',
      categoria: '',
      imagen_url: ''
    });
    setImagePreview('');
    setFormError('');
  };

  return (
    <div className="pt-24 pb-20">
      <Container>
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500 bg-opacity-10 border border-green-500 rounded-lg text-green-500 text-center">
            {successMessage}
          </div>
        )}
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-light mb-2">Admin Dashboard</h1>
          <p className="text-luxury-muted">Welcome, {admin?.email}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            {showForm ? (
              <Card className="p-6 lg:p-8 sticky top-28">
                <h2 className="text-2xl font-light mb-6">
                  {editingId ? 'Edit Perfume' : 'Add New Perfume'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Name"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Perfume name"
                    required
                  />

                  <Input
                    label="Description"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Product description"
                    required
                  />

                  <Input
                    label="Price"
                    name="precio"
                    type="number"
                    step="0.01"
                    value={formData.precio}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />

                  <Input
                    label="Volume (ml)"
                    name="ml"
                    type="number"
                    value={formData.ml}
                    onChange={handleInputChange}
                    placeholder="100"
                    required
                  />

                  <Input
                    label="Category"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    placeholder="e.g., Eau de Parfum"
                    required
                  />

                  <div>
                    <label className="block text-luxury-base font-light mb-2">Product Image <span className="text-red-500">*</span></label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 bg-luxury-dark border border-luxury-gold border-opacity-20 rounded-luxury text-luxury-text focus:outline-none focus:border-luxury-gold focus:border-opacity-50 transition-colors text-sm"
                        required={!editingId}
                      />
                      {imagePreview && (
                        <div className="relative w-full h-40 rounded-luxury overflow-hidden border border-luxury-gold border-opacity-20">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <p className="text-luxury-muted text-luxury-sm">
                        {imagePreview ? 'Image ready to upload' : 'Select an image from your computer'}
                      </p>
                    </div>
                  </div>

                  {formError && (
                    <div className="p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-luxury text-red-500 text-luxury-sm flex items-start justify-between">
                      <span>{formError}</span>
                      <button
                        type="button"
                        onClick={() => setFormError('')}
                        className="ml-2 text-red-500 hover:text-red-400 font-bold text-lg leading-none"
                        aria-label="Close error"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button variant="primary" type="submit" className="flex-1">
                      {editingId ? 'Update' : 'Create'}
                    </Button>
                    <Button variant="ghost" onClick={handleCancel} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            ) : (
              <Card className="p-6 lg:p-8 text-center">
                <p className="text-luxury-muted mb-6">Ready to add a new perfume to your collection?</p>
                <Button 
                  variant="primary" 
                  onClick={() => setShowForm(true)}
                  className="w-full"
                >
                  + Add Perfume
                </Button>
              </Card>
            )}
          </div>

          {/* Perfumes List */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light">Products ({perfumes.length})</h2>
            </div>

            {loading ? (
              <Loading />
            ) : perfumes.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-luxury-muted">No perfumes yet. Create your first product!</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {perfumes.map(perfume => (
                  <Card key={perfume.id} className="p-4 lg:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    {perfume.imagen_url && (
                      <div className="w-full sm:w-24 h-24 rounded-luxury overflow-hidden flex-shrink-0 border border-luxury-gold border-opacity-20">
                        <img 
                          src={perfume.imagen_url} 
                          alt={perfume.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow w-full">
                      <h3 className="text-lg lg:text-xl font-light mb-1">{perfume.nombre}</h3>
                      <p className="text-luxury-muted text-sm mb-2 line-clamp-2">{perfume.descripcion}</p>
                      <div className="flex flex-wrap gap-3 lg:gap-4 text-sm">
                        <span className="text-luxury-gold font-light">${perfume.precio.toFixed(2)}</span>
                        <span className="text-luxury-muted">{perfume.ml}ml</span>
                        <span className="text-luxury-muted text-xs lg:text-sm bg-luxury-dark bg-opacity-50 px-2 py-1 rounded">{perfume.categoria}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleEdit(perfume)}
                        className="flex-1 sm:flex-initial"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(perfume.id)}
                        className="flex-1 sm:flex-initial"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
