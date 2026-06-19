 import "../../styles/header.css";
 
 export default function Header(){
 
    return(
    <header className="header">
        <div className="logo">
            🌿 Vivero online
        </div>

        <input
            type="text"
            placeholder="Buscar plantas..."
        />

        <div className="header-actions">
            <button>🛒</button>
            <button>👤</button>
        </div>
        </header>
    )
 }