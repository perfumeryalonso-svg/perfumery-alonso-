import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Button, Input } from '../components/common/BaseComponents';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);
    setFormError('');

    // Validación de campos requeridos
    if (!formData.email || !formData.password) {
      setFormError('Email and password are required');
      setShowError(true);
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      setShowError(true);
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setFormError(err.response?.data?.message || 'Login failed');
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-dark via-luxury-card to-luxury-dark flex items-center justify-center pt-32">
      <Container className="max-w-md w-full">
        <div className="card-luxury p-8">
          <h1 className="text-4xl font-light text-center mb-2">Admin Portal</h1>
          <p className="text-center text-luxury-muted mb-8">Manage your perfume catalog</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            {showError && (formError || error) && (
              <div className="p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-luxury text-red-500 text-luxury-sm flex items-start justify-between">
                <span>{formError || error}</span>
                <button
                  type="button"
                  onClick={() => setShowError(false)}
                  className="ml-2 text-red-500 hover:text-red-400 font-bold text-lg leading-none"
                  aria-label="Close error"
                >
                  ✕
                </button>
              </div>
            )}

            <Button 
              variant="primary" 
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-luxury-muted text-luxury-sm mt-6">
            Don't have an account? Contact the administrator
          </p>
        </div>
      </Container>
    </div>
  );
};
