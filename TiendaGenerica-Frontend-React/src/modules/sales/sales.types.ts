export interface SaleDetail {
  codigoProducto: string;
  cantidad: number;
  precioUnitario?: number;
  total?: number;
}

export interface SalePayment {
  idMetodo: number;
  monto?: number;
}

export interface Sale {
  idVenta: number;
  numeroVenta: string;
  idCliente: number;
  idUsuario: number;
  fecha: string;
  totalBruto: number;
  totalIva: number;
  totalFinal: number;
  estado: string;
  detalles: SaleDetail[];
  pagos: SalePayment[];
}

export interface CreateSaleDTO {
  idCliente: number;
  idUsuario: number;
  detalles: {
    codigoProducto: string;
    cantidad: number;
  }[];
  pagos: {
    idMetodo: number;
  }[];
}