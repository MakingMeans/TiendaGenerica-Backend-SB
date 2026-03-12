import type { Sale, CreateSaleDTO } from "./sales.types";

const API_URL = "http://localhost:8080/sales";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getSales = async (): Promise<Sale[]> => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error obteniendo ventas");
  }

  return response.json();
};

export const createSale = async (data: CreateSaleDTO) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creando venta");
  }

  return response.json();
};

export const deleteSale = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error eliminando venta");
  }
};