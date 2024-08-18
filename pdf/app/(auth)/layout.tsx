export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-row h-screen items-center justify-center">
        {children}
        </main>
        </body>
    </html>
  );
}
