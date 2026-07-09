import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to inject JWT token automatically
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor to handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error Response:', error.response || error.message);
    return Promise.reject(error);
  }
);

export const adminService = {
  login: async (credentials) => {
    const response = await api.post('/admin/login', credentials);
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
  },
  verify: async () => {
    const response = await api.get('/admin/verify');
    return response.data.data.admin;
  },
  getAnalytics: async () => {
    const response = await api.get('/admin/analytics');
    return response.data.data;
  },
  logout: () => {
    localStorage.removeItem('adminToken');
  }
};

export const projectService = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data.data.projects;
  },
  getOne: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data.data.project;
  },
  create: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data.data.project;
  },
  update: async (id, projectData) => {
    const response = await api.patch(`/projects/${id}`, projectData);
    return response.data.data.project;
  },
  delete: async (id) => {
    await api.delete(`/projects/${id}`);
    return true;
  }
};

export const blogService = {
  getAll: async () => {
    const response = await api.get('/blogs');
    return response.data.data.blogs;
  },
  getAdminBlogs: async () => {
    const response = await api.get('/admin/blogs');
    return response.data.data.blogs;
  },
  getOne: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data.data.blog;
  },
  create: async (blogData) => {
    const response = await api.post('/blogs', blogData);
    return response.data.data.blog;
  },
  update: async (id, blogData) => {
    const response = await api.patch(`/blogs/${id}`, blogData);
    return response.data.data.blog;
  },
  delete: async (id) => {
    await api.delete(`/blogs/${id}`);
    return true;
  }
};

export const bugService = {
  getAll: async () => {
    const response = await api.get('/bugs');
    return response.data.data.bugs;
  },
  create: async (bugData) => {
    const response = await api.post('/bugs', bugData);
    return response.data.data.bug;
  },
  update: async (id, bugData) => {
    const response = await api.patch(`/bugs/${id}`, bugData);
    return response.data.data.bug;
  },
  delete: async (id) => {
    await api.delete(`/bugs/${id}`);
    return true;
  }
};

export const contactService = {
  submit: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/messages');
    return response.data.data.messages;
  },
  delete: async (id) => {
    await api.delete(`/messages/${id}`);
    return true;
  }
};

export const visitorService = {
  track: async (path) => {
    try {
      const response = await api.post('/visitors/track', { path });
      return response.data.data;
    } catch (e) {
      console.warn('Visitor tracking error:', e);
      return null;
    }
  }
};

export default api;
