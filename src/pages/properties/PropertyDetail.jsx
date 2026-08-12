import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../admin/context/AdminContext';

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const apiRef = useRef(api);
  apiRef.current = api;

  const fetchProperty = useCallback(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function doFetch() {
      setLoading(true);
      setError('');
      try {
        const response = await apiRef.current.get(`/properties/${slug}`, { signal: controller.signal });
        if (!cancelled) {
          setProperty(response.data.data);
          if (response.data.data.images?.length > 0) {
            setSelectedImage(0);
          }
        }
      } catch (error) {
        if (!controller.signal.aborted && !cancelled) {
          console.error('Failed to fetch property:', error);
          setError('Unable to load property details. Please try again later.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    doFetch();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [slug]);

  useEffect(() => {
    const cleanup = fetchProperty();
    return cleanup;
  }, [fetchProperty]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-navy-200 border-t-navy-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-navy-900 mb-4">Something went wrong</h1>
          <p className="text-navy-500 mb-6">{error}</p>
          <Link to="/properties" className="btn-primary">View All Properties</Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-900 mb-4">Property Not Found</h1>
          <p className="text-navy-500 mb-6">The property you are looking for does not exist or has been removed.</p>
          <Link to="/properties" className="btn-primary">View All Properties</Link>
        </div>
      </div>
    );
  }

  const images = property.images?.length > 0 ? property.images : [{ url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', caption: property.title }];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-navy-50/40 border-b border-navy-100">
        <div className="container-premium pt-24 pb-8">
          <nav className="flex items-center justify-between gap-2 text-sm text-navy-500 mb-4">
            <div className="flex items-center gap-2">
              <Link to="/" className="hover:text-navy-900">Home</Link>
              <span>/</span>
              <Link to="/properties" className="hover:text-navy-900">Properties</Link>
              <span>/</span>
              <span className="text-navy-900 font-medium truncate">{property.title}</span>
            </div>
            <Link to="/properties" className="btn-secondary text-xs px-3 py-1.5">View All Properties</Link>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-navy capitalize">{property.listingType}</span>
                {property.featured && <span className="badge-gold">Featured</span>}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">{property.title}</h1>
              <div className="flex items-center text-navy-500 mt-2">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {property.location}, {property.city}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-navy-500 mb-1">Price</p>
              <p className="text-3xl font-bold text-navy-900">PKR {property.price?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-premium">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-navy-50">
                  <img src={images[selectedImage]?.url} alt={property.title} className="w-full h-full object-cover" />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button key={index} onClick={() => setSelectedImage(index)} className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-navy-900 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-navy-100 p-6 lg:p-8">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Description</h2>
                <p className="text-navy-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {(property.amenities?.length > 0 || property.features?.length > 0) && (
                <div className="bg-white rounded-2xl border border-navy-100 p-6 lg:p-8">
                  {property.amenities?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-navy-900 mb-4">Amenities</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-navy-700">
                            <div className="w-5 h-5 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {property.features?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-navy-900 mb-4">Features</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-navy-700">
                            <div className="w-5 h-5 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-navy-100 p-6 shadow-premium sticky top-24">
                <h3 className="text-lg font-bold text-navy-900 mb-4">Property Details</h3>
                <div className="space-y-3">
                  {property.bedrooms != null && (
                    <div className="flex justify-between py-2 border-b border-navy-50">
                      <span className="text-navy-500">Bedrooms</span>
                      <span className="font-semibold text-navy-900">{property.bedrooms}</span>
                    </div>
                  )}
                  {property.bathrooms != null && (
                    <div className="flex justify-between py-2 border-b border-navy-50">
                      <span className="text-navy-500">Bathrooms</span>
                      <span className="font-semibold text-navy-900">{property.bathrooms}</span>
                    </div>
                  )}
                  {property.areaSize && (
                    <div className="flex justify-between py-2 border-b border-navy-50">
                      <span className="text-navy-500">Area Size</span>
                      <span className="font-semibold text-navy-900">{property.areaSize} {property.areaUnit}</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex justify-between py-2 border-b border-navy-50">
                      <span className="text-navy-500">Plot Area</span>
                      <span className="font-semibold text-navy-900">{property.area}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-navy-50">
                    <span className="text-navy-500">Property Type</span>
                    <span className="font-semibold text-navy-900 capitalize">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-navy-50">
                    <span className="text-navy-500">Availability</span>
                    <span className="font-semibold text-navy-900 capitalize">{property.availability}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <a href={`tel:+923021001860`} className="block w-full btn-primary text-center py-3">Call Now</a>
                  <a href={`https://wa.me/923021001860?text=Hi, I'm interested in ${encodeURIComponent(property.title)}`} target="_blank" rel="noopener noreferrer" className="block w-full btn-gold text-center py-3">WhatsApp</a>
                </div>
              </div>

              {property.googleMapsUrl && (
                <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
                  <iframe src={property.googleMapsUrl} width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location" className="w-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
