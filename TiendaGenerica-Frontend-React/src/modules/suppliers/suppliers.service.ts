import type {
  Supplier,
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from './suppliers.types';

const API_URL = 'http://localhost:8080/suppliers';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// 🔎 GET ALL
export const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Error obteniendo proveedores');
  }

  return response.json();
};

// ➕ CREATE
export const createSupplier = async (
  data: CreateSupplierDTO
): Promise<void> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error creando proveedor');
  }

};

// ✏️ UPDATE
export const updateSupplier = async (
  id: number,
  data: UpdateSupplierDTO
): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error actualizando proveedor');
  }


};

// 🗑 DELETE HARD
export const deleteSupplier = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Error eliminando proveedor');
  }
};

// 🔒 DEACTIVATE (si tu backend usa endpoint /act)
export const deactivateSupplier = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}/act`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Error desactivando proveedor');
  }
};

export const getActiveProviders = async (): Promise<Supplier[]> => {
  const response = await fetch(`${API_URL}/active-nits`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error obteniendo proveedores");
  }

  return response.json();
};