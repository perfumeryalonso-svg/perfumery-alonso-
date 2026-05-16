import { useState } from 'react';
import { Container, Button, Input } from '../components/common/BaseComponents';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend service
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="pt-24 pb-20">
      <Container className="max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light mb-6">Get in Touch</h1>
          <p className="text-xl text-luxury-muted">
            Have questions about our fragrances? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light mb-4 text-luxury-gold">Direct Contact</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-luxury-muted mb-2">Email</p>
                  <a href="mailto:perfumeryalonso@gmail.com" className="text-luxury-text hover:text-luxury-gold transition-colors text-lg">
                    perfumeryalonso@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-luxury-muted mb-2">WhatsApp</p>
                  <a href="https://wa.me/12247031962" target="_blank" rel="noopener noreferrer" className="text-luxury-text hover:text-luxury-gold transition-colors text-lg">
                    +1 (224) 703-1962
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4 text-luxury-gold">Business Hours</h3>
              <p className="text-luxury-muted mb-2">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p className="text-luxury-muted">Saturday: 10:00 AM - 4:00 PM EST</p>
              <p className="text-luxury-muted">Sunday: Closed</p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4 text-luxury-gold">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/perfumeryalonso?igsh=MXdoY3V0OHFsaDM3dA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-luxury-muted hover:text-luxury-gold transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-luxury p-8">
            <h3 className="text-2xl font-light mb-6">Send us a Message</h3>
            {submitted ? (
              <div className="p-6 bg-green-500 bg-opacity-10 border border-green-500 rounded-luxury text-green-500 text-center">
                <p className="text-lg font-light mb-2">Thank you for your message!</p>
                <p className="text-sm">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />

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
                  label="Phone (Optional)"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />

                <div>
                  <label className="block text-luxury-base font-light mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    required
                    className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gold border-opacity-20 rounded-luxury text-luxury-text placeholder-luxury-muted focus:outline-none focus:border-luxury-gold focus:border-opacity-50 transition-colors resize-none h-32"
                  />
                </div>

                <Button 
                  variant="primary" 
                  type="submit"
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
