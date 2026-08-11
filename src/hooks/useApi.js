import { useState, useEffect } from 'react';
import api from '../admin/context/AdminContext';

export function useSettings(keys) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      try {
        const params = keys ? (Array.isArray(keys) ? keys.join(',') : keys) : '';
        const response = await api.get(`/settings/website?keys=${params}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [api, keys]);

  return { data, loading };
}

export function usePublicProperties(filters = {}) {
  const [data, setData] = useState({ data: [], pagination: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const params = new URLSearchParams({ status: 'published', limit: filters.limit || 12, page: filters.page || 1 });
        if (filters.search) params.append('search', filters.search);
        if (filters.propertyType) params.append('propertyType', filters.propertyType);
        if (filters.listingType) params.append('listingType', filters.listingType);
        const response = await api.get(`/properties?${params}`);
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, [api, filters.search, filters.propertyType, filters.listingType, filters.page, filters.limit]);

  return { ...data, loading };
}

export function usePublicServices() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      try {
        const response = await api.get('/services');
        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [api]);

  return { data, loading };
}

export function usePublicGallery() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      setLoading(true);
      try {
        const response = await api.get('/gallery');
        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, [api]);

  return { data, loading };
}

export function usePublicFaqs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      setLoading(true);
      try {
        const response = await api.get('/faqs');
        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
  }, [api]);

  return { data, loading };
}

export function usePublicReviews() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const response = await api.get('/reviews');
        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [api]);

  return { data, loading };
}

export function useBusinessInfo() {
  const { data, loading } = useSettings('name,tagline,description,phone,phoneDisplay,whatsapp,email,address,city,province,country,hours,social,googleMapsUrl');
  return { businessInfo: data, loading };
}
