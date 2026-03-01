export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        あなたの総資産で、FIREまであと何年？
      </h1>

      <p className="text-gray-400 mb-8">
        4％ルール × 実質リターンで、残年数を可視化。
      </p>

      <a
        href="/simulator"
        className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
      >
        無料でシミュレーションする
      </a>
    </main>
  );
}