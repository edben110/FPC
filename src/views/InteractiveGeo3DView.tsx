import InteractiveGeo3D from "../components/InteractiveGeo3D";
import InstructionsPanel from "../components/InstructionsPanel";

export default function InteractiveGeo3DView() {
  const instructions = [
    {
      icon: "🔷",
      title: "Explorar Figuras",
      description: "Selecciona entre Cubo, Esfera, Pirámide o Prisma. Cada una tiene propiedades geométricas únicas para aprender.",
      color: "blue"
    },
    {
      icon: "🎨",
      title: "Personalizar",
      description: "Cambia el color y ajusta el tamaño de la figura con los controles. ¡Hazla a tu gusto!",
      color: "purple"
    },
    {
      icon: "�️",
      title: "Ver Detalles",
      description: "Activa los botones para ver aristas (bordes), puntos (vértices) y caras de cada figura. ¡Cuenta cuántos tiene cada una!",
      color: "green"
    },
    {
      icon: "�",
      title: "Rotar y Ver",
      description: "Arrastra con el mouse para rotar la figura y verla desde todos los ángulos. Usa la rueda para acercar o alejar.",
      color: "orange"
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
