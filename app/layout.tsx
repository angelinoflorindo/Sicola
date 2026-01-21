import { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionWrapper from "@/components/sessionWrapper/SessionWrapper";

export const metadata: Metadata = {
  title: "Sicola - Simulação de Provas",
  description: "Criado por Angelino Francisco",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="pt">
      <body className="bg-gray-100">
        <div className="flex min-h-screen">
          <div className="flex-1 flex flex-col">
            <SessionWrapper session={session}> {children} </SessionWrapper>
          </div>
        </div>
      </body>
    </html>
  );
}
