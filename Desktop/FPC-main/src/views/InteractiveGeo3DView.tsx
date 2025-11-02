import InteractiveGeo3D from "../components/InteractiveGeo3D";

export default function InteractiveGeo3DView() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🔷 Explorador de Geometría 3D
      </h1>
      <p className="text-center mb-8 text-gray-600">
        Interactúa con figuras geométricas: rota, escala y cambia colores para aprender sus propiedades
      </p>
      <InteractiveGeo3D />
    </div>
  );
}
