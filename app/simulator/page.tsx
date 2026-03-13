"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";

import { simulateFire } from "@/lib/fireEngine";

type ChartPoint = {
  year: number;
  asset: number;
};

export default function Simulator() {
  const [asset, setAsset] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [contribution, setContribution] = useState<number>(0);
  const [result, setResult] = useState<string>("");

  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [fireYear, setFireYear] = useState<number | null>(null);
  const [fireAsset, setFireAsset] = useState<number | null>(null);
  const calculate = () => {
    if (!asset || !expense) {
        setResult("総資産と年間生活費を入力してください");
        return;
      }

    const resultData = simulateFire({
      asset,
      expense,
      contribution,
      returnRate: 0.05,
      inflationRate: 0.02,
      withdrawalRate: 0.04,
    });

    setTarget(resultData.fireTarget);
    setFireYear(resultData.years);
    setFireAsset(resultData.finalAsset);
    setChartData(resultData.data);

    setResult(`FIREまであと ${resultData.years}年0ヶ月`);
  };

  return (
    <section className="py-24 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-xl bg-slate-900/70 backdrop-blur-xl p-6 sm:p-10 rounded-2xl shadow-2xl border border-slate-800">

        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
          FIREシミュレーター
        </h2>

        <div className="space-y-6">

          <input
            type="text"
            inputMode="numeric"
            placeholder="現在の総資産（例：3,000,000）"
            value={asset ? asset.toLocaleString() : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (!isNaN(Number(raw))) setAsset(Number(raw));
            }}
            className="w-full p-4 rounded-xl bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="年間生活費（例：2,400,000）"
            value={expense ? expense.toLocaleString() : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (!isNaN(Number(raw))) setExpense(Number(raw));
            }}
            className="w-full p-4 rounded-xl bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="年間追加投資（例：600,000）"
            value={contribution ? contribution.toLocaleString() : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (!isNaN(Number(raw))) setContribution(Number(raw));
            }}
            className="w-full p-4 rounded-xl bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={calculate}
            className="w-full py-4 text-lg rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold"
          >
            FIRE年数を計算する
          </button>

        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >

            <div className="text-gray-400 text-sm mb-3">
              シミュレーション結果
            </div>

           {fireYear !== null ? (
              <div className="text-4xl sm:text-5xl font-black text-orange-500 mb-6">
               FIREまであと {fireYear}年
              </div>
              ) : (
              <div className="text-lg text-orange-400 mt-4">
               {result}
             </div>
            )}

            {chartData.length > 0 && (
              <div className="hidden sm:block w-full h-64">

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>

                    <XAxis dataKey="year" stroke="#aaa" />

                    <YAxis
                      stroke="#aaa"
                      tickFormatter={(v) => Number(v).toLocaleString("ja-JP")}
                    />

                    <Tooltip
                      formatter={(v) => Number(v).toLocaleString("ja-JP") + " 円"}
                    />

                    <Line
                      type="monotone"
                      dataKey="asset"
                      stroke="#f97316"
                      strokeWidth={3}
                      dot={false}
                    />

                    {fireYear && fireAsset && (
                      <ReferenceDot
                        x={fireYear}
                        y={fireAsset}
                        r={7}
                        fill="#ff4444"
                        stroke="white"
                      />
                    )}

                    <ReferenceLine
                      y={target}
                      stroke="#ff4444"
                      strokeDasharray="5 5"
                    />

                  </LineChart>
                </ResponsiveContainer>

              </div>
            )}

          </motion.div>
        )}

      </div>
    </section>
  );
}