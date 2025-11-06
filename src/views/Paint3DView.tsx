import Paint3D from "../components/Paint3D";
import InstructionsPanel from "../components/InstructionsPanel";

export default function Paint3DView() {
  const instructions = [
    {
      icon: "🖌️",
      title: "Dibujar",
      description: "Haz clic y arrastra sobre el lienzo blanco para dibujar. El dibujo se limita al plano 2D del lienzo, sin profundidad 3D.",
      color: "blue"
    },
    {
      icon: "🎨",
      title: "Seleccionar Color",
      description: "Elige entre 10 colores disponibles haciendo clic en los botones de paleta. Cada color tiene un emoji identificador: ❤️ Rojo, 🧡 Naranja, 💛 Amarillo, 💚 Verde, 💙 Azul, 💜 Morado, 🖤 Negro, 🤍 Blanco, 🩷 Rosa, 🤎 Café.",
      color: "purple"
    },
    {
      icon: "📏",
      title: "Ajustar Tamaño del Pincel",
      description: "Usa el control deslizante para ajustar el grosor del pincel de 1 a 10 unidades. El tamaño actual se muestra en el indicador.",
      color: "green"
    },
    {
      icon: "🔒",
      title: "Bloquear/Desbloquear Cámara",
      description: "• Botón VERDE: Cámara libre, puedes rotarla\n• Botón ROJO: Cámara bloqueada, no se mueve\nBloqueando la cámara es más fácil dibujar con precisión.",
      color: "yellow"
    },
    {
      icon: "📹",
      title: "Controlar Cámara (cuando está libre)",
      description: "• Clic + arrastrar: Rotar la vista\n• Rueda del mouse: Acercar/Alejar\n• Dos dedos en trackpad: Zoom y rotación",
      color: "indigo"
    },
    {
      icon: "🗑️",
      title: "Limpiar Lienzo",
      description: "Haz clic en el botón 'Limpiar' para borrar todo el dibujo actual y empezar de nuevo con un lienzo en blanco.",
      color: "red"
    },
    {
      icon: "💾",
      title: "Guardar Dibujo",
      description: "Haz clic en 'Guardar Dibujo' para almacenar tu obra en la galería. Los dibujos se guardan automáticamente en el navegador (localStorage).",
      color: "blue"
    },
    {
      icon: "🖼️",
      title: "Ver Galería",
      description: "Haz clic en 'Ver Galería' para abrir una ventana con todos tus dibujos guardados. Desde ahí puedes eliminar dibujos individuales.",
      color: "pink"
    },
    {
      icon: "📊",
      title: "Indicador de Dibujo",
      description: "El indicador en la esquina superior derecha muestra el estado: 'Dibujando...' en verde cuando estás dibujando activamente.",
      color: "teal"
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
