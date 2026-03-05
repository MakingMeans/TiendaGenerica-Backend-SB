export type Supplier = {
  id: number;
  nit: string;
  nombre: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  email: string;
  activo: boolean;
};

export type CreateSupplierDTO = Omit<Supplier, 'id'>;
export type UpdateSupplierDTO = Partial<CreateSupplierDTO>;