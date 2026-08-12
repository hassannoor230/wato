import { useBusinessInfo } from '../../hooks/useApi';

export default function AboutPage() {
  const { businessInfo, loading } = useBusinessInfo();

  if (loading) {
    return (
      <div className="min-h-screen">
        <section className="section bg-white border-b border-navy-100">
          <div className="container-premium">
            <div className="text-center mb-14">
              <div className="h-8 bg-navy-100 rounded-xl w-1/3 mx-auto mb-4 animate-pulse" />
              <div className="h-12 bg-navy-100 rounded-xl w-2/3 mx-auto animate-pulse" />
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container-premium">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="h-8 bg-navy-100 rounded-xl w-3/4 animate-pulse" />
                <div className="h-4 bg-navy-100 rounded w-full animate-pulse" />
                <div className="h-4 bg-navy-100 rounded w-full animate-pulse" />
                <div className="h-4 bg-navy-100 rounded w-2/3 animate-pulse" />
              </div>
              <div className="h-[500px] bg-navy-100 rounded-3xl animate-pulse" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="section bg-white border-b border-navy-100">
        <div className="container-premium">
          <div className="text-center mb-14">
            <div className="section-label justify-center">About Us</div>
            <h1 className="section-title">About Ahmad Wattoo Real Estate</h1>
            <p className="section-subtitle mx-auto">{businessInfo?.description || 'Ahmad Wattoo Real Estate is a dedicated real estate agency specializing in property buying, selling, renting, and investment advisory across Gujranwala and nearby premium housing societies.'}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 tracking-tight mb-6">Your Trusted Property Partner in Gujranwala</h2>
              <p className="text-navy-600 leading-relaxed mb-6">
                Ahmad Wattoo Real Estate is a dedicated real estate agency specializing in property buying, selling, renting, and investment advisory across Gujranwala and nearby premium housing societies.
              </p>
              <p className="text-navy-600 leading-relaxed mb-6">
                With deep local expertise and a commitment to transparency, we provide client-focused property solutions that help you make informed decisions. Whether you are a first-time buyer, seasoned investor, or looking to sell, our team is here to guide you every step of the way.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-navy-50 rounded-2xl p-6 border border-navy-100">
                  <p className="text-3xl font-bold text-navy-900">500+</p>
                  <p className="text-sm text-navy-500 mt-1">Properties Sold</p>
                </div>
                <div className="bg-navy-50 rounded-2xl p-6 border border-navy-100">
                  <p className="text-3xl font-bold text-navy-900">400+</p>
                  <p className="text-sm text-navy-500 mt-1">Happy Clients</p>
                </div>
                <div className="bg-navy-50 rounded-2xl p-6 border border-navy-100">
                  <p className="text-3xl font-bold text-navy-900">8+</p>
                  <p className="text-sm text-navy-500 mt-1">Years Experience</p>
                </div>
                <div className="bg-navy-50 rounded-2xl p-6 border border-navy-100">
                  <p className="text-3xl font-bold text-navy-900">12+</p>
                  <p className="text-sm text-navy-500 mt-1">Areas Covered</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-premium-lg border border-navy-100">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" alt="Ahmad Wattoo Real Estate" className="w-full h-[500px] object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
