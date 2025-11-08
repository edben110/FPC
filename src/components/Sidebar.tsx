import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaCubes, FaMapMarkedAlt, FaPaintBrush } from "react-icons/fa";

interface SidebarItem {
  label: string;
  route: string;
  icon?: React.ReactNode;
}

const mainItems: SidebarItem[] = [
  { label: "Inicio", route: "/", icon: <FaHome /> },
  { label: "Explorador 3D Interactivo", route: "/geo3d", icon: <FaCubes /> },
  { label: "Mapa de Colombia", route: "/colombia-map", icon: <FaMapMarkedAlt /> },
  { label: "Pintura 3D", route: "/paint3d", icon: <FaPaintBrush /> },
];

export default function Sidebar() {
  const [openMain, setOpenMain] = useState(true);
  const location = useLocation();

  // Ocultar sidebar en la página de inicio
  if (location.pathname === "/") {
    return null;
  }

  const renderNavItem = ({ label, route, icon }: SidebarItem) => (
    <NavLink
      key={route}
      to={route}
      className={({ isActive }) =>
        `w-full text-left flex items-center gap-2 justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 
         hover:bg-purple-50 dark:hover:bg-purple-900/30 
         ${isActive ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 font-semibold" : ""}`
      }
    >
      <div className="flex items-center gap-2">{icon} {label}</div>
    </NavLink>
  );

  return (
    <aside className="hidden md:block w-full md:w-[240px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="p-3 space-y-1">

        {/* Acordeón Main Items */}
        <button
          onClick={() => setOpenMain(!openMain)}
          className="w-full text-left flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 
                     hover:bg-purple-50 dark:hover:bg-purple-900/30 font-medium"
        >
          Componentes Educativos
          <span>{openMain ? "▲" : "▼"}</span>
        </button>
        {openMain && <div className="pl-4 space-y-1">{mainItems.map(renderNavItem)}</div>}

      </div>
    </aside>
  );
}
