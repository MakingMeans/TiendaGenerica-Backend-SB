import type { Buy, CreateBuyDTO } from "./buy.types";

const API_URL = "http://localhost:8080/buys";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getBuys = async (): Promise<Buy[]> => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error obteniendo compras");
  }

  return response.json();
};

export const createBuy = async (data: CreateBuyDTO) => {
  const response = await fetch("http://localhost:8080/buys", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creando compra");
  }

  return response.json();
};
export const deleteBuy = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error eliminando compra");
  }
};