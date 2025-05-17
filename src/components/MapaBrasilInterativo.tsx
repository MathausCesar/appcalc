// src/components/MapaBrasilInterativo.tsx
import { useState } from 'react';
import MapaSVG from '../assets/mapa_brasil_com_ids.svg?react';
import './MapaBrasil.css';

const clientesPorEstado: Record<string, { nome: string; logo: string }[]> = {
  SP: [
    { nome: 'Mattos Filho', logo: '/logos/mattos.png' },
    { nome: 'Pinheiro Neto', logo: '/logos/pinheiro.png' },
  ],
  RJ: [
    { nome: 'Veirano Advogados', logo: '/logos/veirano.png' },
  ],
  PR: [
    { nome: 'Arns de Oliveira', logo: '/logos/arns.png' },
  ],
  MG: [
    { nome: 'Ernesto Borges', logo: '/logos/ernesto.png' },
  ],
};

export function MapaBrasilInterativo() {
  const [estadoAtivo, setEstadoAtivo] = useState<string | null>(null);
  const [estadoHover, setEstadoHover] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    const id = (e.target as SVGElement).id;
    if (id && clientesPorEstado[id]) {
      setEstadoAtivo(id);
    } else {
      setEstadoAtivo(null);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<SVGElement>) => {
    const id = (e.target as SVGElement).id;
    if (id) setEstadoHover(id);
  };

  const handleMouseLeave = () => {
    setEstadoHover(null);
  };

  return (
    <div className="dashboard">
      <h2>🗺️ Nossos Clientes por Estado</h2>
      <div className="mapa-wrapper">
        <MapaSVG
          className={`svg-mapa ${estadoAtivo ? `ativo-${estadoAtivo}` : ''}`}
          onClick={handleClick}
          onMouseOver={handleMouseEnter}
          onMouseOut={handleMouseLeave}
        />

        {estadoHover && (
          <div className="tooltip-sigla">
            {estadoHover}
          </div>
        )}

        {estadoAtivo && clientesPorEstado[estadoAtivo] && (
          <div className="popup">
            <h3>{estadoAtivo}</h3>
            {clientesPorEstado[estadoAtivo].map((cliente, index) => (
              <div key={index} className="cliente">
                <img src={cliente.logo} alt={cliente.nome} />
                <span>{cliente.nome}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
