import { api } from 'src/services/api';

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface RegisterRequestDTO {
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  correo: string;
  cedula: string;
}

export interface LoginResponseDTO {
  token: string;
}

const getErrorMessage = (error: unknown, fallback: string) => {
  const data = (error as any)?.response?.data;
  return data?.message || data?.error || (error as any)?.message || fallback;
};

export const login = async (
  data: LoginRequestDTO
): Promise<LoginResponseDTO> => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('❌ Login error:', error);
    throw new Error(getErrorMessage(error, 'Login failed.'));
  }
};

export const register = async (
  data: RegisterRequestDTO
): Promise<LoginResponseDTO> => {
  try {
    const response = await api.post('/auth/signup', data);
    return response.data;
  } catch (error) {
    console.error('❌ Signup error:', error);
    throw new Error(getErrorMessage(error, 'Signup failed.'));
  }
};