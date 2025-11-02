import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views - Solo los 3 componentes principales
import HomePage from "../views/HomePage";
import InteractiveGeo3DView from "../views/InteractiveGeo3DView";
import ColombiaMapView from "../views/ColombiaMapView";
import Paint3DView from "../views/Paint3DView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="geo3d" element={<InteractiveGeo3DView />} />
        <Route path="colombia-map" element={<ColombiaMapView />} />
        <Route path="paint3d" element={<Paint3DView />} />
      </Route>
    </Routes>
  );
}