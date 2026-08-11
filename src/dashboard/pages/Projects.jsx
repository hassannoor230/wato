import { useState } from 'react';
import { useProjects } from '../../store/useStore';

export default function Projects() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'active' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData);
    }
    closeModal();
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({ name: project.name, description: project.description, status: project.status });
    } else {
      setEditingProject(null);
      setFormData({ name: '', description: '', status: 'active' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({ name: '', description: '', status: 'active' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <p className="text-navy-500 text-sm">Manage your real estate projects</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary text-sm px-5 py-2.5">
          + Add Project
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-navy-100">
            <thead className="bg-navy-50/60">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-navy-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-navy-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-navy-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-navy-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-navy-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-navy-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-navy-50/40 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-navy-900">{project.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-navy-500 max-w-xs truncate">{project.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${project.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-navy-100 text-navy-700 border-navy-200'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-500">
                    {project.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openModal(project)} className="text-navy-600 hover:text-navy-900 font-semibold mr-4 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-700 font-semibold transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <p className="text-navy-500 text-sm">No projects found. Add your first project to get started.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-navy-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-premium-lg border border-navy-100 max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-navy-900 mb-5">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
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
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input-field cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={closeModal} className="btn-secondary text-sm px-5 py-2.5">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-sm px-5 py-2.5">
                  {editingProject ? 'Update' : 'Add'} Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
