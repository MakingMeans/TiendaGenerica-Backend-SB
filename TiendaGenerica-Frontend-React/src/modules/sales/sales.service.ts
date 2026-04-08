import { api } from 'src/services/api';

import type { Sale, CreateSaleDTO } from './sales.types';

const getErrorMessage = (error: unknown, fallback: string) => {
  const data = (error as any)?.response?.data;
  return data?.message || data?.error || (error as any)?.message || fallback;
};

export const getSales = async (): Promise<Sale[]> => {
  try {
    const response = await api.get('/sales');
    return response.data;
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw new Error(getErrorMessage(error, 'Error fetching sales'));
  }
};

export const getSaleById = async (id: number): Promise<Sale> => {
  try {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sale by id:', error);
    throw new Error(getErrorMessage(error, 'Error fetching sale'));
  }
};

export const createSale = async (data: CreateSaleDTO) => {
  try {
    const response = await api.post('/sales', data);
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw new Error(getErrorMessage(error, 'Error creating sale'));
  }
};

export const deleteSale = async (id: number): Promise<void> => {
  try {
    await api.delete(`/sales/${id}`);
  } catch (error) {
    console.error('Error deleting sale:', error);
    throw new Error(getErrorMessage(error, 'Error deleting sale'));
  }
};