import "./globals.css";

export const metadata = {
  title: "正在成为 | 一个刚毕业的人的个人网站",
  description: "简历还不长，人生刚刚开始变得具体。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
