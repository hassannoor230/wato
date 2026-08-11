import { useProjects } from '../../store/useStore';
import { useProperties } from '../../store/useStore';

export default function DashboardHome() {
  const { projects } = useProjects();
  const { properties } = useProperties();

  const stats = [
    { label: 'Total Projects', value: projects.length, color: 'bg-navy-900' },
    { label: 'Total Properties', value: properties.length, color: 'bg-navy-800' },
    { label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, color: 'bg-gold-600' },
    { label: 'Available Properties', value: properties.filter(p => p.status === 'available').length, color: 'bg-navy-700' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl border border-navy-100 p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-navy-500">{stat.label}</p>
                <p className="text-3xl font-bold text-navy-900 mt-2 tracking-tight">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-navy-100 p-6 lg:p-8 shadow-premium">
          <h3 className="text-lg font-semibold text-navy-900 mb-5 tracking-tight">Recent Projects</h3>
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-navy-50/60 rounded-xl border border-navy-100">
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{project.name}</p>
                  <p className="text-xs text-navy-500 mt-0.5">{project.createdAt}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${project.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-navy-100 text-navy-700 border border-navy-200'}`}>
                  {project.status}
                </span>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-navy-500 text-center py-8 text-sm">No projects yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-navy-100 p-6 lg:p-8 shadow-premium">
          <h3 className="text-lg font-semibold text-navy-900 mb-5 tracking-tight">Recent Properties</h3>
          <div className="space-y-3">
            {properties.slice(0, 5).map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 bg-navy-50/60 rounded-xl border border-navy-100">
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{property.title}</p>
                  <p className="text-xs text-navy-500 mt-0.5">{property.location}</p>
                </div>
                <span className="text-sm font-bold text-navy-900">
                  PKR {parseInt(property.price).toLocaleString()}
                </span>
              </div>
            ))}
            {properties.length === 0 && (
              <p className="text-navy-500 text-center py-8 text-sm">No properties yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
