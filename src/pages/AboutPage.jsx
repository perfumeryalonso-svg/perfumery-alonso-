import { Container, Button } from '../components/common/BaseComponents';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <div className="pt-24 pb-20">
      <Container>
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6">About LUXE PERFUMS</h1>
          <p className="text-xl text-luxury-muted max-w-2xl mx-auto">
            Discover the art of fine fragrance crafted for those who appreciate excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-light mb-6">Our Story</h2>
            <p className="text-luxury-muted mb-4 leading-relaxed">
              At LUXE PERFUMS, we believe that fragrance is more than just a scent—it's an experience, 
              a memory, and an expression of individuality. Our collection features carefully curated 
              premium luxury perfumes from the world's most prestigious brands.
            </p>
            <p className="text-luxury-muted mb-6 leading-relaxed">
              Each fragrance in our catalog has been selected for its exceptional quality, unique composition, 
              and ability to elevate the everyday moments of the discerning individual. We partner only with 
              the finest perfumeries to ensure every bottle meets our exacting standards.
            </p>
            <p className="text-luxury-muted leading-relaxed">
              Our mission is simple: to make premium luxury fragrances accessible to those who demand nothing 
              but the best. Whether you're seeking a signature scent or exploring new olfactory horizons, 
              LUXE PERFUMS is your gateway to the world of fine fragrance.
            </p>
          </div>

          {/* Values */}
          <div className="space-y-8">
            <div className="card-luxury p-8">
              <h3 className="text-2xl font-light mb-4 text-luxury-gold">Premium Quality</h3>
              <p className="text-luxury-muted">
                Every fragrance is verified for authenticity and quality, ensuring you receive genuine luxury products.
              </p>
            </div>
            <div className="card-luxury p-8">
              <h3 className="text-2xl font-light mb-4 text-luxury-gold">Expert Curation</h3>
              <p className="text-luxury-muted">
                Our collection is carefully hand-selected by fragrance experts with decades of experience.
              </p>
            </div>
            <div className="card-luxury p-8">
              <h3 className="text-2xl font-light mb-4 text-luxury-gold">Exceptional Service</h3>
              <p className="text-luxury-muted">
                From consultation to delivery, we're committed to providing an experience as luxurious as our products.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-light mb-8">Ready to Explore?</h2>
          <Link to="/">
            <Button variant="primary" className="text-lg px-8 py-4">
              Browse Our Collection
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};
