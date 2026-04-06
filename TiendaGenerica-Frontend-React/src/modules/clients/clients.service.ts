import { api } from 'src/services/api';

import type { Client, CreateClientDTO } from './clients.types';

const getErrorMessage = (error: unknown, fallback: string) => {
  const data = (error as any)?.response?.data;
  return data?.message || data?.error || (error as any)?.message || fallback;
};

export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await api.get('/clients');
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw new Error(getErrorMessage(error, 'Error fetching clients')); 
  }
};

export const getClientById = async (id: number): Promise<Client> => {
  try {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching client by id:', error);
    throw new Error(getErrorMessage(error, 'Error fetching client')); 
  }
};

export const createClient = async (
  data: CreateClientDTO
): Promise<Client> => {
  try {
    const response = await api.post('/clients', data);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw new Error(getErrorMessage(error, 'Error creating client'));
  }
};

export const updateClient = async (
  id: number,
  data: Partial<Client>
): Promise<Client> => {
  try {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw new Error(getErrorMessage(error, 'Error updating client'));
  }
};

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await api.delete(`/clients/${id}`);
  } catch (error) {
    console.error('Error deleting client:', error);
    throw new Error(getErrorMessage(error, 'Error deleting client'));
  }
};

export const deactivateClient = async (id: number): Promise<void> => {
  try {
    await api.delete(`/clients/${id}/act`);
  } catch (error) {
    console.error('Error deactivating client:', error);
    throw new Error(getErrorMessage(error, 'Error deactivating client'));
  }
};

export const getActiveClients = async (): Promise<Client[]> => {
  try {
    const response = await api.get('/clients/active-clients');
    return response.data;
  } catch (error) {
    console.error('Error fetching active clients:', error);
    throw new Error(getErrorMessage(error, 'Error fetching active clients'));
  }
};

