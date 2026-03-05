export interface Client {
  idCliente: number;
  cedula: string;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  email: string;
  activo: boolean;
}

export type CreateClientDTO = Omit<Client, "idCliente">;