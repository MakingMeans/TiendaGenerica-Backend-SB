export interface User {
  id: number
  cedula: string
  nombre: string
  apellido: string
  correo: string
  username: string
  activo: boolean
  roles: string[]
}

export interface CreateUserDTO {
  cedula: string
  nombre: string
  apellido: string
  correo: string
  username: string
  password: string
  roles: string[]
}

export interface UpdateUserDTO {
  nombre: string
  apellido: string
  correo: string
  activo: boolean
}