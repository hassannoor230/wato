import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../../admin/context/AdminContext';

export default function PropertyListing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [listingType, setListingType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiRef = useRef(api);
  apiRef.current = api;

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: 'published', limit: 12, page: currentPage });
      if (searchQuery) params.append('search', searchQuery);
      if (propertyType) params.append('propertyType', propertyType);
      if (listingType) params.append('listingType', listingType);
      const response = await apiRef.current.get(`/properties?${params}`);
      setProperties(response.data.data);
      setTotalPages(response.data.pagination?.pages || 1);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, listingType, propertyType, searchQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => { fetchProperties(); }, 300);
    return () => clearTimeout(timeout);
  }, [fetchProperties]);

  return (
    <div className="min-h-screen bg-navy-50/40">
      <section className="section bg-white border-b border-navy-100">
        <div className="container-premium">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Our Properties</div>
            <h1 className="section-title">Property Listings</h1>
            <p className="section-subtitle mx-auto">Explore our verified properties across Gujranwala and surrounding areas.</p>
          </div>

          <div className="bg-white rounded-2xl border border-navy-100 shadow-premium p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input type="text" placeholder="Search properties..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="input-field" />
              <select value={propertyType} onChange={(e) => { setPropertyType(e.target.value); setCurrentPage(1); }} className="input-field cursor-pointer">
                <option value="">All Types</option>
                <option value="plot">Plot</option><option value="house">House</option><option value="apartment">Apartment</option>
                <option value="commercial">Commercial</option><option value="shop">Shop</option><option value="office">Office</option>
              </select>
              <select value={listingType} onChange={(e) => { setListingType(e.target.value); setCurrentPage(1); }} className="input-field cursor-pointer">
                <option value="">All Listings</option>
                <option value="sale">For Sale</option><option value="rent">For Rent</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-premium">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-navy-100 overflow-hidden animate-pulse">
                  <div className="h-56 bg-navy-100" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-navy-100 rounded w-3/4" />
                    <div className="h-4 bg-navy-100 rounded w-1/2" />
                    <div className="h-6 bg-navy-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-navy-500 text-lg">No properties found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {properties.map((property) => (
                  <Link to={`/properties/${property.slug}`} key={property._id} className="group bg-white rounded-2xl border border-navy-100 overflow-hidden transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      {property.images?.[0] ? (
                        <img src={property.images[0].url} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-navy-50 flex items-center justify-center text-navy-300">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="badge-navy-light capitalize">{property.listingType}</span>
                      </div>
                    </div>
                    <div className="p-6 lg:p-8">
                      <h3 className="text-lg font-bold text-navy-900 mb-2 leading-snug group-hover:text-navy-700 transition-colors">{property.title}</h3>
                      <div className="flex items-center text-navy-500 text-sm mb-4">
                        <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {property.location}, {property.city}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-navy-500 mb-5">
                        {property.area && <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>{property.area}</span>}
                        {property.bedrooms != null && <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>{property.bedrooms} Beds</span>}
                        {property.bathrooms != null && <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>{property.bathrooms} Baths</span>}
                      </div>
                      <div className="flex items-center justify-between pt-5 border-t border-navy-100">
                        <span className="text-xl font-bold text-navy-900">PKR {property.price?.toLocaleString()}</span>
                        <span className="text-sm font-semibold text-navy-600 group-hover:text-navy-900 transition-colors">View Details →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn-secondary px-4 py-2 disabled:opacity-50">Previous</button>
                  <span className="text-sm font-medium text-navy-600">Page {currentPage} of {totalPages}</span>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn-secondary px-4 py-2 disabled:opacity-50">Next</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
