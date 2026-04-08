import { api } from 'src/services/api';

import type { Product, CreateProductDTO } from './catalog.types';

const getErrorMessage = (error: unknown, fallback: string) => {
  const data = (error as any)?.response?.data;
  return data?.message || data?.error || (error as any)?.message || fallback;
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/catalog');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error(getErrorMessage(error, 'Error fetching products'));
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/catalog/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error(getErrorMessage(error, 'Error fetching product'));
  }
};

export const createProduct = async (
  data: CreateProductDTO
): Promise<Product> => {
  try {
    const response = await api.post('/catalog', data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error(getErrorMessage(error, 'Error creating product'));
  }
};

export const updateProduct = async (
  id: number,
  data: Partial<Product>
): Promise<Product> => {
  try {
    const response = await api.put(`/catalog/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error(getErrorMessage(error, 'Error updating product'));
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/catalog/${id}/act`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error(getErrorMessage(error, 'Error deleting product'));
  }
};

export async function uploadCatalogCsv(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    await api.post('/catalog/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error uploading catalog CSV:', error);
    throw new Error(getErrorMessage(error, 'Error uploading catalog CSV'));
  }
}