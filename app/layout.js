import "./globals.css";

export const metadata = {
  title: "Personal Website v0",
  description: "A public-only personal website draft with placeholders for confirmed content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
