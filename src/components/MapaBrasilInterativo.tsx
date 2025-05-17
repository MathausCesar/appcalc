// src/components/MapaBrasilInterativo.tsx
import { useState } from 'react';
import MapaSVG from '../assets/mapa_brasil_com_ids.svg?react';
import './MapaBrasil.css';

const clientesPorEstado: Record<string, { nome: string; logo: string }[]> = {
  SP: [
    { nome: 'Nelson Wilians Advogados', logo: '/logos/logonw.png' },
    { nome: 'Crespo & Caires Advogados', logo: '/logos/logocrespoecaires.jpg' },
    { nome: 'Perez de Rezende Advocacia', logo: '/logos/logoperezderezende.png' },
    { nome: 'Caique Castro Sociedade de Advocacia', logo: '/logos/logocaiquecastro.jpeg' },
  ],
  PR: [
    { nome: 'Pereira Gionedis Advogados', logo: '/logos/logopereiragionedis.PNG' },
    { nome: 'Agencia de Fomento do Paraná', logo: '/logos/logoagenciadefomento.PNG' },
    { nome: 'Sanepar', logo: '/logos/logosanepar.PNG' },
    { nome: 'Natividade Sociedade de Advogados', logo: '/logos/logonatividade.png' },
  ],
  SC: [
    { nome: 'Oliveira e Antunes Advogados Associados', logo: '/logos/logooliveiraantunes.PNG' },
    { nome: 'Goes Nicoladelli Advogados Associados', logo: '/logos/logogoesnicoladelli.PNG' },
    { nome: 'Pamplona e Honjoya Sociedade de Advogados', logo: '/logos/logopamplona.png' },
  ],
  RS: [
    { nome: 'Anildo Advogado', logo: '/logos/logoanildo.png' },
    { nome: 'Andrade Maia Advogados', logo: '/logos/logoandrademaia.png' },
    { nome: 'Antinolfi Moller e Albornoz Advogados Associados', logo: '/logos/logoantinolfi.png' },
  ],
  DF: [
    { nome: 'Dunice & Marcon Advogados Associados', logo: '/logos/logodunicemarcon.png' },
  ],
  MS: [
    { nome: 'Mascarenhas Barbosa Sociedade de Advogados', logo: '/logos/logomascarenhas.PNG' },
    { nome: 'Assis Castro Vigo Advogados', logo: '/logos/logoacvadvogados.PNG' },
  ],
};

export function MapaBrasilInterativo() {
  const [estadoAtivo, setEstadoAtivo] = useState<string | null>(null);
  const [estadoHover, setEstadoHover] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    const id = (e.target as SVGElement).id;
    const sigla = id.replace('BR', '');
    if (clientesPorEstado[sigla]) {
      setEstadoAtivo(sigla);
    } else {
      setEstadoAtivo(null);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<SVGElement>) => {
    const id = (e.target as SVGElement).id;
    const sigla = id.replace('BR', '');
    setEstadoHover(sigla);
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
            <div className="clientes-logos">
              {clientesPorEstado[estadoAtivo].map((cliente, index) => (
                <img
                  key={index}
                  src={cliente.logo}
                  alt={cliente.nome}
                  title={cliente.nome}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
