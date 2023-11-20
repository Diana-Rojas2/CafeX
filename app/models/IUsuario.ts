export interface IUsuario {
    id?: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correoElectronico?: string;
    telefono?: string;
    usuario: string;
    pwd: string;
    rol : string;
    idRol: number;
}
