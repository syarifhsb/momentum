import { Outlet } from "react-router";

export function Layout() {
  const year = new Date().getFullYear();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl space-y-4 p-4 flex flex-col min-h-screen">
        <nav>
          <ul className="flex justify-center space-x-4 p-2">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>

        <div className="flex-[1]">
          <Outlet />
        </div>

        <footer>
          <p className="text-center p-2 pt-0">© {year}</p>
        </footer>
      </div>
    </div>
  );
}
