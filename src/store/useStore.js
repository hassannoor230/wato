import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export function useProjects() {
  const [projects, setProjects] = useLocalStorage('realestate_projects', [
    {
      id: 1,
      name: 'Gujranwala City - Sector B',
      description: 'Residential plots in a prime location of Gujranwala City',
      status: 'active',
      createdAt: '2025-01-15',
    },
    {
      id: 2,
      name: 'Sialkot Road Commercial Project',
      description: 'Commercial and residential plots near Sialkot Road, Gujranwala',
      status: 'active',
      createdAt: '2025-02-20',
    },
  ]);

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id, updates) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return { projects, addProject, updateProject, deleteProject };
}

export function useProperties() {
  const [properties, setProperties] = useLocalStorage('realestate_properties', [
    {
      id: 1,
      title: '5 Marla Plot on Sialkot Road, Gujranwala',
      price: '20000000',
      type: 'For Sale',
      location: 'Gujranwala',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      description: 'Prime location plot with all utilities',
      status: 'available',
      createdAt: '2025-01-10',
      bedrooms: null,
      bathrooms: null,
      area: '5 Marla',
    },
    {
      id: 2,
      title: '10 Marla Plot near Central City, Gujranwala',
      price: '17000000',
      type: 'For Sale',
      location: 'Gujranwala',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      description: 'Corner plot with park view',
      status: 'available',
      createdAt: '2025-01-12',
      bedrooms: null,
      bathrooms: null,
      area: '10 Marla',
    },
    {
      id: 3,
      title: 'Commercial Shop in Main Market, Gujranwala',
      price: '9500000',
      type: 'For Sale',
      location: 'Gujranwala',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      description: 'High-traffic commercial property in prime market area',
      status: 'available',
      createdAt: '2025-02-05',
      bedrooms: null,
      bathrooms: null,
      area: '450 Sq Ft',
    },
    {
      id: 4,
      title: 'Family House on Canal Road, Gujranwala',
      price: '28000000',
      type: 'For Sale',
      location: 'Gujranwala',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      description: 'Beautiful family home with modern amenities',
      status: 'available',
      createdAt: '2025-03-18',
      bedrooms: 4,
      bathrooms: 3,
      area: '10 Marla',
    },
  ]);

  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProperties([...properties, newProperty]);
  };

  const updateProperty = (id, updates) => {
    setProperties(properties.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  return { properties, addProperty, updateProperty, deleteProperty };
}
