import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-luxury-dark bg-opacity-95 backdrop-blur-luxury z-50 border-b border-luxury-gold border-opacity-10">
      <div className="container-luxury px-6 py-4 flex items-center justify-between gap-4 lg:gap-8 min-h-20">
        {/* Logo */}
        <Link to="/" className="text-lg lg:text-xl font-light tracking-wide hover:text-luxury-gold transition-colors flex-shrink-0 whitespace-nowrap">
          LUXE PERFUMS
        </Link>

        {/* Center Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6 lg:gap-8">
          <Link to="/" className="text-sm font-light hover:text-luxury-gold transition-colors">
            Catalog
          </Link>
          <Link to="/about" className="text-sm font-light hover:text-luxury-gold transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-light hover:text-luxury-gold transition-colors">
            Contact
          </Link>
        </div>

        {/* Admin Button - Always visible with proper spacing */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0 ml-auto">
            <Link 
              to="/admin/dashboard" 
              className="px-3 lg:px-4 py-2 border border-luxury-gold text-luxury-gold text-xs font-light rounded hover:bg-luxury-gold hover:text-luxury-dark transition-colors whitespace-nowrap"
            >
              Dashboard
            </Link>
            <button 
              onClick={logout}
              className="hidden sm:inline-block px-3 lg:px-4 py-2 text-luxury-text border border-luxury-text text-xs font-light rounded hover:border-luxury-gold hover:text-luxury-gold transition-colors whitespace-nowrap"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/admin/login" 
            className="px-5 lg:px-6 py-2.5 bg-luxury-gold text-luxury-dark text-xs lg:text-sm font-semibold rounded hover:shadow-lg transition-shadow flex-shrink-0 ml-auto whitespace-nowrap"
          >
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-card border-t border-luxury-gold border-opacity-10 mt-20">
      <div className="container-luxury py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-luxury-lg font-light mb-4">LUXE PERFUMS</h3>
            <p className="text-luxury-muted text-luxury-sm">Premium luxury perfume collection for the discerning individual.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-luxury-base font-light mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-luxury-muted hover:text-luxury-gold transition-colors">Home</a></li>
              <li><a href="/" className="text-luxury-muted hover:text-luxury-gold transition-colors">Catalog</a></li>
              <li><a href="#about" className="text-luxury-muted hover:text-luxury-gold transition-colors">About</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-luxury-base font-light mb-4">Contact</h4>
            <ul className="space-y-2 text-luxury-muted text-luxury-sm">
              <li><a href="mailto:perfumeryalonso@gmail.com" className="hover:text-luxury-gold transition-colors">perfumeryalonso@gmail.com</a></li>
              <li><a href="https://wa.me/12247031962" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors">WhatsApp: +1 (224) 703-1962</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-luxury-base font-light mb-4">Follow</h4>
            <ul className="space-y-2">
              <li><a href="https://www.instagram.com/perfumeryalonso?igsh=MXdoY3V0OHFsaDM3dA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-luxury-muted hover:text-luxury-gold transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="divider-luxury my-8"></div>

        <div className="text-center">
          <p className="text-luxury-muted text-luxury-sm">
            © {currentYear} LUXE PERFUMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
