import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { perfumeService } from '../services/perfumeService';
import { Container, Button, Loading, Empty } from '../components/common/BaseComponents';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfume = async () => {
      try {
        const response = await perfumeService.getPerfumeById(id);
        setPerfume(response.data.data);
      } catch {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchPerfume();
  }, [id]);

  const handleWhatsAppClick = () => {
    if (!perfume) return;
    const message = `Hello, I am interested in the perfume ${perfume.nombre} (${perfume.ml}ml) priced at $${perfume.precio.toFixed(2)}. Could you help me with this order?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/12247031962?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) return <div className="pt-24"><Loading /></div>;
  if (error || !perfume) return <div className="pt-24 container-luxury text-center"><Empty message={error || 'Product not found'} /></div>;

  return (
    <div className="pt-24 pb-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="sticky top-32 h-fit">
            <div className="aspect-square bg-luxury-card rounded-luxury overflow-hidden shadow-luxury-lg mb-6">
              <img
                src={perfume.imagen_url}
                alt={perfume.nombre}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <span className="text-luxury-xs font-light tracking-widest text-luxury-gold uppercase">
              {perfume.categoria}
            </span>

            <h1 className="text-5xl font-light mt-4 mb-6">{perfume.nombre}</h1>

            <div className="divider-luxury my-6"></div>

            <p className="text-luxury-lg text-luxury-muted mb-8 leading-relaxed">
              {perfume.descripcion}
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between p-6 bg-luxury-card rounded-luxury border border-luxury-gold border-opacity-10">
                <span className="text-luxury-base text-luxury-muted">Volume</span>
                <span className="text-luxury-2xl font-light">{perfume.ml}ml</span>
              </div>

              <div className="flex items-center justify-between p-6 bg-luxury-card rounded-luxury border border-luxury-gold border-opacity-10">
                <span className="text-luxury-base text-luxury-muted">Price</span>
                <span className="text-luxury-3xl font-light text-luxury-gold">${perfume.precio.toFixed(2)}</span>
              </div>
            </div>

            <div className="divider-luxury my-8"></div>

            <div className="flex gap-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleWhatsAppClick}
                className="flex-1 gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.967 1.523 9.916 9.916 0 00-6.118 9.272 9.924 9.924 0 001.563 4.928l-1.657 6.035 6.222-1.631a9.902 9.902 0 004.757 1.212h.004c5.45 0 9.885-4.434 9.885-9.885 0-2.641-1.035-5.116-2.923-6.993-1.888-1.877-4.363-2.911-6.97-2.911"/>
                </svg>
                Order via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
