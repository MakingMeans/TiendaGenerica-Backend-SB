export type BuyDetail = {
  codigoProducto: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
};

export type Buy = {
  idCompra: number;
  numeroCompra: string;
  idProveedor: number;
  fecha: string;
  total: number;
  estado: string;
  detalles: BuyDetail[];
};

export type CreateBuyDetailDTO = {
  codigoProducto: string;
  cantidad: number;
  precioUnitario: number;
};

export type CreateBuyDTO = {
  idProveedor: number;
  detalles: CreateBuyDetailDTO[];
};