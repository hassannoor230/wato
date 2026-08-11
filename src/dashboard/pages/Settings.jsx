import { useState } from 'react';
import businessInfo from '../../data/businessInfo';

export default function Settings() {
  const [formData, setFormData] = useState({
    name: businessInfo.name,
    tagline: businessInfo.tagline,
    description: businessInfo.description,
    phone: businessInfo.phone,
    phoneDisplay: businessInfo.phoneDisplay,
    whatsapp: businessInfo.whatsapp,
    email: businessInfo.email,
    address: businessInfo.address,
    city: businessInfo.city,
    province: businessInfo.province,
    country: businessInfo.country,
    hours: {
      weekdays: businessInfo.hours.weekdays,
      saturday: businessInfo.hours.saturday,
      sunday: businessInfo.hours.sunday,
    },
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('realestate_business_info', JSON.stringify(formData));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-2xl border border-navy-100 shadow-premium p-6 lg:p-10">
        <h3 className="text-xl font-bold text-navy-900 mb-6 tracking-tight">Business Information</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Business Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">WhatsApp Number</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows="2"
              className="input-field resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Province</label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="border-t border-navy-100 pt-6">
            <h4 className="text-lg font-semibold text-navy-900 mb-5">Business Hours</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Weekdays</label>
                <input
                  type="text"
                  value={formData.hours.weekdays}
                  onChange={(e) => setFormData({ ...formData, hours: { ...formData.hours, weekdays: e.target.value }})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Saturday</label>
                <input
                  type="text"
                  value={formData.hours.saturday}
                  onChange={(e) => setFormData({ ...formData, hours: { ...formData.hours, saturday: e.target.value }})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Sunday</label>
                <input
                  type="text"
                  value={formData.hours.sunday}
                  onChange={(e) => setFormData({ ...formData, hours: { ...formData.hours, sunday: e.target.value }})}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            {saved && (
              <span className="text-emerald-600 text-sm font-semibold">Settings saved successfully!</span>
            )}
            <button type="submit" className="btn-primary ml-auto">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
