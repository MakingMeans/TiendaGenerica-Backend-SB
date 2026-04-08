import { api } from 'src/services/api';

import type { Buy, CreateBuyDTO } from './buy.types';

const getErrorMessage = (error: unknown, fallback: string) => {
  const data = (error as any)?.response?.data;
  return data?.message || data?.error || (error as any)?.message || fallback;
};

export const getBuys = async (): Promise<Buy[]> => {
  try {
    const response = await api.get('/buys');
    return response.data;
  } catch (error) {
    console.error('Error fetching buys:', error);
    throw new Error(getErrorMessage(error, 'Error fetching buys'));
  }
};

export const getBuyById = async (id: number): Promise<Buy> => {
  try {
    const response = await api.get(`/buys/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching buy:', error);
    throw new Error(getErrorMessage(error, 'Error fetching buy'));
  }
};

export const createBuy = async (data: CreateBuyDTO) => {
  try {
    const response = await api.post('/buys', data);
    return response.data;
  } catch (error) {
    console.error('Error creating buy:', error);
    throw new Error(getErrorMessage(error, 'Error creating buy'));
  }
};

export const deleteBuy = async (id: number): Promise<void> => {
  try {
    await api.delete(`/buys/${id}`);
  } catch (error) {
    console.error('Error deleting buy:', error);
    throw new Error(getErrorMessage(error, 'Error deleting buy'));
  }
};