import { api } from 'src/services/api';

import type {
  Supplier,
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from './suppliers.types';

const getErrorMessage = (error: unknown, fallback: string) => {
  const data = (error as any)?.response?.data;
  return data?.message || data?.error || (error as any)?.message || fallback;
};

export const getSuppliers = async (): Promise<Supplier[]> => {
  try {
    const response = await api.get('/suppliers');
    return response.data;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw new Error(getErrorMessage(error, 'Error fetching suppliers'));
  }
};

export const getSupplierById = async (id: number): Promise<Supplier> => {
  try {
    const response = await api.get(`/suppliers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching supplier:', error);
    throw new Error(getErrorMessage(error, 'Error fetching supplier'));
  }
};

export const createSupplier = async (
  data: CreateSupplierDTO
): Promise<Supplier> => {
  try {
    const response = await api.post('/suppliers', data);
    return response.data;
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw new Error(getErrorMessage(error, 'Error creating supplier'));
  }
};

export const updateSupplier = async (
  id: number,
  data: UpdateSupplierDTO
): Promise<Supplier> => {
  try {
    const response = await api.put(`/suppliers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating supplier:', error);
    throw new Error(getErrorMessage(error, 'Error updating supplier'));
  }
};

export const deleteSupplier = async (id: number): Promise<void> => {
  try {
    await api.delete(`/suppliers/${id}`);
  } catch (error) {
    console.error('Error deleting supplier:', error);
    throw new Error(getErrorMessage(error, 'Error deleting supplier'));
  }
};

export const deactivateSupplier = async (id: number): Promise<void> => {
  try {
    await api.delete(`/suppliers/${id}/act`);
  } catch (error) {
    console.error('Error deactivating supplier:', error);
    throw new Error(getErrorMessage(error, 'Error deactivating supplier'));
  }
};

export const getActiveProviders = async (): Promise<Supplier[]> => {
  try {
    const response = await api.get('/suppliers/active-nits');
    return response.data;
  } catch (error) {
    console.error('Error fetching active providers:', error);
    throw new Error(getErrorMessage(error, 'Error fetching active providers'));
  }
};