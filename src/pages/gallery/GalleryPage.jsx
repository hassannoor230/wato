import { useState, useEffect } from 'react';
import api from '../../admin/context/AdminContext';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await api.get('/gallery');
        setImages(response.data.data);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="section bg-white border-b border-navy-100">
        <div className="container-premium">
          <div className="text-center mb-14">
            <div className="section-label justify-center">Gallery</div>
            <h1 className="section-title">Our Work & Properties</h1>
            <p className="section-subtitle mx-auto">A glimpse of our properties and the communities we serve.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-premium">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-navy-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-navy-500 text-lg">No gallery images available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {images.map((image, index) => (
                <button key={image._id} onClick={() => setSelectedImage(image)} className="group relative aspect-square rounded-2xl overflow-hidden border border-navy-100 hover:shadow-premium-hover transition-all duration-300">
                  <img src={image.image} alt={image.title || image.caption || ''} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </button>
              ))}
            </div>
          )}

          {selectedImage && (
            <div className="fixed inset-0 bg-navy-900/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
              <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                <img src={selectedImage.image} alt="" className="w-full max-h-[85vh] object-contain rounded-3xl" />
                <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white hover:text-gold-300 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
