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

interface DashboardProps {
  nomeEscritorio: string;
  nProcessos: number;
  nAdvogados: number;
}

export function DashboardProcessos({ nomeEscritorio, nProcessos, nAdvogados }: DashboardProps) {
  const processoPorAdvogado = nProcessos / nAdvogados;

  const data = [
    {
      nome: nomeEscritorio || 'Seu Escritório',
      valor: processoPorAdvogado,
    },
    {
      nome: 'Software Terceiro',
      valor: processoPorAdvogado * 1.1,
    },
    {
      nome: 'Office ADV',
      valor: processoPorAdvogado * 1.25,
    },
    {
      nome: 'CPJ-3C',
      valor: processoPorAdvogado * 1.4,
    },
  ];

  return (
    <div className="dashboard">
      <h2>📈 Processos por Advogado</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#00ffaa">
            <LabelList dataKey="valor" position="top" formatter={(v) => v.toFixed(0)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
