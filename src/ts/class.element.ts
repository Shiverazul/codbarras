
export class Elemento {
    public articulo: string;
    public codigo2: string;
    public codprov: string;
    public descripcion: string;
    public precio: number;
    public stock: number;
    public descCompra: number;

    constructor(articulo: string, codigo2: string, codprov: string, descripcion: string, precio: string, stock: string, descCompra: string ) {
        this.articulo = articulo.replace(/\s/g, '');
        this.codigo2 = codigo2.replace(/\s/g, '');
        this.codprov = codprov.replace(/\s/g, '');
        this.descripcion = descripcion;
        this.precio = +precio.replace(/\s/g, '').replace(',', '.');
        this.stock = +stock.replace(/\s/g, '').replace(',', '.');
        this.descCompra = +descCompra.replace(/\s/g, '').replace(',', '.');
    }
}