import "../../styles/sidebar.css";

interface Tag {
  id: number;
  nombre: string;
}

interface Props {
  tags: Tag[];
  selectedTag: number | null;
  onSelect: (id: number | null) => void;
}

export default function Categories({ tags, selectedTag, onSelect }: Props) {
  return (
    <nav className="categories-bar" aria-label="Categorías">
      <ul className="categories-list">
        <li>
          <button
            className={`category-pill${selectedTag === null ? " active" : ""}`}
            onClick={() => onSelect(null)}
          >
            Todas
          </button>
        </li>
        {tags.map((tag) => (
          <li key={tag.id}>
            <button
              className={`category-pill${selectedTag === tag.id ? " active" : ""}`}
              onClick={() => onSelect(tag.id)}
            >
              {tag.nombre}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
