import Paint3D from "../components/Paint3D";
import InstructionsPanel from "../components/InstructionsPanel";

export default function Paint3DView() {
  const instructions = [
    {
      icon: "🖌️",
      title: "Dibujar",
      description: "Haz clic y arrastra sobre el lienzo blanco para dibujar líneas en 2D.",
      color: "blue"
    },
    {
      icon: "🎨",
      title: "Colores y Pincel",
      description: "Elige entre 10 colores con emojis y ajusta el grosor del pincel (1-10) con el control deslizante.",
      color: "purple"
    },
    {
      icon: "🔒",
      title: "Bloquear Cámara",
      description: "Botón VERDE: cámara libre. Botón ROJO: cámara bloqueada. ¡Bloquea para dibujar mejor!",
      color: "yellow"
    },
    {
      icon: "�",
      title: "Guardar y Galería",
      description: "Guarda tus dibujos y revisa tu galería de obras. Puedes eliminar dibujos desde la galería.",
      color: "green"
    }
  ];

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#f0f4f8" }} className="relative">
      <InstructionsPanel 
        title="Guía de Paint 3D"
        instructions={instructions}
      />
      <Paint3D />
    </div>
  );
}
