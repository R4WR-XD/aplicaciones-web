import type { Producto } from "../types/Producto";

const IMAGEN_DEFAULT =
  "https://placehold.co/400x300/e8f5e9/2d5a27?text=Sin+imagen";

interface Props {
  producto: Producto;
}

export default function ProductoCard({ producto }: Props) {
  return (
    <div className="product-card">
      <img
        src={producto.img_url || IMAGEN_DEFAULT}
        alt={producto.nombre}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = IMAGEN_DEFAULT;
        }}
      />

      <h3>{producto.nombre}</h3>

      <p>{producto.descripcion}</p>

      <div className="product-footer">
        <span className="price">${producto.precio}</span>

        <button className="buy-btn">Agregar al carrito</button>
      </div>
    </div>
  );
}