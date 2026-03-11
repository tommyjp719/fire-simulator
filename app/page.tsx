export default function Home() {
  return (
    <main className="bg-black text-white">

      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">

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

        <div className="mt-16 flex flex-col items-center text-gray-500 animate-bounce">
          <span className="text-sm mb-1">Scroll</span>
          <span className="text-2xl">↓</span>
        </div>

      </section>
      {/* このツールで分かること */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-12">
          このツールで分かること
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-orange-400">
              FIREまでの年数
            </h3>
            <p className="text-gray-400 text-sm">
              現在の資産と生活費からFIRE達成までの年数を計算します。
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-orange-400">
              必要資産
            </h3>
            <p className="text-gray-400 text-sm">
              4%ルールに基づいた必要資産額を算出します。
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-orange-400">
              資産成長
            </h3>
            <p className="text-gray-400 text-sm">
              投資リターンと追加投資による資産成長をシミュレーションします。
            </p>
          </div>

        </div>

      </section>

      {/* FIREとは */}
      <section className="py-24 px-6 bg-gray-950 text-center">

        <div className="max-w-3xl mx-auto">

          <h2 className="text-3xl font-bold mb-6">
            FIREとは？
          </h2>

          <p className="text-gray-400 leading-relaxed">
            FIREとは「Financial Independence Retire Early」の略で、
            資産収入によって生活費をまかない、
            早期に経済的自由を得るライフスタイルです。
          </p>

        </div>

      </section>

      {/* 今後追加予定 */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-12">
          今後追加予定
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">
              資産の月次記録
            </h3>
            <p className="text-gray-400 text-sm">
              毎月の資産を記録してFIREまでの進捗を可視化します。
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">
              証券会社CSV連携
            </h3>
            <p className="text-gray-400 text-sm">
              楽天証券やSBI証券のCSVを取り込んで資産を自動更新します。
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">
              目標資産シミュレーション
            </h3>
            <p className="text-gray-400 text-sm">
              FIRE以外の資産目標にも対応予定です。
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}