import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-50/40 px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full" />
          <h1 className="relative text-[120px] sm:text-[160px] font-bold text-navy-900 leading-none tracking-tighter">
            404
          </h1>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4 tracking-tight">Page Not Found</h2>
        <p className="text-navy-500 text-lg mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back to finding your dream property.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/properties" className="btn-secondary">
            View Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
