// src/components/DashboardCarousel.tsx

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

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
  Cell,
} from 'recharts'
import type { TooltipProps } from 'recharts'

interface Props {
  nomeEscritorio: string
  nProcessos: number
  nAdvogados: number
  tempoMes: number
  perdaMensal: number
}

const cores = {
  lead: '#FF4C4C',       // prejuízo
  office: '#00C8B4',     // ganho moderado
  cpj: '#00FF85',        // ganho máximo
}

export function DashboardCarousel({
  nomeEscritorio,
  nProcessos,
  nAdvogados,
  tempoMes,
  perdaMensal,
}: Props) {
  const processosData = [
    {
      nome: nomeEscritorio || 'Seu Escritório',
      valor: nProcessos / nAdvogados || 0,
      cor: cores.lead,
      tipo: 'volume',
    },
    {
      nome: 'Office ADV',
      valor: (nProcessos / nAdvogados) * 1.25,
      cor: cores.office,
      tipo: 'volume',
    },
    {
      nome: 'CPJ-3C',
      valor: (nProcessos / nAdvogados) * 1.5,
      cor: cores.cpj,
      tipo: 'volume',
    },
  ]

  const tempoData = [
    {
      nome: nomeEscritorio || 'Seu Escritório',
      valor: -tempoMes,
      cor: cores.lead,
      tipo: 'tempo',
    },
    {
      nome: 'Office ADV',
      valor: tempoMes * 0.25,
      cor: cores.office,
      tipo: 'tempo',
    },
    {
      nome: 'CPJ-3C',
      valor: tempoMes * 0.4,
      cor: cores.cpj,
      tipo: 'tempo',
    },
  ]

  const financeiroData = [
    {
      nome: nomeEscritorio || 'Seu Escritório',
      valor: -perdaMensal,
      tipo: 'financeiro',
    },
    {
      nome: 'Office ADV',
      valor: perdaMensal * 0.2,
      tipo: 'financeiro',
    },
    {
      nome: 'CPJ-3C',
      valor: perdaMensal * 0.4,
      tipo: 'financeiro',
    },
  ]

  const tooltipExplicacoes: Record<string, Record<string, string>> = {
    volume: {
      [nomeEscritorio || 'Seu Escritório']:
        'Sua operação tem potencial de melhoria no volume de processos por advogado.',
      'Office ADV':
        'Com o Office ADV, cada advogado gerencia mais processos com menos esforço.',
      'CPJ-3C':
        'Melhor desempenho: mais processos com máxima produtividade.',
    },
    tempo: {
      [nomeEscritorio || 'Seu Escritório']:
        'Essas são horas desperdiçadas com tarefas manuais todos os meses.',
      'Office ADV':
        'Com o Office ADV, você reduz horas operacionais e aumenta sua eficiência.',
      'CPJ-3C':
        'Máxima economia de tempo: sua equipe foca no que realmente importa.',
    },
    financeiro: {
      [nomeEscritorio || 'Seu Escritório']:
        'Valor perdido mensalmente com atividades manuais e improdutivas.',
      'Office ADV':
        'Ganhos expressivos com um sistema que acelera sua operação.',
      'CPJ-3C':
        'O maior retorno financeiro possível com tecnologia de ponta.',
    },
  }

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) {
      return null
    }

    const nome = label
    const valor = payload[0].value
    const tipo = payload[0].payload.tipo

    let valorFormatado = ''
    if (typeof valor === 'number') {
      valorFormatado =
        tipo === 'financeiro'
          ? `R$ ${valor.toFixed(2)}`
          : tipo === 'tempo'
          ? `${valor.toFixed(0)} horas`
          : `${valor.toFixed(0)} processos`
    }

    const mensagem = tooltipExplicacoes[tipo]?.[nome] ?? ''

    return (
      <div
        className="custom-tooltip"
        style={{
          background: '#111',
          padding: 12,
          borderRadius: 8,
          border: '1px solid #333',
          maxWidth: 300,
        }}
      >
        <p style={{ marginBottom: 4, fontWeight: 600 }}>{nome}</p>
        <p style={{ marginBottom: 6 }}>
          <strong>Resultado:</strong> {valorFormatado}
        </p>
        <p style={{ fontSize: 12, color: '#aaa' }}>{mensagem}</p>
      </div>
    )
  }

  return (
    <div className="section">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {/* 1️⃣ Relação Advogado/Processo */}
        <SwiperSlide>
          <h2 className="section-title">⚖️ Relação Advogado/Processo</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processosData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="nome" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                {processosData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.cor} fillOpacity={0.85} />
                ))}
                <LabelList
                  dataKey="valor"
                  position="top"
                  formatter={(v: number) => v.toFixed(0)}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SwiperSlide>

        {/* 2️⃣ Tempo Operacional */}
        <SwiperSlide>
          <h2 className="section-title">
            ⏱ Tempo Operacional Perdido/Ganho (mensal)
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={tempoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="nome" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                {tempoData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.cor} fillOpacity={0.85} />
                ))}
                <LabelList
                  dataKey="valor"
                  position="top"
                  formatter={(v: number) => v.toFixed(0)}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SwiperSlide>

        {/* 3️⃣ Curva de Economia */}
        <SwiperSlide>
          <h2 className="section-title">💰 Curva de Economia</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={financeiroData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="nome" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip content={CustomTooltip} />
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
  )
}
