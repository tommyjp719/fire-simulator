import "./globals.css";

export const metadata = {
  title: "FIRE Simulator",
  description: "FIREまでの残年数を計算",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}