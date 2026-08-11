import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', shortDescription: '', propertyType: 'plot', listingType: 'sale',
    price: '', currency: 'PKR', location: '', city: '', area: '', address: '', latitude: '', longitude: '',
    googleMapsUrl: '', bedrooms: '', bathrooms: '', areaSize: '', areaUnit: 'marla',
    amenities: [], features: [], images: [], featuredImage: '', status: 'published',
    featured: false, availability: 'available', contactPhone: '', seoTitle: '', seoDescription: '',
  });
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { api } = useAdmin();

  useEffect(() => { fetchProperties(); }, [api, searchQuery, currentPage]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: currentPage, limit: 12 });
      if (searchQuery) params.append('search', searchQuery);
      const response = await api.get(`/properties/admin/list?${params}`);
      setProperties(response.data.data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (property = null) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        title: property.title || '', description: property.description || '', shortDescription: property.shortDescription || '',
        propertyType: property.propertyType || 'plot', listingType: property.listingType || 'sale',
        price: property.price || '', currency: property.currency || 'PKR', location: property.location || '',
        city: property.city || '', area: property.area || '', address: property.address || '',
        latitude: property.latitude || '', longitude: property.longitude || '', googleMapsUrl: property.googleMapsUrl || '',
        bedrooms: property.bedrooms ?? '', bathrooms: property.bathrooms ?? '', areaSize: property.areaSize ?? '',
        areaUnit: property.areaUnit || 'marla', amenities: property.amenities || [], features: property.features || [],
        images: property.images || [], featuredImage: property.featuredImage || '', status: property.status || 'published',
        featured: property.featured || false, availability: property.availability || 'available',
        contactPhone: property.contactPhone || '', seoTitle: property.seoTitle || '', seoDescription: property.seoDescription || '',
      });
    } else {
      setEditingProperty(null);
      setFormData({
        title: '', description: '', shortDescription: '', propertyType: 'plot', listingType: 'sale',
        price: '', currency: 'PKR', location: '', city: '', area: '', address: '', latitude: '', longitude: '',
        googleMapsUrl: '', bedrooms: '', bathrooms: '', areaSize: '', areaUnit: 'marla',
        amenities: [], features: [], images: [], featuredImage: '', status: 'published',
        featured: false, availability: 'available', contactPhone: '', seoTitle: '', seoDescription: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingProperty(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProperty) {
        await api.put(`/properties/${editingProperty._id}`, formData);
      } else {
        await api.post('/properties', formData);
      }
      fetchProperties();
      closeModal();
    } catch (error) {
      console.error('Failed to save property:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) return;
    try {
      await api.delete(`/properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error('Failed to delete property:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      const response = await api.post('/properties/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const newImage = { url: response.data.data.url, publicId: response.data.data.publicId, caption: '' };
      setFormData({ ...formData, images: [...formData.images, newImage] });
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  const setFeaturedImage = (url) => {
    setFormData({ ...formData, featuredImage: url });
  };

  const addAmenity = () => {
    const amenity = prompt('Enter amenity:');
    if (amenity) setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
  };

  const removeAmenity = (index) => {
    setFormData({ ...formData, amenities: formData.amenities.filter((_, i) => i !== index) });
  };

  const addFeature = () => {
    const feature = prompt('Enter feature:');
    if (feature) setFormData({ ...formData, features: [...formData.features, feature] });
  };

  const removeFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <p className="text-navy-500 text-sm font-medium">Manage your property listings</p>
        <button onClick={() => openModal()} className="btn-primary text-sm px-6 py-2.5">+ Add Property</button>
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-premium">
        <div className="p-4 border-b border-navy-100">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="input-field max-w-md"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100">
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Property</th>
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Location</th>
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Price</th>
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Status</th>
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Featured</th>
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Date</th>
                <th className="text-right px-6 py-3 font-semibold text-navy-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-navy-50">
                    <td colSpan="7" className="px-6 py-4">
                      <div className="h-4 bg-navy-100 rounded animate-pulse w-full" />
                    </td>
                  </tr>
                ))
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-navy-500">No properties found</td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr key={property._id} className="border-b border-navy-50 hover:bg-navy-50/40">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {property.images?.[0] ? (
                          <img src={property.images[0].url} alt="" className="w-12 h-12 rounded-xl object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center text-navy-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-navy-900 line-clamp-1">{property.title}</p>
                          <p className="text-xs text-navy-500 capitalize">{property.propertyType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-navy-600">{property.location}</td>
                    <td className="px-6 py-4 font-semibold text-navy-900">PKR {property.price?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${property.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : property.status === 'draft' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-navy-100 text-navy-700 border-navy-200'}`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={async () => {
                          await api.put(`/properties/${property._id}`, { featured: !property.featured });
                          fetchProperties();
                        }}
                        className={`px-2.5 py-1 text-xs font-bold rounded-full border ${property.featured ? 'bg-gold-50 text-gold-700 border-gold-200' : 'bg-navy-100 text-navy-700 border-navy-200'}`}
                      >
                        {property.featured ? 'Featured' : 'Not Featured'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-navy-500">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => openModal(property)} className="text-sm font-semibold text-navy-600 hover:text-navy-900">Edit</button>
                        <button onClick={() => handleDelete(property._id)} className="text-sm font-semibold text-red-600 hover:text-red-700">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-navy-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-premium-lg border border-navy-100 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-navy-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-navy-900">{editingProperty ? 'Edit Property' : 'Add New Property'}</h3>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-navy-50 text-navy-500 font-bold">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Title *</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Property Type *</label>
                    <select value={formData.propertyType} onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })} className="input-field cursor-pointer">
                      <option value="plot">Plot</option><option value="house">House</option><option value="apartment">Apartment</option>
                      <option value="commercial">Commercial</option><option value="shop">Shop</option><option value="office">Office</option><option value="farmhouse">Farmhouse</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Description *</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="4" className="input-field resize-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Short Description</label>
                  <textarea value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} rows="2" className="input-field resize-none" />
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Property Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Price *</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="input-field" required min="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Currency</label>
                    <select value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })} className="input-field cursor-pointer">
                      <option value="PKR">PKR</option><option value="USD">USD</option><option value="EUR">EUR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Listing Type</label>
                    <select value={formData.listingType} onChange={(e) => setFormData({ ...formData, listingType: e.target.value })} className="input-field cursor-pointer">
                      <option value="sale">For Sale</option><option value="rent">For Rent</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div><label className="block text-sm font-semibold text-navy-700 mb-2">Bedrooms</label><input type="number" value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value ? Number(e.target.value) : '' })} className="input-field" min="0" /></div>
                  <div><label className="block text-sm font-semibold text-navy-700 mb-2">Bathrooms</label><input type="number" value={formData.bathrooms} onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value ? Number(e.target.value) : '' })} className="input-field" min="0" /></div>
                  <div><label className="block text-sm font-semibold text-navy-700 mb-2">Area Size</label><input type="number" value={formData.areaSize} onChange={(e) => setFormData({ ...formData, areaSize: e.target.value ? Number(e.target.value) : '' })} className="input-field" min="0" /></div>
                  <div><label className="block text-sm font-semibold text-navy-700 mb-2">Area Unit</label><select value={formData.areaUnit} onChange={(e) => setFormData({ ...formData, areaUnit: e.target.value })} className="input-field cursor-pointer"><option value="marla">Marla</option><option value="kanal">Kanal</option><option value="sqft">Sq Ft</option><option value="sqm">Sq M</option></select></div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Availability</label>
                  <select value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })} className="input-field cursor-pointer">
                    <option value="available">Available</option><option value="sold">Sold</option><option value="rented">Rented</option><option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Location</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-semibold text-navy-700 mb-2">Address</label><input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="input-field" /></div>
                  <div><label className="block text-sm font-semibold text-navy-700 mb-2">City *</label><input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="input-field" required /></div>
                  <div><label className="block text-sm font-semibold text-navy-700 mb-2">Location/Area *</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="input-field" required /></div>
                  <div><label className="block text-sm font-semibold text-navy-700 mb-2">Area</label><input type="text" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} className="input-field" /></div>
                </div>
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Google Maps URL</label><input type="url" value={formData.googleMapsUrl} onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })} className="input-field" /></div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Amenities & Features</h4>
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.amenities.map((amenity, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-navy-50 text-navy-700 rounded-xl text-sm font-medium border border-navy-200">
                        {amenity}
                        <button type="button" onClick={() => removeAmenity(index)} className="text-navy-400 hover:text-red-600 font-bold">×</button>
                      </span>
                    ))}
                  </div>
                  <button type="button" onClick={addAmenity} className="btn-secondary text-sm px-4 py-2">+ Add Amenity</button>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.features.map((feature, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-navy-50 text-navy-700 rounded-xl text-sm font-medium border border-navy-200">
                        {feature}
                        <button type="button" onClick={() => removeFeature(index)} className="text-navy-400 hover:text-red-600 font-bold">×</button>
                      </span>
                    ))}
                  </div>
                  <button type="button" onClick={addFeature} className="btn-secondary text-sm px-4 py-2">+ Add Feature</button>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Images</h4>
                <div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="block w-full text-sm text-navy-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-navy-900 file:text-white hover:file:bg-navy-800" />
                  {uploading && <p className="text-sm text-navy-500 mt-2 font-medium">Uploading...</p>}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img src={img.url} alt="" className="w-full h-32 object-cover rounded-xl border border-navy-100" />
                      <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                        <button type="button" onClick={() => setFeaturedImage(img.url)} className="px-2 py-1 bg-white rounded-lg text-xs font-bold">Featured</button>
                        <button type="button" onClick={() => removeImage(index)} className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs font-bold">Remove</button>
                      </div>
                      {formData.featuredImage === img.url && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-gold-500 text-white text-xs font-bold rounded">Featured</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">SEO</h4>
                <div className="grid grid-cols-1 gap-6">
                  <div><label className="block text-sm font-semibold text-navy-700 mb-2">SEO Title</label><input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} className="input-field" maxLength={60} /></div>
                  <div><label className="block text-sm font-semibold text-navy-700 mb-2">SEO Description</label><textarea value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} rows="2" className="input-field resize-none" maxLength={160} /></div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Publishing</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="input-field cursor-pointer">
                      <option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Contact Phone</label>
                    <input type="text" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} className="input-field" />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-5 h-5 rounded border-navy-300 text-navy-900 focus:ring-navy-500" />
                      <span className="text-sm font-semibold text-navy-700">Featured Property</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-navy-100 sticky bottom-0 bg-white">
                <button type="button" onClick={closeModal} className="btn-secondary px-6 py-2.5">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2.5">{editingProperty ? 'Update Property' : 'Add Property'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
