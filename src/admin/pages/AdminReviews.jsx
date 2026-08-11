import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: 'Client', text: '', rating: 5, status: 'published', verified: false });

  const { api } = useAdmin();

  useEffect(() => { fetchReviews(); }, [api]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get('/reviews/admin');
      setReviews(response.data.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (review = null) => {
    if (review) {
      setEditingReview(review);
      setFormData({ name: review.name || '', role: review.role || 'Client', text: review.text || '', rating: review.rating || 5, status: review.status || 'published', verified: review.verified || false });
    } else {
      setEditingReview(null);
      setFormData({ name: '', role: 'Client', text: '', rating: 5, status: 'published', verified: false });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingReview(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await api.put(`/reviews/${editingReview._id}`, formData);
      } else {
        await api.post('/reviews', formData);
      }
      fetchReviews();
      closeModal();
    } catch (error) {
      console.error('Failed to save review:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      fetchReviews();
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <p className="text-navy-500 text-sm font-medium">Manage customer reviews</p>
        <button onClick={() => openModal()} className="btn-primary text-sm px-6 py-2.5">+ Add Review</button>
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-navy-100">
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Name</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Role</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Rating</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Status</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Verified</th>
              <th className="text-right px-6 py-3 font-semibold text-navy-500">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? [...Array(5)].map((_, i) => <tr key={i} className="border-b border-navy-50"><td colSpan="6" className="px-6 py-4"><div className="h-4 bg-navy-100 rounded animate-pulse w-full" /></td></tr>)
              : reviews.length === 0 ? <tr><td colSpan="6" className="px-6 py-12 text-center text-navy-500">No reviews found</td></tr>
              : reviews.map((review) => (
                <tr key={review._id} className="border-b border-navy-50 hover:bg-navy-50/40">
                  <td className="px-6 py-4 font-medium text-navy-900">{review.name}</td>
                  <td className="px-6 py-4 text-navy-600">{review.role}</td>
                  <td className="px-6 py-4"><div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-gold-500 fill-gold-500' : 'text-navy-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div></td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${review.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-navy-100 text-navy-700 border-navy-200'}`}>{review.status}</span></td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${review.verified ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-navy-100 text-navy-700 border-navy-200'}`}>{review.verified ? 'Verified' : 'Unverified'}</span></td>
                  <td className="px-6 py-4"><div className="flex items-center justify-end gap-3">
                    <button onClick={() => openModal(review)} className="text-sm font-semibold text-navy-600 hover:text-navy-900">Edit</button>
                    <button onClick={() => handleDelete(review._id)} className="text-sm font-semibold text-red-600 hover:text-red-700">Delete</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-navy-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-premium-lg border border-navy-100 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-navy-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-navy-900">{editingReview ? 'Edit Review' : 'Add New Review'}</h3>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-navy-50 text-navy-500 font-bold">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" required /></div>
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Role</label><input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="input-field" /></div>
              </div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Review Text *</label><textarea value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} rows="4" className="input-field resize-none" required /></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Rating *</label><select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} className="input-field cursor-pointer">{[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}</select></div>
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Status</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="input-field cursor-pointer"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
                <div className="flex items-end"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={formData.verified} onChange={(e) => setFormData({ ...formData, verified: e.target.checked })} className="w-5 h-5 rounded border-navy-300 text-navy-900 focus:ring-navy-500" /><span className="text-sm font-semibold text-navy-700">Verified Review</span></label></div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-navy-100">
                <button type="button" onClick={closeModal} className="btn-secondary px-6 py-2.5">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2.5">{editingReview ? 'Update' : 'Add'} Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
