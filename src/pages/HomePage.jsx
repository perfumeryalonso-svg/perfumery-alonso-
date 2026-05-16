import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePerfume } from '../context/PerfumeContext';
import { Container, Button, Loading, Empty } from '../components/common/BaseComponents';
import { PerfumeCard } from '../components/common/PerfumeCard';

export const HomePage = () => {
  const navigate = useNavigate();
  const catalogRef = useRef(null);
  const { perfumes, pagination, loading, fetchPerfumes } = usePerfume();

  useEffect(() => {
    fetchPerfumes(1, 6);
  }, [fetchPerfumes]);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageChange = (newPage) => {
    fetchPerfumes(newPage, 6);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-luxury-dark via-luxury-card to-luxury-dark flex items-center justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-luxury-gold rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-luxury-gold rounded-full blur-3xl opacity-10"></div>
        </div>

        <Container className="relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-6 animate-fade-in">
            LUXE<span className="text-luxury-gold"> PERFUMS</span>
          </h1>
          <p className="text-luxury-lg text-luxury-muted mb-12 max-w-2xl mx-auto animate-slide-up">
            Discover the finest collection of premium luxury perfumes crafted for the discerning individual who demands excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={scrollToCatalog}>
              Explore Collection
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/about')}>
              Learn More
            </Button>
          </div>
        </Container>
      </section>

      {/* Catalog Section */}
      <section className="py-20" ref={catalogRef}>
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-4">Our Collection</h2>
            <div className="divider-luxury max-w-32 mx-auto my-6"></div>
            <p className="text-luxury-muted text-luxury-base max-w-2xl mx-auto">
              Handpicked selections from the world's most prestigious perfume houses
            </p>
          </div>

          {loading ? (
            <Loading />
          ) : perfumes.length === 0 ? (
            <Empty message="No perfumes available" />
          ) : (
            <>
              <div className="grid-luxury mb-12">
                {perfumes.map((perfume) => (
                  <PerfumeCard key={perfume.id} perfume={perfume} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.total > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => handlePageChange(pagination.current - 1)}
                    disabled={pagination.current === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: pagination.total }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-luxury font-light transition-all ${
                          page === pagination.current
                            ? 'bg-luxury-gold text-luxury-dark'
                            : 'border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => handlePageChange(pagination.current + 1)}
                    disabled={pagination.current === pagination.total}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
};
