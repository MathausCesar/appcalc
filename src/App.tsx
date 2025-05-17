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
  const [nAdvogados, setNAdvogados] = useState<number | ''>('');
  const [nProcessos, setNProcessos] = useState<number | ''>('');
  const [tempoMin, setTempoMin] = useState<number | ''>('');
  const [controladoria, setControladoria] = useState<number | ''>('');
  const [sistema, setSistema] = useState('nenhum');

  const valorHora = valorHoraPorPerfil[perfil];
  const fator = fatorSistema[sistema];

  // Garantir que os cálculos usem 0 se estiverem vazios
  const tempoHoraDia = ((Number(tempoMin) || 0) / 60) * (Number(controladoria) || 0) * fator;
  const tempoMes = tempoHoraDia * 22;
  const perdaMensal = tempoMes * valorHora;
  const perdaDiariaPorPessoa = (Number(controladoria) || 0) > 0 ? perdaMensal / ((Number(controladoria) || 0) * 22) : 0;

  return (
    <div className="container">
      <div className="section">
        <h2>📊 Calculadora de Eficiência</h2>


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
          <label>Número de Advogados:</label>
          <input
            type="number"
            value={nAdvogados}
            onChange={e =>
              setNAdvogados(e.target.value === '' ? '' : Number(e.target.value))
            }
          />
        </div>

        <div className="input-group">
          <label>Número de Processos:</label>
          <input
            type="number"
            value={nProcessos}
            onChange={e =>
              setNProcessos(e.target.value === '' ? '' : Number(e.target.value))
            }
          />
        </div>

        <div className="input-group">
          <label>Tempo Diário com Tratamento de Publicações e Distribuição de Tarefas (minutos):</label>
          <input
            type="number"
            value={tempoMin}
            onChange={e =>
              setTempoMin(e.target.value === '' ? '' : Number(e.target.value))
            }
          />
        </div>

        <div className="input-group">
          <label>Quantas Pessoas cuidam dessa rotina?</label>
          <input
            type="number"
            value={controladoria}
            onChange={e =>
              setControladoria(e.target.value === '' ? '' : Number(e.target.value))
            }
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

       <div className="resultado">
  <h3>Resultado:</h3>
  <p><strong>⏳ Quantas horas você está perdendo:</strong> {tempoMes.toFixed(2)} horas</p>
  <p><strong>💰 Quanto você pode economizar:</strong> R$ {perdaMensal.toFixed(2)}</p>
  <p><strong>👤 Quanto isso custa diariamente por colaborador:</strong> R$ {perdaDiariaPorPessoa.toFixed(2)}</p>
</div>
      </div>

      <div className="section">
        <DashboardCarousel
          nomeEscritorio={nomeEscritorio}
          nProcessos={Number(nProcessos) || 0}
          nAdvogados={Number(nAdvogados) || 0}
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
