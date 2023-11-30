export interface IVendedor {
    idVendedor: number;
    idUsuario : number;
    rfc : string;
    curp : string;
    claveElector : string;
    motivoSolicitud : string;
    descripcionProductos : string;
    fecha : Date;
    autorizado : boolean;
    retroalimentacion : string;
  }
  