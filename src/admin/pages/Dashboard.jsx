import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { api } = useAdmin();

  useEffect(() => {
    async function fetchData() {
      try {
        setError('');
        const [statsRes, enquiriesRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/enquiries?limit=5&sort=-createdAt'),
        ]);
        setStats(statsRes.data.data);
        setRecentEnquiries(enquiriesRes.data.data || []);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [api]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-navy-100 p-6 animate-pulse">
            <div className="h-4 bg-navy-100 rounded w-1/2 mb-4" />
            <div className="h-8 bg-navy-100 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    { label: 'Total Properties', value: stats?.totalProperties || 0, color: 'bg-navy-900' },
    { label: 'Published Properties', value: stats?.publishedProperties || 0, color: 'bg-navy-800' },
    { label: 'Total Enquiries', value: stats?.totalEnquiries || 0, color: 'bg-gold-600' },
    { label: 'New Enquiries', value: stats?.newEnquiries || 0, color: 'bg-red-600' },
    { label: 'Services', value: stats?.totalServices || 0, color: 'bg-navy-700' },
    { label: 'Gallery Items', value: stats?.totalGallery || 0, color: 'bg-navy-600' },
    { label: 'FAQs', value: stats?.totalFaqs || 0, color: 'bg-navy-500' },
    { label: 'Reviews', value: stats?.totalReviews || 0, color: 'bg-navy-400' },
  ];

  return (
      <div className="space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}
        <div>
        <h2 className="text-3xl font-bold text-navy-900 tracking-tight">Dashboard</h2>
        <p className="text-navy-500 text-sm mt-2 font-medium">Welcome to the admin panel overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl border border-navy-100 p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-navy-500">{stat.label}</p>
                <p className="text-3xl font-bold text-navy-900 mt-2 tracking-tight">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-premium">
        <div className="p-6 border-b border-navy-100">
          <h3 className="text-lg font-bold text-navy-900 tracking-tight">Recent Enquiries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100">
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Name</th>
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Email</th>
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Phone</th>
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Status</th>
                <th className="text-left px-6 py-3 font-semibold text-navy-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-navy-500">No enquiries yet</td>
                </tr>
              ) : (
                recentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="border-b border-navy-50 hover:bg-navy-50/40">
                    <td className="px-6 py-4 font-medium text-navy-900">{enquiry.name}</td>
                    <td className="px-6 py-4 text-navy-600">{enquiry.email}</td>
                    <td className="px-6 py-4 text-navy-600">{enquiry.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                        enquiry.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        enquiry.status === 'contacted' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        enquiry.status === 'in-progress' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        enquiry.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                        'bg-navy-100 text-navy-700 border-navy-200'
                      }`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-navy-500">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
