import { useState } from 'react';
import './styles/style.css';
import { DashboardCarousel } from './components/DashboardCarousel';
import { MapaBrasilInterativo } from './components/MapaBrasilInterativo';

const valorHoraPorPerfil: Record<string, number> = {
  massificado: 18.75,
  especialista: 28.41,
  fullservice: 36.93,
  boutique: 45.45,
};

const fatorSistema: Record<string, number> = {
  nenhum: 1.0,
  planilhas: 0.85,
  sistemaproprio: 0.7,
  erp: 0.55,
};

function App() {
  const [nomeEscritorio, setNomeEscritorio] = useState('');
  const [perfil, setPerfil] = useState('massificado');
  const [tempoMin, setTempoMin] = useState(0);
  const [controladoria, setControladoria] = useState(1);
  const [sistema, setSistema] = useState('nenhum');
  const [nProcessos, setNProcessos] = useState(0);
  const [nAdvogados, setNAdvogados] = useState(1);

  const valorHora = valorHoraPorPerfil[perfil];
  const fator = fatorSistema[sistema];

  const tempoHoraDia = (tempoMin / 60) * controladoria * fator;
  const tempoMes = tempoHoraDia * 22;
  const perdaMensal = tempoMes * valorHora;
  const perdaDiariaPorPessoa = perdaMensal / (controladoria * 22);

  return (
    <div className="container">
      <div className="section">
        <h2>📊 Calculadora Jurídica</h2>

        <div className="input-group">
          <label>Nome do Escritório:</label>
          <input
            type="text"
            value={nomeEscritorio}
            onChange={e => setNomeEscritorio(e.target.value)}
            placeholder="Ex: Silva & Associados"
          />
        </div>

        <div className="input-group">
          <label>Perfil do Escritório:</label>
          <select value={perfil} onChange={e => setPerfil(e.target.value)}>
            <option value="massificado">Massificado</option>
            <option value="especialista">Especialista</option>
            <option value="fullservice">Full Service</option>
            <option value="boutique">Boutique</option>
          </select>
        </div>

        <div className="input-group">
          <label>Tempo médio por dia com publicações (minutos):</label>
          <input
            type="number"
            value={tempoMin}
            onChange={e => setTempoMin(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Profissionais de Controladoria:</label>
          <input
            type="number"
            value={controladoria}
            onChange={e => setControladoria(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Sistema utilizado:</label>
          <select value={sistema} onChange={e => setSistema(e.target.value)}>
            <option value="nenhum">Nenhum</option>
            <option value="planilhas">Planilhas</option>
            <option value="sistemaproprio">Sistema Próprio</option>
            <option value="erp">ERP Jurídico</option>
          </select>
        </div>

        <div className="input-group">
          <label>Número de Processos Ativos:</label>
          <input
            type="number"
            value={nProcessos}
            onChange={e => setNProcessos(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Número de Advogados no Escritório:</label>
          <input
            type="number"
            value={nAdvogados}
            onChange={e => setNAdvogados(Number(e.target.value))}
          />
        </div>

        <div className="resultado">
          <h3>Resultados:</h3>
          <p><strong>Tempo desperdiçado por mês:</strong> {tempoMes.toFixed(2)} horas</p>
          <p><strong>R$ desperdiçado por mês:</strong> R$ {perdaMensal.toFixed(2)}</p>
          <p><strong>R$ perdido por colaborador por dia:</strong> R$ {perdaDiariaPorPessoa.toFixed(2)}</p>
        </div>
      </div>

      <div className="section">
        <DashboardCarousel
          nomeEscritorio={nomeEscritorio}
          nProcessos={nProcessos}
          nAdvogados={nAdvogados}
          tempoMes={tempoMes}
          perdaMensal={perdaMensal}
        />
      </div>

      <div className="section">
        <MapaBrasilInterativo />
      </div>
    </div>
  );
}

export default App;
