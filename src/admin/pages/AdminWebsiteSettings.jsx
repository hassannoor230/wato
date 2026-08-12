import { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function AdminWebsiteSettings() {
  const [formData, setFormData] = useState({
    siteName: 'Ahmad Wattoo Real Estate',
    siteDescription: 'Your Trusted Property Partner in Gujranwala',
    heroHeading: 'Find a Place You\'ll Be Proud to Call Home.',
    heroDescription: '',
    primaryCtaText: 'Explore Properties',
    primaryCtaLink: '#properties',
    secondaryCtaText: 'Contact an Agent',
    secondaryCtaLink: '#contact',
    aboutText: '',
    footerText: 'Ahmad Wattoo Real Estate. All rights reserved.',
    seoTitle: 'Ahmad Wattoo Real Estate - Property Buying, Selling & Investment in Gujranwala',
    seoDescription: 'Ahmad Wattoo Real Estate is a dedicated real estate agency specializing in property buying, selling, renting, and investment advisory across Gujranwala.',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { api } = useAdmin();

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/settings/website');
      if (response.data.data) {
        setFormData(prev => ({ ...prev, ...response.data.data }));
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings/website', formData);
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
          <h3 className="text-xl font-bold text-navy-900 tracking-tight">Website Settings</h3>
          <p className="text-navy-500 text-sm mt-1">Manage website content and SEO settings.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">General</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Website Name</label><input type="text" value={formData.siteName} onChange={(e) => setFormData({ ...formData, siteName: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Site Description</label><input type="text" value={formData.siteDescription} onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })} className="input-field" /></div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Hero Section</h4>
            <div><label className="block text-sm font-semibold text-navy-700 mb-2">Hero Heading</label><input type="text" value={formData.heroHeading} onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })} className="input-field" /></div>
            <div><label className="block text-sm font-semibold text-navy-700 mb-2">Hero Description</label><textarea value={formData.heroDescription} onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })} rows="3" className="input-field resize-none" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Primary CTA Text</label><input type="text" value={formData.primaryCtaText} onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Primary CTA Link</label><input type="text" value={formData.primaryCtaLink} onChange={(e) => setFormData({ ...formData, primaryCtaLink: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Secondary CTA Text</label><input type="text" value={formData.secondaryCtaText} onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">Secondary CTA Link</label><input type="text" value={formData.secondaryCtaLink} onChange={(e) => setFormData({ ...formData, secondaryCtaLink: e.target.value })} className="input-field" /></div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">About Section</h4>
            <div><label className="block text-sm font-semibold text-navy-700 mb-2">About Text</label><textarea value={formData.aboutText} onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })} rows="4" className="input-field resize-none" /></div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Footer</h4>
            <div><label className="block text-sm font-semibold text-navy-700 mb-2">Footer Text</label><input type="text" value={formData.footerText} onChange={(e) => setFormData({ ...formData, footerText: e.target.value })} className="input-field" /></div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">SEO</h4>
            <div><label className="block text-sm font-semibold text-navy-700 mb-2">Global SEO Title</label><input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} className="input-field" maxLength={60} /></div>
            <div><label className="block text-sm font-semibold text-navy-700 mb-2">Global Meta Description</label><textarea value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} rows="2" className="input-field resize-none" maxLength={160} /></div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-navy-500 uppercase tracking-wider">Open Graph</h4>
            <div className="grid grid-cols-1 gap-6">
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">OG Title</label><input type="text" value={formData.ogTitle} onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })} className="input-field" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">OG Description</label><textarea value={formData.ogDescription} onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })} rows="2" className="input-field resize-none" /></div>
              <div><label className="block text-sm font-semibold text-navy-700 mb-2">OG Image URL</label><input type="text" value={formData.ogImage} onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })} className="input-field" /></div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-navy-100">
            <div className="flex items-center gap-2">
              {saved && (
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Settings saved successfully!
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-navy-900 text-white text-sm font-bold rounded-xl hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
