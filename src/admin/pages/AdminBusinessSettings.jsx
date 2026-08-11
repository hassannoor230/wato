import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function AdminBusinessSettings() {
  const [formData, setFormData] = useState({
    name: 'Ahmad Wattoo Real Estate',
    tagline: 'Your Trusted Property Partner in Gujranwala',
    description: '', phone: '+92 302 1001860', phoneDisplay: '0302-1001860',
    whatsapp: '923021001860', email: 'info@ahmadwattoorealestate.com',
    address: '', city: 'Gujranwala', province: 'Punjab', country: 'Pakistan',
    hours: { weekdays: '', saturday: '', sunday: '' },
    facebook: '', instagram: '', linkedin: '', youtube: '', googleMapsUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { api } = useAdmin();

  useEffect(() => { fetchSettings(); }, [api]);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await api.get('/settings/business');
      if (response.data.data) {
        setFormData({ ...formData, ...response.data.data });
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings/business', formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl">
        <div className="bg-white rounded-2xl border border-navy-100 shadow-premium p-10 animate-pulse">
          <div className="h-8 bg-navy-100 rounded w-1/3 mb-8" />
          <div className="space-y-6">
            <div className="h-10 bg-navy-100 rounded" />
            <div className="h-10 bg-navy-100 rounded" />
            <div className="h-32 bg-navy-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-2xl border border-navy-100 shadow-premium p-6 lg:p-10">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-navy-900 tracking-tight">Business Information</h3>
          <p className="text-navy-500 text-sm mt-1">Manage your business contact details and opening hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">General Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Business Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Tagline</label><input type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} className="input-field" /></div>
            </div>
            <div><label className="block text-sm font-semibold text-navy-700 mb-2">Description</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" className="input-field resize-none" /></div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Phone Number</label><input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Phone Display</label><input type="text" value={formData.phoneDisplay} onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">WhatsApp Number</label><input type="text" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field" /></div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Address</h4>
            <div><label className="block text-sm font-semibold text-navy-700 mb-2">Address</label><textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} rows="2" className="input-field resize-none" /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">City</label><input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Province</label><input type="text" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Country</label><input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="input-field" /></div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Business Hours</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Weekdays</label><input type="text" value={formData.hours.weekdays} onChange={(e) => setFormData({ ...formData, hours: { ...formData.hours, weekdays: e.target.value }})} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Saturday</label><input type="text" value={formData.hours.saturday} onChange={(e) => setFormData({ ...formData, hours: { ...formData.hours, saturday: e.target.value }})} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Sunday</label><input type="text" value={formData.hours.sunday} onChange={(e) => setFormData({ ...formData, hours: { ...formData.hours, sunday: e.target.value }})} className="input-field" /></div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Social Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Facebook</label><input type="text" value={formData.facebook} onChange={(e) => setFormData({ ...formData, facebook: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Instagram</label><input type="text" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">LinkedIn</label><input type="text" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">YouTube</label><input type="text" value={formData.youtube} onChange={(e) => setFormData({ ...formData, youtube: e.target.value })} className="input-field" /></div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Maps</h4>
            <div><label className="block text-sm font-semibold text-navy-700 mb-2">Google Maps URL</label><input type="url" value={formData.googleMapsUrl} onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })} className="input-field" /></div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-navy-100">
            {saved && <span className="text-emerald-600 text-sm font-bold">Settings saved successfully!</span>}
            <button type="submit" disabled={saving} className="btn-primary ml-auto">{saving ? 'Saving...' : 'Save Settings'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
