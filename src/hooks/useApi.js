import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../admin/context/AdminContext';

export function useSettings(keys) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const apiRef = useRef(api);
  apiRef.current = api;

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const params = keys ? (Array.isArray(keys) ? keys.join(',') : keys) : '';
      const response = await apiRef.current.get(`/settings/website?keys=${params}`);
      setData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  }, [keys]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { data, loading };
}

export function usePublicProperties(filters = {}) {
  const [data, setData] = useState({ data: [], pagination: {} });
  const [loading, setLoading] = useState(true);
  const apiRef = useRef(api);
  apiRef.current = api;

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: 'published', limit: filters.limit || 12, page: filters.page || 1 });
      if (filters.search) params.append('search', filters.search);
      if (filters.propertyType) params.append('propertyType', filters.propertyType);
      if (filters.listingType) params.append('listingType', filters.listingType);
      const response = await apiRef.current.get(`/properties?${params}`);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  }, [filters.limit, filters.listingType, filters.page, filters.propertyType, filters.search]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { ...data, loading };
}

export function usePublicServices() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiRef = useRef(api);
  apiRef.current = api;

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRef.current.get('/services');
      setData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { data, loading };
}

export function usePublicGallery() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiRef = useRef(api);
  apiRef.current = api;

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRef.current.get('/gallery');
      setData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  return { data, loading };
}

export function usePublicFaqs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiRef = useRef(api);
  apiRef.current = api;

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRef.current.get('/faqs');
      setData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  return { data, loading };
}

export function usePublicReviews() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiRef = useRef(api);
  apiRef.current = api;

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRef.current.get('/reviews');
      setData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { data, loading };
}

export function useBusinessInfo() {
  const { data, loading } = useSettings('name,tagline,description,phone,phoneDisplay,whatsapp,email,address,city,province,country,hours,social,googleMapsUrl');
  return { businessInfo: data, loading };
}
