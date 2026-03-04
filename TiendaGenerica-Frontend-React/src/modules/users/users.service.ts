import type { User, CreateUserDTO } from './users.types';

const API_URL = "http://localhost:8080/admin/users";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const updateUserRoles = async (id: number, roles: string[]) => {
  const token = localStorage.getItem('token');

  const response = await fetch(
    `http://localhost:8080/admin/users/${id}/roles`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // 👈 IMPORTANTE
      },
      body: JSON.stringify({ roles }),
    }
  );

  if (!response.ok) {
    throw new Error('Error actualizando roles');
  }

  return response;
};


export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error obteniendo usuarios");
  }

  return response.json();
};

export const createUser = async (
  data: CreateUserDTO
): Promise<void> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creando usuario");
  }
};

export const updateUser = async (
  id: number,
  updatedData: Partial<User>
): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Error actualizando usuario");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error eliminando usuario");
  }
};