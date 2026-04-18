"use client";

import {
  Area,
  AreaChart,
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
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGranulation" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff2d55" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ff2d55" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSlough" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffcc00" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ffcc00" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNecrosis" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
            </linearGradient>
          </defs>
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
            itemStyle={{ color: 'white', fontSize: '14px', fontWeight: 600 }}
            formatter={(value: any) => [`${value}%`]}
            labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
          />
          <Area type="monotone" dataKey="Necrosis" stackId="1" stroke="#000000" fill="url(#colorNecrosis)" strokeWidth={2} />
          <Area type="monotone" dataKey="Slough" stackId="1" stroke="#ffcc00" fill="url(#colorSlough)" strokeWidth={2} />
          <Area type="monotone" dataKey="Granulation" stackId="1" stroke="#ff2d55" fill="url(#colorGranulation)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
