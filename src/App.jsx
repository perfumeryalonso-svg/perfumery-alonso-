import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PerfumeProvider } from './context/PerfumeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar, Footer } from './components/common/Navigation';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <PerfumeProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboardPage />
                      </ProtectedRoute>
                    } 
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<div className="pt-32"><div className="text-center"><h1 className="text-4xl font-light mb-4">Page Not Found</h1></div></div>} />
                </Routes>
              </main>

              <Footer />
            </div>
          </PerfumeProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
