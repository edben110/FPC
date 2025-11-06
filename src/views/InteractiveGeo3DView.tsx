import InteractiveGeo3D from "../components/InteractiveGeo3D";
import InstructionsPanel from "../components/InstructionsPanel";

export default function InteractiveGeo3DView() {
  const instructions = [
    {
      icon: "🔷",
      title: "Seleccionar Figura",
      description: "Haz clic en uno de los 4 botones de formas para cambiar la figura 3D: Cubo, Esfera, Pirámide o Prisma. Cada una tiene propiedades geométricas únicas.",
      color: "blue"
    },
    {
      icon: "🎨",
      title: "Cambiar Color",
      description: "Usa el selector de color para cambiar el color de la figura. Puedes elegir cualquier color personalizado o usar los predefinidos.",
      color: "purple"
    },
    {
      icon: "📏",
      title: "Escalar Figura",
      description: "Ajusta el control deslizante de escala (0.5 a 2.0) para hacer la figura más grande o pequeña. El valor actual se muestra en el panel.",
      color: "green"
    },
    {
      icon: "🔄",
      title: "Rotación Manual",
      description: "Usa los controles de Rotación X, Y, Z para rotar la figura en cada eje:\n• X: Gira hacia adelante/atrás\n• Y: Gira izquierda/derecha\n• Z: Gira en sentido horario/antihorario",
      color: "orange"
    },
    {
      icon: "⚡",
      title: "Rotación Automática",
      description: "Activa el switch 'Auto-rotar' para que la figura gire automáticamente sobre el eje Y. Perfecto para ver todos los ángulos de la forma.",
      color: "yellow"
    },
    {
      icon: "👁️",
      title: "Mostrar Aristas",
      description: "Activa el switch 'Aristas' para ver las líneas que forman los bordes de la figura en negro. Útil para entender la estructura.",
      color: "indigo"
    },
    {
      icon: "⚫",
      title: "Mostrar Vértices",
      description: "Activa el switch 'Vértices' para ver puntos rojos en las esquinas de la figura. Ayuda a contar y visualizar los vértices.",
      color: "red"
    },
    {
      icon: "📐",
      title: "Mostrar Caras",
      description: "Activa el switch 'Caras' para ver números en cada cara de la figura. Ayuda a contar las caras y entender la geometría.",
      color: "pink"
    },
    {
      icon: "📹",
      title: "Controlar Cámara",
      description: "• Clic + arrastrar: Rotar la vista alrededor de la figura\n• Rueda del mouse: Acercar/Alejar zoom\n• Puedes ver la figura desde cualquier ángulo",
      color: "teal"
    },
    {
      icon: "⌨️",
      title: "Atajos de Teclado",
      description: "• Teclas 1-4: Cambiar entre figuras rápidamente\n• R: Reset rotación manual\n• A: Toggle auto-rotación\n• +/-: Aumentar/disminuir escala",
      color: "cyan"
    }
  ];

  return (
    <div className="p-4 relative">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🔷 Explorador de Geometría 3D
      </h1>
      <p className="text-center mb-8 text-gray-600">
        Interactúa con figuras geométricas: rota, escala y cambia colores para aprender sus propiedades
      </p>
      
      <InstructionsPanel 
        title="Guía de Geometría 3D"
        instructions={instructions}
      />
      
      <InteractiveGeo3D />
    </div>
  );
}
