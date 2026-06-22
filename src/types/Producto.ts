export interface Tag {
  id: number;
  nombre: string;
}

export interface Producto {
  id: number;
  nombre: string;
  nombre_cientifico?: string;
  descripcion: string;
  precio: number;
  img_url?: string;
  imagen?: string;
  stock: number;
  tags?: Tag[];
}