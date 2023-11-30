export interface IProducto{
    id : string;
    nombre : string;
    descripcion : string;
    precio : number;
    categoria : number;
    interacciones : {
        visitas : number;
        likes : number;
        evaluacion : number;
    }
    urlsImagenes : [string];
    stock : number;
    tienda : string;
}