import ColombiaMap3D from "../components/ColombiaMap3D";
import InstructionsPanel from "../components/InstructionsPanel";

export default function ColombiaMapView() {
  const instructions = [
    {
      icon: "🖱️",
      title: "Seleccionar Departamento",
      description: "Haz clic en cualquier cubo de departamento de la lista de la derecha para seleccionarlo. El cubo seleccionado se iluminará en color amarillo.",
      color: "blue"
    },
    {
      icon: "🎯",
      title: "Colocar en el Mapa",
      description: "Una vez seleccionado un departamento, haz clic en el círculo correspondiente del mapa 3D para colocarlo. Si es correcto, el círculo se volverá verde con una marca de verificación.",
      color: "green"
    },
    {
      icon: "📹",
      title: "Controlar la Cámara",
      description: "• Clic izquierdo + arrastrar: Rotar la vista\n• Clic derecho + arrastrar: Mover lateralmente (pan)\n• Rueda del mouse: Acercar/Alejar zoom\n• Puedes rotar 360° y ver desde cualquier ángulo",
      color: "purple"
    },
    {
      icon: "🗺️",
      title: "Mapa de Referencia",
      description: "El mapa de Colombia en el fondo te ayuda a ubicar geográficamente cada departamento. Los departamentos están organizados por regiones: Caribe, Andina, Pacífica, Orinoquía y Capital.",
      color: "yellow"
    },
    {
      icon: "🧭",
      title: "Brújula",
      description: "La brújula en la esquina inferior derecha indica la orientación norte del mapa para ayudarte a ubicarte mejor geográficamente.",
      color: "red"
    },
    {
      icon: "📊",
      title: "Puntuación",
      description: "• Acierto: +10 puntos (sonido de éxito)\n• Error: -5 puntos (sonido de error)\n• Completa todos los 16 departamentos para terminar el juego",
      color: "indigo"
    },
    {
      icon: "🎉",
      title: "Completar el Juego",
      description: "Cuando ubiques correctamente los 16 departamentos, aparecerá una animación de celebración. Podrás reiniciar el juego con el botón 'Reiniciar Juego'.",
      color: "pink"
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
