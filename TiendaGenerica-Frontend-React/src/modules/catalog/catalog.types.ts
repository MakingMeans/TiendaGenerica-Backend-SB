export interface Product {
  idProducto: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  precioVenta: number;
  iva: number;
  stockActual: number;
  stockMinimo: number;
  stockMaximo: number;
  activo: boolean;
  fechaCreacion: string;
}

export type CreateProductDTO = Omit<Product, "idProducto" | "fechaCreacion">;