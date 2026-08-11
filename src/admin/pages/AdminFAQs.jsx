import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '', status: 'published', displayOrder: 0 });

  const { api } = useAdmin();

  useEffect(() => { fetchFaqs(); }, [api]);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/faqs/admin');
      setFaqs(response.data.data);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (faq = null) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({ question: faq.question || '', answer: faq.answer || '', status: faq.status || 'published', displayOrder: faq.displayOrder || 0 });
    } else {
      setEditingFaq(null);
      setFormData({ question: '', answer: '', status: 'published', displayOrder: 0 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingFaq(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        await api.put(`/faqs/${editingFaq._id}`, formData);
      } else {
        await api.post('/faqs', formData);
      }
      fetchFaqs();
      closeModal();
    } catch (error) {
      console.error('Failed to save FAQ:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await api.delete(`/faqs/${id}`);
      fetchFaqs();
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <p className="text-navy-500 text-sm font-medium">Manage frequently asked questions</p>
        <button onClick={() => openModal()} className="btn-primary text-sm px-6 py-2.5">+ Add FAQ</button>
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-navy-100">
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Question</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Status</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Order</th>
              <th className="text-right px-6 py-3 font-semibold text-navy-500">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? [...Array(5)].map((_, i) => <tr key={i} className="border-b border-navy-50"><td colSpan="4" className="px-6 py-4"><div className="h-4 bg-navy-100 rounded animate-pulse w-full" /></td></tr>)
              : faqs.length === 0 ? <tr><td colSpan="4" className="px-6 py-12 text-center text-navy-500">No FAQs found</td></tr>
              : faqs.map((faq) => (
                <tr key={faq._id} className="border-b border-navy-50 hover:bg-navy-50/40">
                  <td className="px-6 py-4 font-medium text-navy-900 max-w-md">{faq.question}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${faq.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-navy-100 text-navy-700 border-navy-200'}`}>{faq.status}</span></td>
                  <td className="px-6 py-4 text-navy-600">{faq.displayOrder}</td>
                  <td className="px-6 py-4"><div className="flex items-center justify-end gap-3">
                    <button onClick={() => openModal(faq)} className="text-sm font-semibold text-navy-600 hover:text-navy-900">Edit</button>
                    <button onClick={() => handleDelete(faq._id)} className="text-sm font-semibold text-red-600 hover:text-red-700">Delete</button>
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
              <h3 className="text-xl font-bold text-navy-900">{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h3>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-navy-50 text-navy-500 font-bold">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Question *</label><input type="text" value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} className="input-field" required /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Answer *</label><textarea value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} rows="4" className="input-field resize-none" required /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Status</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="input-field cursor-pointer"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
                <div><label className="block text-sm font-semibold text-navy-700 mb-2">Display Order</label><input type="number" value={formData.displayOrder} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} className="input-field" /></div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-navy-100">
                <button type="button" onClick={closeModal} className="btn-secondary px-6 py-2.5">Cancel</button>
                <button type="submit" className="btn-primary px-6 py-2.5">{editingFaq ? 'Update' : 'Add'} FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
