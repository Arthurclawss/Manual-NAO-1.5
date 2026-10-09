import "./globals.css";
import { Nunito } from "next/font/google";
import AppShell from "@/components/AppShell";
import ClickSpark from "@/components/ClickSpark";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata = {
  title: "Manual Digital - Robô NAO",
  description:
    "Manual interativo e gamificado do robô humanoide NAO. Acesse capítulos, módulos, guias e informações sobre robótica educacional.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-nao-bg text-nao-body">
        <ClickSpark sparkColor="#f97316" sparkCount={15} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
