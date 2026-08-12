import { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../context/AdminContext';

const statusColors = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'in-progress': 'bg-purple-50 text-purple-700 border-purple-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  archived: 'bg-navy-100 text-navy-700 border-navy-200',
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [note, setNote] = useState('');

  const { api } = useAdmin();

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: currentPage, limit: 20 });
      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter) params.append('status', statusFilter);
      const response = await api.get(`/enquiries?${params}`);
      setEnquiries(response.data.data);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
      setError('Failed to load enquiries. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [api, currentPage, searchQuery, statusFilter]);

  useEffect(() => { fetchEnquiries(); }, [fetchEnquiries]);

  const openDetail = async (enquiry) => {
    setSelectedEnquiry(enquiry);
    setNote(enquiry.notes || '');
    setIsDetailOpen(true);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/enquiries/${id}`, { status: newStatus });
      fetchEnquiries();
      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const saveNote = async () => {
    if (!selectedEnquiry) return;
    try {
      await api.put(`/enquiries/${selectedEnquiry._id}`, { notes: note });
      setSelectedEnquiry({ ...selectedEnquiry, notes: note });
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}
      <div>
        <p className="text-navy-500 text-sm font-medium">Manage customer enquiries</p>
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-premium">
        <div className="p-4 border-b border-navy-100 flex flex-col sm:flex-row gap-4">
          <input type="text" placeholder="Search enquiries..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="input-field max-w-md flex-1" />
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="input-field w-full sm:w-auto">
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-navy-100">
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Name</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Email</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Phone</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Status</th>
              <th className="text-left px-6 py-3 font-semibold text-navy-500">Date</th>
              <th className="text-right px-6 py-3 font-semibold text-navy-500">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? [...Array(5)].map((_, i) => <tr key={i} className="border-b border-navy-50"><td colSpan="6" className="px-6 py-4"><div className="h-4 bg-navy-100 rounded animate-pulse w-full" /></td></tr>)
              : enquiries.length === 0 ? <tr><td colSpan="6" className="px-6 py-12 text-center text-navy-500">No enquiries found</td></tr>
              : enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="border-b border-navy-50 hover:bg-navy-50/40">
                  <td className="px-6 py-4 font-medium text-navy-900">{enquiry.name}</td>
                  <td className="px-6 py-4 text-navy-600">{enquiry.email}</td>
                  <td className="px-6 py-4 text-navy-600">{enquiry.phone}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${statusColors[enquiry.status] || statusColors.new}`}>{enquiry.status}</span></td>
                  <td className="px-6 py-4 text-navy-500">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><div className="flex items-center justify-end gap-3">
                    <button onClick={() => openDetail(enquiry)} className="text-sm font-semibold text-navy-600 hover:text-navy-900">View</button>
                    <button onClick={async () => { if (confirm('Delete this enquiry?')) { await api.delete(`/enquiries/${enquiry._id}`); fetchEnquiries(); }}} className="text-sm font-semibold text-red-600 hover:text-red-700">Delete</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isDetailOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-navy-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-premium-lg border border-navy-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-navy-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-navy-900">Enquiry Details</h3>
              <button onClick={() => setIsDetailOpen(false)} className="p-2 rounded-xl hover:bg-navy-50 text-navy-500 font-bold">✕</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><p className="text-xs font-semibold text-navy-500 uppercase mb-1">Name</p><p className="text-navy-900 font-medium">{selectedEnquiry.name}</p></div>
                <div><p className="text-xs font-semibold text-navy-500 uppercase mb-1">Email</p><p className="text-navy-900 font-medium">{selectedEnquiry.email}</p></div>
                <div><p className="text-xs font-semibold text-navy-500 uppercase mb-1">Phone</p><p className="text-navy-900 font-medium">{selectedEnquiry.phone}</p></div>
                <div><p className="text-xs font-semibold text-navy-500 uppercase mb-1">Subject</p><p className="text-navy-900 font-medium">{selectedEnquiry.subject}</p></div>
                {selectedEnquiry.property && <div className="md:col-span-2"><p className="text-xs font-semibold text-navy-500 uppercase mb-1">Property</p><p className="text-navy-900 font-medium">{selectedEnquiry.property}</p></div>}
                {selectedEnquiry.service && <div className="md:col-span-2"><p className="text-xs font-semibold text-navy-500 uppercase mb-1">Service</p><p className="text-navy-900 font-medium">{selectedEnquiry.service}</p></div>}
                <div className="md:col-span-2"><p className="text-xs font-semibold text-navy-500 uppercase mb-1">Message</p><p className="text-navy-900">{selectedEnquiry.message}</p></div>
                <div className="md:col-span-2">
                  <p className="text-xs font-semibold text-navy-500 uppercase mb-2">Status</p>
                  <select value={selectedEnquiry.status} onChange={(e) => updateStatus(selectedEnquiry._id, e.target.value)} className="input-field cursor-pointer">
                    <option value="new">New</option><option value="contacted">Contacted</option><option value="in-progress">In Progress</option><option value="completed">Completed</option><option value="archived">Archived</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs font-semibold text-navy-500 uppercase mb-2">Internal Notes</p>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} rows="3" className="input-field resize-none" placeholder="Add internal notes..." />
                  <button onClick={saveNote} className="btn-secondary text-sm px-4 py-2 mt-3">Save Note</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
