import businessInfo from '../data/businessInfo';
import ContactForm from './forms/ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="section bg-white">
      <div className="container-premium">
        <div className="text-center mb-14 lg:mb-20">
          <div className="section-label justify-center">Contact Us</div>
          <h2 className="section-title">Let&apos;s Find Your Next Property</h2>
          <p className="section-subtitle mx-auto">
            Ready to find your dream property? Get in touch with us today. Our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h3 className="text-2xl font-bold text-navy-900 mb-8 tracking-tight">Get in Touch</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center text-navy-700 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 mb-1">Phone</h4>
                  <a href={`tel:${businessInfo.phone}`} className="text-navy-600 hover:text-navy-900 transition-colors">
                    {businessInfo.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center text-gold-700 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 mb-1">WhatsApp</h4>
                  <a
                    href={`https://wa.me/${businessInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-600 hover:text-navy-900 transition-colors"
                  >
                    {businessInfo.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center text-navy-700 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 mb-1">Email</h4>
                  <a href={`mailto:${businessInfo.email}`} className="text-navy-600 hover:text-navy-900 transition-colors">
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center text-navy-700 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 mb-1">Office Address</h4>
                  <p className="text-navy-600">{businessInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="bg-navy-50 rounded-2xl border border-navy-100 p-6 lg:p-8">
              <h4 className="font-semibold text-navy-900 mb-4">Business Hours</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-navy-500">Mon - Fri</span>
                  <span className="text-navy-900 font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">Saturday</span>
                  <span className="text-navy-900 font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">Sunday</span>
                  <span className="text-navy-900 font-medium">11:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ContactForm formType="contact" defaultSubject="General Inquiry" />
          </div>
        </div>

        <div className="mt-16 rounded-2xl overflow-hidden shadow-premium border border-navy-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6807.633483985514!2d74.2213027!3d32.1837301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ed7e1eb7d23d9%3A0x45d20816b08be915!2sAhmad%20Wattoo%20Real%20Estate!5e0!3m2!1sen!2s!4v1691760000000!5m2!1sen!2s"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ahmad Wattoo Real Estate Location"
            className="w-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
