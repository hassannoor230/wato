import businessInfo from '../data/businessInfo';

export default function Testimonials() {
  return (
    <section className="section bg-white">
      <div className="container-premium">
        <div className="text-center mb-14 lg:mb-20">
          <div className="section-label justify-center">Testimonials</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle mx-auto">
            Trusted by hundreds of satisfied clients across Gujranwala
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {businessInfo.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl border border-navy-100 p-8 lg:p-10 transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1"
            >
              <div className="flex items-center gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.26.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 mb-6 leading-relaxed italic">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center">
                <div className="w-11 h-11 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-sm mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-navy-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-navy-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
