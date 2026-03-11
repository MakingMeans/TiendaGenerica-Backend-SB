import type { Client, CreateClientDTO } from "./clients.types";

const API_URL = "http://localhost:8080/clients";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getClients = async (): Promise<Client[]> => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error obteniendo clientes");
  }

  return response.json();
};

export const createClient = async (
  data: CreateClientDTO
): Promise<Client> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creando cliente");
  }

  return response.json();
};

export const updateClient = async (
  id: number,
  data: Partial<Client>
): Promise<Client> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error actualizando cliente");
  }

  return response.json();
};

export const deleteClient = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error eliminando cliente");
  }

  
};

export const deactivateClient = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}/act`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error desactivando cliente");
  }
};

