import axios from 'axios';

// Creamos instancia apuntando al API Gateway
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para enviar JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
}

export const login = async (
  data: LoginRequestDTO
): Promise<LoginResponseDTO> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};