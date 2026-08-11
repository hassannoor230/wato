import { useState } from 'react';

export default function PropertySearch() {
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (value) params.append(key, value);
    });
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="relative z-20 -mt-16 mb-20">
      <div className="container-premium">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-premium-lg border border-navy-100/80 p-3">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              { id: 'location', name: 'location', label: 'Location', icon: 'map', options: ['Gujranwala', 'Sialkot Road', 'Central City', 'Main Market'] },
              { id: 'type', name: 'type', label: 'Property Type', icon: 'home', options: ['Residential', 'Commercial', 'Plot', 'Apartment'] },
              { id: 'purpose', name: 'purpose', label: 'Purpose', icon: 'swap', options: ['buy', 'rent'] },
              { id: 'price', name: 'price', label: 'Price Range', icon: 'currency', options: ['0-5000000', '5000000-15000000', '15000000-30000000', '30000000-999999999'] },
            ].map((field) => (
              <div key={field.id} className={`relative transition-all duration-300 ${focusedField === field.id ? 'scale-[1.02]' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${focusedField === field.id ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-500'}`}>
                    {field.icon === 'map' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    {field.icon === 'home' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                    {field.icon === 'swap' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
                    {field.icon === 'currency' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  </div>
                </div>
                <select
                  id={field.id}
                  name={field.name}
                  onFocus={() => setFocusedField(field.id)}
                  onBlur={() => setFocusedField(null)}
                  className="input-field pl-12 appearance-none cursor-pointer"
                >
                  <option value="">{field.label}</option>
                  {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            ))}
            <div className="sm:col-span-2 lg:col-span-2">
              <button type="submit" className="w-full btn-primary py-4 text-base shadow-glow hover:shadow-lg">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Search Properties
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
