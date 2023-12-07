export interface IVenta {
  id: string;
  fechayHora: Date;
  folio: string;
  userId: number;
  tiendaId: string;
  productosVendidos: [
    {
      productoId: string;
      cantidad: number;
    }
  ];
  total: number;
  status: string;
}
