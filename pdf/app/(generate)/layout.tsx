import { ReactNode } from "react";
export default function GenerateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
        <main className="flex flex-col">
        {children}
        </main>
  );
}
