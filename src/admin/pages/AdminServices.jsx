import { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', shortDescription: '', image: '', icon: '', status: 'published', displayOrder: 0, seoTitle: '', seoDescription: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { api } = useAdmin();

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: currentPage, limit: 50 });
      if (searchQuery) params.append('search', searchQuery);
      const response = await api.get(`/services/admin?${params}`);
      setServices(response.data.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setError('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [api, currentPage, searchQuery]);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({ title: service.title || '', description: service.description || '', shortDescription: service.shortDescription || '', image: service.image || '', icon: service.icon || '', status: service.status || 'published', displayOrder: service.displayOrder || 0, seoTitle: service.seoTitle || '', seoDescription: service.seoDescription || '' });
    } else {
      setEditingService(null);
      setFormData({ title: '', description: '', shortDescription: '', image: '', icon: '', status: 'published', displayOrder: 0, seoTitle: '', seoDescription: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingService(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await api.put(`/services/${editingService._id}`, formData);
      } else {
        await api.post('/services', formData);
      }
      fetchServices();
      closeModal();
    } catch (error) {
      console.error('Failed to save service:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <p className="text-navy-500 text-sm font-medium">Manage your services</p>
        <button onClick={() => openModal()} className="btn-primary text-sm px-6 py-2.5">+ Add Service</button>
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-premium">
        <div className="p-4 border-b border-navy-100">
          <input type="text" placeholder="Search services..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="input-field max-w-md" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-navy-100">
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Title</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Status</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Order</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Date</th>
              <th className="text-right px-6 py-3 font-semibold text-navy-500">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? [...Array(5)].map((_, i) => <tr key={i} className="border-b border-navy-50"><td colSpan="5" className="px-6 py-4"><div className="h-4 bg-navy-100 rounded animate-pulse w-full" /></td></tr>)
              : services.length === 0 ? <tr><td colSpan="5" className="px-6 py-12 text-center text-navy-500">No services found</td></tr>
              : services.map((service) => (
                <tr key={service._id} className="border-b border-navy-50 hover:bg-navy-50/40">
                  <td className="px-6 py-4 font-medium text-navy-900">{service.title}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${service.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-navy-100 text-navy-700 border-navy-200'}`}>{service.status}</span></td>
                  <td className="px-6 py-4 text-navy-600">{service.displayOrder}</td>
                  <td className="px-6 py-4 text-navy-500">{new Date(service.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><div className="flex items-center justify-end gap-3">
                    <button onClick={() => openModal(service)} className="text-sm font-semibold text-navy-600 hover:text-navy-900">Edit</button>
                    <button onClick={() => handleDelete(service._id)} className="text-sm font-semibold text-red-600 hover:text-red-700">Delete</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-navy-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-premium-lg border border-navy-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-navy-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-navy-900">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-navy-50 text-navy-500 font-bold">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-field" required /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Description *</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="4" className="input-field resize-none" required /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Short Description</label><textarea value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} rows="2" className="input-field resize-none" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Image URL</label><input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="input-field" /></div>
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Icon</label><input type="text" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="input-field" placeholder="home, building, etc." /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Status</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="input-field cursor-pointer"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Display Order</label><input type="number" value={formData.displayOrder} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} className="input-field" /></div>
              </div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">SEO Title</label><input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} className="input-field" maxLength={60} /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">SEO Description</label><textarea value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} rows="2" className="input-field resize-none" maxLength={160} /></div>
              <div className="flex justify-end gap-3 pt-4 border-t border-navy-100">
                <button type="button" onClick={closeModal} className="btn-secondary px-6 py-2.5">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2.5">{editingService ? 'Update' : 'Add'} Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
