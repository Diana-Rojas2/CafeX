export interface ICarrito {
  id: string;
  usuarioId: number;
  items: {
    tiendaId: string;
    productoId: string;
    cantidad: number;
  }[];
}
