import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

interface DashboardTempoProps {
  tempoMes: number;
}

export function DashboardTempo({ tempoMes }: DashboardTempoProps) {
  const ganho10 = tempoMes * 0.1;
  const ganho25 = tempoMes * 0.25;
  const ganho40 = tempoMes * 0.4;

  const data = [
    {
      nome: 'Seu Escritório',
      valor: -tempoMes,
    },
    {
      nome: 'Software Terceiro',
      valor: ganho10,
    },
    {
      nome: 'Office ADV',
      valor: ganho25,
    },
    {
      nome: 'CPJ-3C',
      valor: ganho40,
    },
  ];

  return (
    <div className="dashboard">
      <h2>🕒 Tempo Operacional Perdido/Ganho (mensal)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip formatter={(value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)} h`} />
          <Bar dataKey="valor" fill="#ff9f40">
            <LabelList
              dataKey="valor"
              position="top"
              formatter={(v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}h`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
