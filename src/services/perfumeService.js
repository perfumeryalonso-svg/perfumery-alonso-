import api from './api';

export const perfumeService = {
  // Public endpoints
  getPerfumes: (page = 1, limit = 6) =>
    api.get('/perfumes', { params: { page, limit } }),

  getPerfumeById: (id) =>
    api.get(`/perfumes/${id}`),

  getPerfumesByCategory: (categoria, page = 1, limit = 6) =>
    api.get(`/perfumes/category/${categoria}`, { params: { page, limit } }),

  // Admin endpoints
  createPerfume: (perfumeData) =>
    api.post('/perfumes', perfumeData),

  updatePerfume: (id, perfumeData) =>
    api.put(`/perfumes/${id}`, perfumeData),

  deletePerfume: (id) =>
    api.delete(`/perfumes/${id}`)
};

export const authService = {
  register: (email, password) =>
    api.post('/auth/register', { email, password }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }
};

export default {
  perfumeService,
  authService
};
