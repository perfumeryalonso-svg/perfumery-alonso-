export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'btn-luxury transition-all duration-300';
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`card-luxury ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Input = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-luxury-sm font-light mb-2">
          {label}
        </label>
      )}
      <input 
        className={`input-luxury ${className} ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-luxury-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export const Container = ({ children, className = '' }) => {
  return (
    <div className={`container-luxury ${className}`}>
      {children}
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin">
        <div className="h-12 w-12 border-4 border-luxury-gold border-t-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export const Empty = ({ message = 'No data found' }) => {
  return (
    <div className="text-center py-12">
      <p className="text-luxury-muted text-luxury-lg">{message}</p>
    </div>
  );
};
