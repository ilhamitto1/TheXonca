"use client";

import { m } from "motion/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const stats = [
  { label: "Gəlir", value: "$248,400", delta: "+12.4%" },
  { label: "Rezervasiyalar", value: "38", delta: "+6" },
  { label: "Sifarişlər", value: "124", delta: "+18%" },
  { label: "Mesajlar", value: "17", delta: "5 yeni" },
];

const chartData = [
  { month: "Yan", revenue: 18000 },
  { month: "Fev", revenue: 22000 },
  { month: "Mar", revenue: 26000 },
  { month: "Apr", revenue: 24000 },
  { month: "May", revenue: 31000 },
  { month: "İyn", revenue: 36000 },
  { month: "İyl", revenue: 42000 },
];

const recent = [
  { id: "BK-2041", name: "Villa Aurelia", status: "Təsdiqləndi", amount: "$48,000" },
  { id: "BK-2038", name: "Maison Lumière", status: "Gözləmədə", amount: "$22,000" },
  { id: "OR-9912", name: "Mərasim Sütunları", status: "Ödənildi", amount: "$2,400" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-soft">
          Panel
        </p>
        <h1 className="mt-2 font-display text-4xl">Ümumi baxış</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <m.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-ivory/10 bg-charcoal/60 p-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-mist">
              {stat.label}
            </p>
            <p className="mt-3 font-display text-3xl">{stat.value}</p>
            <p className="mt-2 text-sm text-gold-soft">{stat.delta}</p>
          </m.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-ivory/10 bg-charcoal/60 p-5">
          <p className="mb-4 text-sm text-mist">Gəlir tendensiyası</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4bc96" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#d4bc96" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="month" stroke="#8a8074" fontSize={12} />
                <YAxis stroke="#8a8074" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#1c1814",
                    border: "1px solid rgba(212,188,150,0.2)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#d4bc96"
                  fill="url(#goldFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-ivory/10 bg-charcoal/60 p-5">
          <p className="mb-4 text-sm text-mist">Son fəaliyyət</p>
          <ul className="space-y-4">
            {recent.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b border-ivory/5 pb-4"
              >
                <div>
                  <p className="font-body text-sm">{item.name}</p>
                  <p className="text-xs text-mist">
                    {item.id} · {item.status}
                  </p>
                </div>
                <p className="text-sm text-gold-soft">{item.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
