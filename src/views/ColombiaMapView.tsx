import ColombiaMap3D from "../components/ColombiaMap3D";
import InstructionsPanel from "../components/InstructionsPanel";

export default function ColombiaMapView() {
  const instructions = [
    {
      icon: "🎮",
      title: "Cómo Jugar",
      description: "Selecciona un departamento haciendo clic en su cubo, luego colócalo en su posición correcta del mapa. ¡Completa los 16 departamentos!",
      color: "blue"
    },
    {
      icon: "📹",
      title: "Mover la Vista",
      description: "Arrastra con el mouse para rotar, usa la rueda para zoom y clic derecho para mover lateralmente.",
      color: "purple"
    },
    {
      icon: "⭐",
      title: "Puntuación",
      description: "Acierto: +10 puntos. Error: -5 puntos. ¡Intenta obtener el máximo puntaje!",
      color: "yellow"
    }
  ];

  return (
    <div className="p-4 relative">
      <h1 className="text-3xl font-bold mb-4 text-center">
        🇨🇴 Mapa Interactivo de Colombia
      </h1>
      <p className="text-center mb-6 text-gray-600">
        Aprende la geografía de Colombia ubicando los departamentos en el mapa 3D
      </p>
      
      <InstructionsPanel 
        title="Instrucciones del Juego"
        instructions={instructions}
      />
      
      <div className="flex justify-center">
        <ColombiaMap3D />
      </div>
    </div>
  );
}
