import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido dinámico (cada vista) */}
      <main className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <Outlet />
      </main>
    </div>
  );
}
