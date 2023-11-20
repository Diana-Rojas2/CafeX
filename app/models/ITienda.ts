export interface ITienda {
    id: string;
    nombre: string;
    correoElectronico: string;
    telefono: string;
    ubicacion: {
      tipo: string;
      coordenadas: number[];
    };
    localidad : string
    idLocalidad: number;
    usuario : string;
    idUsuario: string;
  }
  