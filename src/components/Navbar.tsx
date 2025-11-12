import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCubes, FaMapMarkedAlt, FaPaintBrush, FaHome, FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const components = [
    {
      name: "Explorador 3D",
      path: "/geo3d",
      icon: <FaCubes className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      name: "Mapa de Colombia",
      path: "/colombia-map",
      icon: <FaMapMarkedAlt className="w-5 h-5" />,
      color: "text-yellow-600",
    },
    {
      name: "Pintura 3D",
      path: "/paint3d",
      icon: <FaPaintBrush className="w-5 h-5" />,
      color: "text-purple-600",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <FaHome className="w-6 h-6" />
            <span>Inicio</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            {/* Componentes Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="flex items-center space-x-2 px-4 py-2 text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <span>Componentes</span>
                <FaChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  {components.map((component) => (
                    <Link
                      key={component.path}
                      to={component.path}
                      className={`flex items-center space-x-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                        location.pathname === component.path
                          ? "bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600"
                          : ""
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span className={component.color}>{component.icon}</span>
                      <span className="text-slate-800 dark:text-white font-medium">
                        {component.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
