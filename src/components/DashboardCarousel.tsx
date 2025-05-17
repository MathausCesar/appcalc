// src/components/DashboardCarousel.tsx

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Cell
} from 'recharts';

import type { TooltipProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface Props {
  nomeEscritorio: string;
  nProcessos: number;
  nAdvogados: number;
  tempoMes: number;
  perdaMensal: number;
}

const cores = {
  lead: '#FF4C4C', // prejuízo
  concorrente: '#BBBBBB', // neutro
  office: '#00C8B4', // ganho moderado
  cpj: '#00FF85' // ganho máximo
};

const tooltipExplicacoes: Record<string, string> = {
  'Seu Escritório': 'Reflete o desempenho atual do seu escritório com base nos dados informados.',
  'Software Terceiro': 'Um software genérico pode melhorar levemente a produtividade, mas não resolve a raiz do problema.',
  'Office ADV': 'Com o Office ADV, cada advogado gerencia mais processos, otimizando tempo e entregando mais com menos.',
  'CPJ-3C': 'O CPJ-3C oferece automação robusta, aumentando significativamente a produtividade e reduzindo custos.'
};

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const nome = payload[0].payload.nome;
    const valor = payload[0].value as number;
    const explicacao = tooltipExplicacoes[nome] || '';

    return (
      <div className="custom-tooltip" style={{ background: '#111', padding: 12, borderRadius: 8, border: '1px solid #333', maxWidth: 280 }}>
        <p style={{ marginBottom: 4, fontWeight: 600 }}>{nome}</p>
        <p style={{ marginBottom: 6 }}>
          Valor estimado:{' '}
          {nome === 'Seu Escritório' || nome === 'Software Terceiro' || nome === 'Office ADV' || nome === 'CPJ-3C'
            ? `R$ ${valor.toFixed(2)}`
            : `${valor}`}
        </p>
        <p style={{ fontSize: 12, color: '#aaa' }}>{explicacao}</p>
      </div>
    );
  }
  return null;
};

export function DashboardCarousel({
  nomeEscritorio,
  nProcessos,
  nAdvogados,
  tempoMes,
  perdaMensal,
}: Props) {
  const processosData = [
    { nome: nomeEscritorio || 'Seu Escritório', valor: nProcessos / nAdvogados || 0, cor: cores.lead },
    { nome: 'Software Terceiro', valor: (nProcessos / nAdvogados) * 1.1, cor: cores.concorrente },
    { nome: 'Office ADV', valor: (nProcessos / nAdvogados) * 1.25, cor: cores.office },
    { nome: 'CPJ-3C', valor: (nProcessos / nAdvogados) * 1.5, cor: cores.cpj },
  ];

  const tempoData = [
    { nome: nomeEscritorio || 'Seu Escritório', valor: -tempoMes, cor: cores.lead },
    { nome: 'Software Terceiro', valor: tempoMes * 0.1, cor: cores.concorrente },
    { nome: 'Office ADV', valor: tempoMes * 0.25, cor: cores.office },
    { nome: 'CPJ-3C', valor: tempoMes * 0.4, cor: cores.cpj },
  ];

  const financeiroData = [
    { nome: nomeEscritorio || 'Seu Escritório', valor: -perdaMensal },
    { nome: 'Software Terceiro', valor: 0 },
    { nome: 'Office ADV', valor: perdaMensal * 0.2 },
    { nome: 'CPJ-3C', valor: perdaMensal * 0.4 },
  ];

  return (
    <div className="section">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {/* Gráfico 1 */}
        <SwiperSlide>
          <h2 className="section-title">⚖️ Relação Advogado/Processo</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processosData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="nome" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                {processosData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} fillOpacity={0.85} />
                ))}
                <LabelList dataKey="valor" position="top" formatter={(v: number) => v.toFixed(0)} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SwiperSlide>

        {/* Gráfico 2 */}
        <SwiperSlide>
          <h2 className="section-title">⏱ Tempo Operacional Perdido/Ganho (mensal)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={tempoData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="nome" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                {tempoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} fillOpacity={0.85} />
                ))}
                <LabelList dataKey="valor" position="top" formatter={(v: number) => `${v.toFixed(0)}h`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SwiperSlide>

        {/* Gráfico 3 */}
        <SwiperSlide>
          <h2 className="section-title">💰 Curva de Economia</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={financeiroData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="nome" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="url(#gradFinanceiro)"
                strokeWidth={3}
                dot={{ fill: '#fff', stroke: '#00FF85', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
              />
              <defs>
                <linearGradient id="gradFinanceiro" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF4C4C" />
                  <stop offset="40%" stopColor="#BBBBBB" />
                  <stop offset="70%" stopColor="#00C8B4" />
                  <stop offset="100%" stopColor="#00FF85" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
