import { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({ title: '', image: '', caption: '', category: 'general', status: 'published', displayOrder: 0 });

  const { api } = useAdmin();

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/gallery/admin');
      setImages(response.data.data);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
      setError('Failed to load gallery. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  const openModal = (image = null) => {
    if (image) {
      setEditingImage(image);
      setFormData({ title: image.title || '', image: image.image || '', caption: image.caption || '', category: image.category || 'general', status: image.status || 'published', displayOrder: image.displayOrder || 0 });
    } else {
      setEditingImage(null);
      setFormData({ title: '', image: '', caption: '', category: 'general', status: 'published', displayOrder: 0 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingImage(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingImage) {
        await api.put(`/gallery/${editingImage._id}`, formData);
      } else {
        await api.post('/gallery', formData);
      }
      fetchGallery();
      closeModal();
    } catch (error) {
      console.error('Failed to save gallery item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      fetchGallery();
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
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
        <p className="text-navy-500 text-sm font-medium">Manage gallery images</p>
        <button onClick={() => openModal()} className="btn-primary text-sm px-6 py-2.5">+ Add Image</button>
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-premium">
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {loading ? [...Array(10)].map((_, i) => <div key={i} className="aspect-square bg-navy-100 rounded-2xl animate-pulse" />)
            : images.length === 0 ? <div className="col-span-full text-center py-12 text-navy-500">No gallery images found</div>
            : images.map((image) => (
              <div key={image._id} className="group relative aspect-square rounded-2xl overflow-hidden border border-navy-100 hover:shadow-premium-hover transition-all duration-300">
                <img src={image.image} alt={image.title || ''} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => openModal(image)} className="px-3 py-1.5 bg-white rounded-xl text-xs font-bold">Edit</button>
                  <button onClick={() => handleDelete(image._id)} className="px-3 py-1.5 bg-red-500 text-white rounded-xl text-xs font-bold">Delete</button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs truncate font-medium">{image.title || image.caption || 'Untitled'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-navy-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-premium-lg border border-navy-100 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-navy-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-navy-900">{editingImage ? 'Edit Image' : 'Add New Image'}</h3>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-navy-50 text-navy-500 font-bold">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Title</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Image URL *</label><input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="input-field" required /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Caption</label><textarea value={formData.caption} onChange={(e) => setFormData({ ...formData, caption: e.target.value })} rows="2" className="input-field resize-none" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Category</label><input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field" /></div>
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Status</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="input-field cursor-pointer"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-navy-100">
                <button type="button" onClick={closeModal} className="btn-secondary px-6 py-2.5">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2.5">{editingImage ? 'Update' : 'Add'} Image</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
