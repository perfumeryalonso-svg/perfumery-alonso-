import { Link } from 'react-router-dom';
import { Button } from './BaseComponents';

export const PerfumeCard = ({ perfume }) => {
  const { id, nombre, descripcion, precio, ml, categoria, imagen_url } = perfume;

  const handleWhatsAppClick = () => {
    const message = `Hello, I am interested in the perfume ${nombre} ${ml}ml. Can you help me?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/12247031962?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="card-luxury group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-luxury-dark h-80 mb-6">
        <img
          src={imagen_url}
          alt={nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-6 pb-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="text-luxury-xs font-light tracking-widest text-luxury-gold uppercase">
            {categoria}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-luxury-xl font-light mb-2 line-clamp-2">
          {nombre}
        </h3>

        {/* Description */}
        <p className="text-luxury-muted text-luxury-sm mb-4 flex-grow line-clamp-3">
          {descripcion}
        </p>

        {/* ML Badge */}
        <div className="mb-4 inline-flex">
          <span className="text-luxury-sm font-light border border-luxury-gold border-opacity-30 rounded-luxury px-3 py-1">
            {ml}ml
          </span>
        </div>

        {/* Divider */}
        <div className="divider-luxury my-4"></div>

        {/* Price and Buttons */}
        <div className="space-y-3">
          <div className="text-luxury-2xl font-light text-luxury-gold">
            ${precio.toFixed(2)}
          </div>

          <div className="flex gap-3">
            <Link 
              to={`/product/${id}`}
              className="flex-1"
            >
              <Button variant="secondary" className="w-full">
                View Details
              </Button>
            </Link>
            <Button 
              variant="primary"
              onClick={handleWhatsAppClick}
              title="Order via WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.967 1.523 9.916 9.916 0 00-6.118 9.272 9.924 9.924 0 001.563 4.928l-1.657 6.035 6.222-1.631a9.902 9.902 0 004.757 1.212h.004c5.45 0 9.885-4.434 9.885-9.885 0-2.641-1.035-5.116-2.923-6.993-1.888-1.877-4.363-2.911-6.97-2.911"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
