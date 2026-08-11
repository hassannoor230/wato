import { useState } from 'react';
import { useProperties } from '../../store/useStore';

export default function Properties() {
  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    type: 'For Sale',
    location: '',
    image: '',
    description: '',
    status: 'available',
    bedrooms: '',
    bathrooms: '',
    area: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProperty) {
      updateProperty(editingProperty.id, formData);
    } else {
      addProperty(formData);
    }
    closeModal();
  };

  const openModal = (property = null) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        title: property.title,
        price: property.price,
        type: property.type,
        location: property.location,
        image: property.image,
        description: property.description,
        status: property.status,
        bedrooms: property.bedrooms ?? '',
        bathrooms: property.bathrooms ?? '',
        area: property.area ?? '',
      });
    } else {
      setEditingProperty(null);
      setFormData({
        title: '',
        price: '',
        type: 'For Sale',
        location: '',
        image: '',
        description: '',
        status: 'available',
        bedrooms: '',
        bathrooms: '',
        area: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
    setFormData({
      title: '',
      price: '',
      type: 'For Sale',
      location: '',
      image: '',
      description: '',
      status: 'available',
      bedrooms: '',
      bathrooms: '',
      area: '',
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deleteProperty(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <p className="text-navy-500 text-sm">Manage your property listings</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary text-sm px-5 py-2.5">
          + Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-2xl border border-navy-100 shadow-premium overflow-hidden group hover:shadow-premium-hover transition-all duration-300">
            <div className="h-48 bg-navy-50 overflow-hidden">
              {property.image ? (
                <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-navy-300">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-navy-900 mb-1 text-sm leading-snug">{property.title}</h3>
              <p className="text-xs text-navy-500 mb-2">{property.location}</p>
              <p className="text-lg font-bold text-navy-900 mb-3">
                PKR {parseInt(property.price).toLocaleString()}
              </p>
              <div className="flex justify-between items-center">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${property.status === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-navy-100 text-navy-700 border-navy-200'}`}>
                  {property.status}
                </span>
                <div className="flex items-center gap-3">
                  <button onClick={() => openModal(property)} className="text-xs font-semibold text-navy-600 hover:text-navy-900 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(property.id)} className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {properties.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-navy-500 text-sm">No properties found. Add your first property to get started.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-navy-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-premium-lg border border-navy-100 max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-navy-900 mb-5">
              {editingProperty ? 'Edit Property' : 'Add New Property'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Price (PKR)</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input-field cursor-pointer"
                  >
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value ? Number(e.target.value) : '' })}
                    className="input-field"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value ? Number(e.target.value) : '' })}
                    className="input-field"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Area</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="input-field resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input-field cursor-pointer"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={closeModal} className="btn-secondary text-sm px-5 py-2.5">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-sm px-5 py-2.5">
                  {editingProperty ? 'Update' : 'Add'} Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
