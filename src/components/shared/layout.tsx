import { Outlet } from "react-router";

export function Layout() {
  const year = new Date().getFullYear();

  return (
    <div className="p-3">
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

      <Outlet />

      <footer>
        <p className="text-center p-2 pt-0">© {year}</p>
      </footer>
    </div>
  );
}
