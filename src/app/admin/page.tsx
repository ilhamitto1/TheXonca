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
import { collections } from "@/data/collections";

const stats = [
  { label: "Kolleksiyalar", value: String(collections.length), delta: "aktiv" },
  { label: "Rezervasiyalar", value: "24", delta: "+5 bu həftə" },
  { label: "Gözləmədə", value: "7", delta: "təsdiq gözləyir" },
  { label: "Çatdırılma", value: "150 AZN", delta: "standart" },
];

const chartData = [
  { month: "Yan", reservations: 8 },
  { month: "Fev", reservations: 10 },
  { month: "Mar", reservations: 14 },
  { month: "Apr", reservations: 12 },
  { month: "May", reservations: 18 },
  { month: "İyn", reservations: 22 },
  { month: "İyl", reservations: 24 },
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

      <div className="rounded-2xl border border-ivory/10 bg-charcoal/60 p-5">
        <p className="mb-4 text-sm text-mist">Rezervasiya tendensiyası</p>
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
                dataKey="reservations"
                stroke="#d4bc96"
                fill="url(#goldFill)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
