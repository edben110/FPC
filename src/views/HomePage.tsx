import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCubes, FaMapMarkedAlt, FaPaintBrush, FaBrain, FaLightbulb, FaUsers } from "react-icons/fa";
import Navbar from "../components/Navbar";

type ColorScheme = "blue" | "green" | "purple";

export default function HomeContent() {
  const components = [
    {
      title: "Explorador de Geometría 3D",
      shortDesc: "Visualización y manipulación de formas geométricas",
      fullDescription: "Una herramienta educativa avanzada que permite a los estudiantes explorar el mundo de la geometría tridimensional de manera interactiva. Los alumnos pueden manipular, rotar y analizar diversas figuras como cubos, esferas, conos y cilindros, comprendiendo sus propiedades espaciales y características únicas.",
      features: [
        "Visualización de 4 geometrías fundamentales",
        "Control de rotación y perspectiva en tiempo real",
        "Panel interactivo con información detallada",
        "Sistema de brújula 3D para orientación espacial"
      ],
      icon: <FaCubes className="w-12 h-12" />,
      route: "/geo3d",
      color: "blue" as ColorScheme,
    },
    {
      title: "Geografía de Colombia",
      shortDesc: "Aprendizaje interactivo de la geografía colombiana",
      fullDescription: "Módulo educativo diseñado para fortalecer el conocimiento geográfico de nuestro país. A través de un sistema de juego interactivo, los estudiantes aprenden la ubicación exacta de los 16 departamentos principales de Colombia, desarrollando habilidades espaciales y memoria geográfica mediante la práctica lúdica.",
      features: [
        "Mapa 3D interactivo de Colombia",
        "16 departamentos principales para ubicar",
        "Sistema de retroalimentación inmediata",
        "Efectos de sonido educativos",
        "Puntuación y seguimiento de progreso"
      ],
      icon: <FaMapMarkedAlt className="w-12 h-12" />,
      route: "/colombia-map",
      color: "green" as ColorScheme,
    },
    {
      title: "Lienzo de Arte 3D",
      shortDesc: "Creación artística en espacio tridimensional",
      fullDescription: "Plataforma innovadora que fusiona el arte tradicional con la tecnología 3D. Los estudiantes pueden expresar su creatividad dibujando en un espacio tridimensional, experimentando con colores, grosores de trazo y perspectivas únicas. Esta herramienta desarrolla la creatividad, la coordinación espacial y el pensamiento artístico.",
      features: [
        "Dibujo libre en espacio 3D",
        "Paleta de colores personalizable",
        "Control de grosor del trazo",
        "Visualización desde múltiples ángulos",
        "Sistema de guardado automático"
      ],
      icon: <FaPaintBrush className="w-12 h-12" />,
      route: "/paint3d",
      color: "purple" as ColorScheme,
    },
  ];

  const colorClasses: Record<ColorScheme, {
    badge: string;
    icon: string;
    button: string;
    border: string;
  }> = {
    blue: {
      badge: "bg-blue-100 text-blue-700 border-blue-300",
      icon: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      border: "border-blue-200"
    },
    green: {
      badge: "bg-green-100 text-green-700 border-green-300",
      icon: "text-green-600",
      button: "bg-green-600 hover:bg-green-700 text-white",
      border: "border-green-200"
    },
    purple: {
      badge: "bg-purple-100 text-purple-700 border-purple-300",
      icon: "text-purple-600",
      button: "bg-purple-600 hover:bg-purple-700 text-white",
      border: "border-purple-200"
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-6">
              <span className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider shadow-lg">
                Innovación Educativa
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mentes Creativas
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Centro de Aprendizaje Interactivo 3D
            </p>
            <p className="text-lg text-slate-500 max-w-4xl mx-auto mt-4">
              Plataforma educativa que integra tecnología 3D con metodologías pedagógicas modernas, 
              ofreciendo experiencias de aprendizaje inmersivas que potencian la creatividad y 
              el pensamiento espacial de nuestros estudiantes.
            </p>
          </motion.div>

          {/* Components Section */}
          <div className="space-y-16 mb-20">
            {components.map((component, index) => (
              <motion.div
                key={component.route}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${colorClasses[component.color].border}`}
              >
                <div className="grid md:grid-cols-5 gap-6 p-8">
                  {/* Icon & Badge Section */}
                  <div className="md:col-span-1 flex flex-col items-center justify-center">
                    <div className={`p-6 rounded-2xl ${colorClasses[component.color].icon} bg-opacity-10 mb-4`}>
                      {component.icon}
                    </div>
                    <span className={`px-4 py-1 rounded-full text-xs font-semibold border ${colorClasses[component.color].badge}`}>
                      Módulo {index + 1}
                    </span>
                  </div>

                  {/* Content Section */}
                  <div className="md:col-span-4">
                    <h2 className="text-3xl font-bold text-slate-800 mb-3">
                      {component.title}
                    </h2>
                    <p className="text-lg text-slate-600 font-medium mb-4 italic">
                      {component.shortDesc}
                    </p>
                    <p className="text-base text-slate-700 mb-6 leading-relaxed">
                      {component.fullDescription}
                    </p>

                    {/* Features List */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                        Características Principales:
                      </h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {component.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-slate-600">
                            <span className={`mr-2 mt-1 ${colorClasses[component.color].icon}`}>✓</span>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Link to={component.route}>
                      <button className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 ${colorClasses[component.color].button}`}>
                        Explorar Módulo →
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-10 border-2 border-indigo-100"
          >
            <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">
              Nuestros Pilares Educativos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="inline-block p-4 bg-blue-600 text-white rounded-full mb-4">
                  <FaBrain className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Pensamiento Crítico</h3>
                <p className="text-slate-600 leading-relaxed">
                  Desarrollamos habilidades de análisis y razonamiento espacial mediante experiencias prácticas e interactivas.
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="inline-block p-4 bg-green-600 text-white rounded-full mb-4">
                  <FaLightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Creatividad</h3>
                <p className="text-slate-600 leading-relaxed">
                  Fomentamos la expresión artística y la innovación a través de herramientas tecnológicas de vanguardia.
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="inline-block p-4 bg-purple-600 text-white rounded-full mb-4">
                  <FaUsers className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Aprendizaje Colaborativo</h3>
                <p className="text-slate-600 leading-relaxed">
                  Promovemos el trabajo en equipo y el intercambio de conocimientos en un ambiente digital inclusivo.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
