export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className=" gap-2 w-full">
      <main className="w-full">
        {children}
      </main>
    </section>
  );
}
