import { api } from 'src/services/api';

import type { User, CreateUserDTO } from './users.types';

const getErrorMessage = (error: unknown, fallback: string) => {
  const data = (error as any)?.response?.data;
  return data?.message || data?.error || (error as any)?.message || fallback;
};

export const updateUserRoles = async (id: number, roles: string[]) => {
  try {
    const response = await api.patch(`/admin/users/${id}/roles`, { roles });
    return response.data;
  } catch (error) {
    console.error('Error updating user roles:', error);
    throw new Error(getErrorMessage(error, 'Error updating user roles'));
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(getErrorMessage(error, 'Error fetching users'));
  }
};

export const createUser = async (
  data: CreateUserDTO
): Promise<User> => {
  try {
    const response = await api.post('/admin/users', data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(getErrorMessage(error, 'Error creating user'));
  }
};

export const updateUser = async (
  id: number,
  updatedData: Partial<User>
): Promise<User> => {
  try {
    const response = await api.put(`/admin/users/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error(getErrorMessage(error, 'Error updating user'));
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`/admin/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error(getErrorMessage(error, 'Error deleting user'));
  }
};