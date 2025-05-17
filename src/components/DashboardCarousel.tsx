// src/components/DashboardCarousel.tsx

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList
} from 'recharts';

interface Props {
  nomeEscritorio: string;
  nProcessos: number;
  nAdvogados: number;
  tempoMes: number;
  perdaMensal: number;
}

export function DashboardCarousel({
  nomeEscritorio,
  nProcessos,
  nAdvogados,
  tempoMes,
  perdaMensal,
}: Props) {
  const processosData = [
    { nome: nomeEscritorio || 'Seu Escritório', valor: nProcessos / nAdvogados || 0 },
    { nome: 'Software Terceiro', valor: (nProcessos / nAdvogados) * 1.1 },
    { nome: 'Office ADV', valor: (nProcessos / nAdvogados) * 1.25 },
    { nome: 'CPJ-3C', valor: (nProcessos / nAdvogados) * 1.5 },
  ];

  const tempoData = [
    { nome: nomeEscritorio || 'Seu Escritório', valor: tempoMes },
    { nome: 'Software Terceiro', valor: tempoMes * 0.9 },
    { nome: 'Office ADV', valor: tempoMes * 0.75 },
    { nome: 'CPJ-3C', valor: tempoMes * 0.6 },
  ].map((item, i) => i === 0 ? item : { ...item, valor: tempoMes - item.valor });

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
        <SwiperSlide>
          <h2 className="section-title">🧠 Processos por Profissional</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processosData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="nome" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip cursor={{ fill: '#222' }} />
              <Bar dataKey="valor" fill="#00ffaa">
                <LabelList dataKey="valor" position="top" formatter={(v: number) => v.toFixed(0)} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SwiperSlide>

        <SwiperSlide>
          <h2 className="section-title">⏱ Tempo Operacional Perdido/Ganho (mensal)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={tempoData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="nome" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip cursor={{ fill: '#222' }} />
              <Bar dataKey="valor" fill="#00ffaa">
                <LabelList dataKey="valor" position="top" formatter={(v: number) => v.toFixed(0)} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SwiperSlide>

        <SwiperSlide>
          <h2 className="section-title">💰 Comparação de Custo (R$)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={financeiroData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="nome" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip formatter={(v: number) => `R$ ${v.toFixed(2)}`} />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#00ffaa"
                strokeWidth={2.5}
                dot={{ fill: '#fff', stroke: '#00ffaa', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
