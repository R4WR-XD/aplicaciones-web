import type { Producto } from "../types/Producto";

interface Props {
  producto: Producto;
}

export default function ProductoCard({ producto }: Props) {
  return (
    <div className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} />

      <h3>{producto.nombre}</h3>

      <p>{producto.descripcion}</p>

      <div className="producto-footer">
        <span>${producto.precio}</span>

        <button>Agregar al carrito</button>
      </div>
    </div>
  );
}