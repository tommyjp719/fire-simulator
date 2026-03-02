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
import { simulateFire } from "../../lib/fireEngine";

export default function Simulator() {
  const [asset, setAsset] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [contribution, setContribution] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [chartData, setChartData] = useState<{ year: number; asset: number }[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [fireYear, setFireYear] = useState<number | null>(null);
  const [fireAsset, setFireAsset] = useState<number | null>(null);

  const calculate = () => {
    if (expense <= 0) {
      setResult("年間生活費を入力してください");
      return;
    }

    const resultData = simulateFire({
      asset,
      expense,
      contribution,
      returnRate: 0.05,      // 年利5%
      inflationRate: 0.02,   // インフレ2%
      withdrawalRate: 0.04,  // 4%ルール
    });

    setTarget(resultData.fireTarget);
    setFireYear(resultData.years);
    setFireAsset(resultData.finalAsset);
    setChartData(resultData.data);

    setResult(`FIREまであと ${resultData.years}年0ヶ月`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-xl bg-gray-900/80 backdrop-blur-xl p-6 sm:p-10 rounded-2xl shadow-2xl border border-gray-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 tracking-tight">
          FIREシミュレーター
        </h1>

        <div className="space-y-6">
          <input
            type="text"
            inputMode="numeric"
            placeholder="現在総資産"
            value={asset ? asset.toLocaleString() : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (!isNaN(Number(raw))) setAsset(Number(raw));
            }}
            className="w-full p-4 text-base rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="年間生活費"
            value={expense ? expense.toLocaleString() : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (!isNaN(Number(raw))) setExpense(Number(raw));
            }}
            className="w-full p-4 text-base rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="年間追加投資"
            value={contribution ? contribution.toLocaleString() : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (!isNaN(Number(raw))) setContribution(Number(raw));
            }}
            className="w-full p-4 text-base rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={calculate}
            className="w-full py-4 text-lg rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg"
          >
            計算する
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 text-center"
          >
            <div className="text-gray-400 text-sm mb-3 tracking-wider">
              シミュレーション結果
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="text-xl sm:text-2xl text-gray-300 mb-2">
                FIREまであと
              </div>

              <div className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent leading-tight">
                {result.replace("FIREまであと ", "")}
              </div>
            </div>

            {chartData.length > 0 && (
              <div className="hidden sm:block mt-6 w-full h-60 sm:h-64 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="year" stroke="#aaa" />
                    <YAxis
                      stroke="#aaa"
                      tickFormatter={(value) =>
                        Number(value).toLocaleString("ja-JP")
                      }
                    />
                    <Tooltip
                      formatter={(value) =>
                        Number(value).toLocaleString("ja-JP") + " 円"
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="asset"
                      stroke="#ff6b00"
                      strokeWidth={3}
                      dot={false}
                    />
                    {fireYear !== null && fireAsset !== null && (
                      <ReferenceDot
                        x={fireYear}
                        y={fireAsset}
                        r={7}
                        fill="#ff4444"
                        stroke="white"
                        strokeWidth={2}
                      />
                    )}
                    <ReferenceLine
                      y={target}
                      stroke="#ff4444"
                      strokeDasharray="5 5"
                      label={{
                        value: "FIRE目標",
                        position: "insideTopRight",
                        fill: "#ff4444",
                        fontSize: 12,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}