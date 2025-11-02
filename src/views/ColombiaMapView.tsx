import ColombiaMap3D from "../components/ColombiaMap3D";

export default function ColombiaMapView() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        🇨🇴 Mapa Interactivo de Colombia
      </h1>
      <p className="text-center mb-6 text-gray-600">
        Aprende la geografía de Colombia ubicando los departamentos en el mapa 3D
      </p>
      <div className="flex justify-center">
        <ColombiaMap3D />
      </div>
    </div>
  );
}
