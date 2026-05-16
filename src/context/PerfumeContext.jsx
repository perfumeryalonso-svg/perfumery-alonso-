import { createContext, useState, useContext, useCallback } from 'react';
import { perfumeService } from '../services/perfumeService';

/* eslint react-refresh/only-export-components: "off" */

const PerfumeContext = createContext();

export const PerfumeProvider = ({ children }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPerfumes = useCallback(async (page = 1, limit = 6) => {
    setLoading(true);
    setError(null);
    try {
      const response = await perfumeService.getPerfumes(page, limit);
      setPerfumes(response.data.data.perfumes);
      setPagination(response.data.data.pagination);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch perfumes';
      setError(message);
      console.error('Error fetching perfumes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPerfumesByCategory = useCallback(async (categoria, page = 1, limit = 6) => {
    setLoading(true);
    setError(null);
    try {
      const response = await perfumeService.getPerfumesByCategory(categoria, page, limit);
      setPerfumes(response.data.data.perfumes);
      setPagination(response.data.data.pagination);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch perfumes';
      setError(message);
      console.error('Error fetching perfumes by category:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    perfumes,
    pagination,
    loading,
    error,
    fetchPerfumes,
    fetchPerfumesByCategory
  };

  return (
    <PerfumeContext.Provider value={value}>
      {children}
    </PerfumeContext.Provider>
  );
};

export const usePerfume = () => {
  const context = useContext(PerfumeContext);
  if (!context) {
    throw new Error('usePerfume must be used within PerfumeProvider');
  }
  return context;
};
