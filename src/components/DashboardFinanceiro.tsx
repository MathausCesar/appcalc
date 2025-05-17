import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

interface DashboardFinanceiroProps {
  perdaMensal: number;
  nomeEscritorio: string;
}

export function DashboardFinanceiro({ perdaMensal, nomeEscritorio }: DashboardFinanceiroProps) {
  const ganhoOffice = perdaMensal * 0.2;
  const ganhoCPJ = perdaMensal * 0.4;

  const data = [
    {
      nome: nomeEscritorio || 'Seu Escritório',
      valor: -perdaMensal,
    },
    {
      nome: 'Software Terceiro',
      valor: 0,
    },
    {
      nome: 'OfficeADV',
      valor: ganhoOffice,
    },
    {
      nome: 'CPJ-3C',
      valor: ganhoCPJ,
    },
  ];

  return (
    <div className="dashboard">
      <h2>💸 Comparação de Custo (R$)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="colorValor" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="50%" stopColor="#00ff99" />
              <stop offset="100%" stopColor="#33ccff" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="url(#colorValor)"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          >
            <LabelList
              dataKey="valor"
              position="top"
              formatter={(v: number) => `R$ ${v.toFixed(2)}`}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
