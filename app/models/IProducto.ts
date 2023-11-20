export interface IProducto{
    id : number;
    nombre : string;
    descripcion : string;
    precio : number;
    categoria : string;
    idCategoria : number;
    interacciones : {
        visitas : number;
        likes : number;
        evaluacion : number;
    }
    urlsImagenes : [string];
    stock : number;
    tienda : string;
    idtienda : string;
}