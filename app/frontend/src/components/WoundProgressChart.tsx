"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

type ChartData = {
  day: number;
  granulation: number;
  slough: number;
  necrosis: number;
  wound_px: number;
};

interface Props {
  data: ChartData[];
}

export default function WoundProgressChart({ data }: Props) {
  // Convert proportions to percentages for display
  const chartData = data.map((d) => ({
    day: `Day ${d.day}`,
    Granulation: Math.round(d.granulation * 100),
    Slough: Math.round(d.slough * 100),
    Necrosis: Math.round(d.necrosis * 100),
    woundArea: d.wound_px
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.2)" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: 'gray' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: 'gray' }} 
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(28,28,30,0.9)', 
              borderRadius: '12px', 
              border: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              color: 'white'
            }}
            itemStyle={{ fontSize: '14px', fontWeight: 600 }}
            formatter={(value: any) => [`${value}%`]}
            labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
          />
          <Line type="linear" dataKey="Necrosis" stroke="#a855f7" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          <Line type="linear" dataKey="Slough" stroke="#ffcc00" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          <Line type="linear" dataKey="Granulation" stroke="#ff2d55" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
