import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCubes, FaMapMarkedAlt, FaPaintBrush } from "react-icons/fa";

export default function HomeContent() {
  const components = [
    {
      title: "Explorador 3D Interactivo",
      description: "Explora y manipula figuras geométricas en 3D: cubo, esfera, pirámide y prisma.",
      icon: <FaCubes className="w-16 h-16" />,
      route: "/geo3d",
      color: "from-blue-500 to-cyan-500",
      badge: "Geometría",
    },
    {
      title: "Mapa de Colombia",
      description: "Juego educativo interactivo para aprender la ubicación de los 16 departamentos principales.",
      icon: <FaMapMarkedAlt className="w-16 h-16" />,
      route: "/colombia-map",
      color: "from-yellow-500 to-orange-500",
      badge: "Geografía",
    },
    {
      title: "Pintura 3D",
      description: "Crea arte digital dibujando trazos libres en un lienzo 3D con múltiples colores y grosores.",
      icon: <FaPaintBrush className="w-16 h-16" />,
      route: "/paint3d",
      color: "from-purple-500 to-pink-500",
      badge: "Arte",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-16 px-6">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Componentes Educativos 3D
          </h1>
          <p className="text-2xl md:text-3xl text-slate-700 font-semibold max-w-3xl mx-auto">
            Explora tres experiencias interactivas diseñadas para el aprendizaje mediante visualización 3D
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {components.map((component, index) => (
            <motion.div
              key={component.route}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Link to={component.route}>
                <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Gradient Header */}
                  <div className={`h-40 bg-gradient-to-r ${component.color} flex items-center justify-center text-white`}>
                    {component.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                        {component.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${component.color} text-white`}>
                        {component.badge}
                      </span>
                    </div>
                    <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 font-medium">
                      {component.description}
                    </p>
                    <div className="flex items-center text-purple-600 dark:text-purple-400 text-xl font-bold group-hover:translate-x-2 transition-transform">
                      Explorar →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h2 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
            🎯 Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-white">Educativo</h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                Diseñado específicamente para el aprendizaje interactivo
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-white">Intuitivo</h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                Interfaces amigables y fáciles de usar para todas las edades
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-white">Interactivo</h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                Experiencias 3D inmersivas con controles en tiempo real
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
