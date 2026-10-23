import axios from 'axios';
import {
  defaultProfile,
  defaultActivities,
  defaultMilestones,
  defaultGallery,
  defaultNews,
  defaultJyothiActivities,
  defaultJyothiMilestones,
  defaultJyothiGallery,
  defaultJyothiNews,
} from '../data/defaultData';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gandra_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, clear token if expired
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('gandra_admin_token');
        localStorage.removeItem('gandra_admin_user');
      }
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiService = {
  // Profile
  getProfile: () =>
    api
      .get('/profile')
      .then((res) => res.data)
      .catch((err) => ({ success: true, data: defaultProfile, fallback: true })),
  updateProfile: (data) => api.put('/profile', data).then((res) => res.data),
  getGandraJyothiProfile: () =>
    api
      .get('/gandra-jyothi/profile')
      .then((res) => res.data)
      .catch((err) => ({ success: true, data: defaultProfile.gandraJyothi, fallback: true })),
  updateGandraJyothi: (data) => api.put('/gandra-jyothi/profile', data).then((res) => res.data),
  updateEducation: (data) => api.put('/profile/education', data).then((res) => res.data),

  // Activities
  getActivities: (params) =>
    api
      .get('/activities', { params })
      .then((res) => res.data)
      .catch((err) => ({
        success: true,
        data: params?.profile === 'gandra-jyothi' ? defaultJyothiActivities : defaultActivities,
        fallback: true,
      })),
  getActivityById: (id) =>
    api
      .get(`/activities/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        const item = [...defaultActivities, ...defaultJyothiActivities].find((a) => a._id === id);
        if (item) return { success: true, data: item };
        throw err;
      }),
  createActivity: (data) => api.post('/activities', data).then((res) => res.data),
  updateActivity: (id, data) => api.put(`/activities/${id}`, data).then((res) => res.data),
  deleteActivity: (id) => api.delete(`/activities/${id}`).then((res) => res.data),

  // Milestones
  getMilestones: (params) =>
    api
      .get('/milestones', { params })
      .then((res) => res.data)
      .catch((err) => ({
        success: true,
        data: params?.profile === 'gandra-jyothi' ? defaultJyothiMilestones : defaultMilestones,
        fallback: true,
      })),
  createMilestone: (data) => api.post('/milestones', data).then((res) => res.data),
  updateMilestone: (id, data) => api.put(`/milestones/${id}`, data).then((res) => res.data),
  deleteMilestone: (id) => api.delete(`/milestones/${id}`).then((res) => res.data),

  // Gallery
  getGallery: (params) =>
    api
      .get('/gallery', { params })
      .then((res) => res.data)
      .catch((err) => ({
        success: true,
        data: params?.profile === 'gandra-jyothi' ? defaultJyothiGallery : defaultGallery,
        fallback: true,
      })),
  uploadImage: (formData) =>
    api.post('/gallery/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => res.data),
  createGalleryItem: (data) => api.post('/gallery', data).then((res) => res.data),
  updateGalleryItem: (id, data) => api.put(`/gallery/${id}`, data).then((res) => res.data),
  deleteGalleryItem: (id) => api.delete(`/gallery/${id}`).then((res) => res.data),

  // News
  getNews: (params) =>
    api
      .get('/news', { params })
      .then((res) => res.data)
      .catch((err) => ({
        success: true,
        data: params?.profile === 'gandra-jyothi' ? defaultJyothiNews : defaultNews,
        fallback: true,
      })),
  getNewsBySlug: (slugOrId) =>
    api
      .get(`/news/${slugOrId}`)
      .then((res) => res.data)
      .catch((err) => {
        const item = [...defaultNews, ...defaultJyothiNews].find((n) => n.slug === slugOrId || n._id === slugOrId);
        if (item) return { success: true, data: item };
        throw err;
      }),
  createNews: (data) => api.post('/news', data).then((res) => res.data),
  updateNews: (id, data) => api.put(`/news/${id}`, data).then((res) => res.data),
  deleteNews: (id) => api.delete(`/news/${id}`).then((res) => res.data),

  // Gandra Jyothi Dedicated Endpoints
  getGandraJyothiActivities: (params) =>
    api
      .get('/gandra-jyothi/activities', { params })
      .then((res) => res.data)
      .catch(() => ({ success: true, data: defaultJyothiActivities, fallback: true })),
  getGandraJyothiGallery: (params) =>
    api
      .get('/gandra-jyothi/gallery', { params })
      .then((res) => res.data)
      .catch(() => ({ success: true, data: defaultJyothiGallery, fallback: true })),
  getGandraJyothiAchievements: () =>
    api
      .get('/gandra-jyothi/achievements')
      .then((res) => res.data)
      .catch(() => ({ success: true, data: defaultJyothiMilestones, fallback: true })),
  getGandraJyothiNews: () =>
    api
      .get('/gandra-jyothi/news')
      .then((res) => res.data)
      .catch(() => ({ success: true, data: defaultJyothiNews, fallback: true })),

  // Contact
  submitContact: (data) => api.post('/contact', data).then((res) => res.data),
  getContactMessages: (params) => api.get('/contact', { params }).then((res) => res.data),
  updateContactStatus: (id, data) => api.put(`/contact/${id}`, data).then((res) => res.data),
  deleteContactMessage: (id) => api.delete(`/contact/${id}`).then((res) => res.data),

  // Auth
  login: (credentials) => api.post('/auth/login', credentials).then((res) => res.data),
  getMe: () => api.get('/auth/me').then((res) => res.data),
  updatePassword: (data) => api.put('/auth/update-password', data).then((res) => res.data),
};

export default api;
