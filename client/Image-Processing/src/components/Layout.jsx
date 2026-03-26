export default function Layout({ title, sidebar, children }) {
  return (
    // The "Floor" of the app
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* ZONE 1: HEADER */}
      <header className="navbar bg-base-100 shadow-md px-4 lg:px-12 sticky top-0 z-50">
        <div className="flex-1">
          <a className="text-xl font-bold text-primary">{title}</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost">Project List</button>
        </div>
      </header>

      {/* ZONE 2: THE WORKSPACE */}
      <main className="flex-grow p-4 md:p-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Only show aside if sidebar content exists */}
          {sidebar && (
            <aside className="md:col-span-4 space-y-6">{sidebar}</aside>
          )}

          {/* If no sidebar, span 12 cols and center; otherwise span 8 */}
          <section
            className={`${sidebar ? "md:col-span-8" : "md:col-span-8 md:col-start-3"} space-y-6`}
          >
            {children}
          </section>
        </div>
      </main>

      {/* ZONE 3: FOOTER */}
      <footer className="footer footer-center p-6 bg-base-100 text-base-content border-t border-base-300">
        <aside>
          <p>Copyright ©Full-Stack Project #1</p>
        </aside>
      </footer>
    </div>
  );
}
