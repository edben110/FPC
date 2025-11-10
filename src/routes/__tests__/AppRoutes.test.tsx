import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../AppRoutes";

// Mock de los componentes 3D para evitar errores de WebGL
jest.mock("../../components/InteractiveGeo3D", () => ({
  __esModule: true,
  default: () => <div data-testid="interactive-geo-3d">InteractiveGeo3D Component</div>,
}));

jest.mock("../../components/ColombiaMap3D", () => ({
  __esModule: true,
  default: () => <div data-testid="colombia-map-3d">ColombiaMap3D Component</div>,
}));

jest.mock("../../components/Paint3D", () => ({
  __esModule: true,
  default: () => <div data-testid="paint-3d">Paint3D Component</div>,
}));

describe("AppRoutes", () => {
  test("renderiza HomePage en la ruta raíz", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Componentes Educativos 3D/i)).toBeInTheDocument();
  });

  test("renderiza InteractiveGeo3DView en /geo3d", () => {
    render(
      <MemoryRouter initialEntries={["/geo3d"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByTestId("interactive-geo-3d")).toBeInTheDocument();
  });

  test("renderiza ColombiaMapView en /colombia-map", () => {
    render(
      <MemoryRouter initialEntries={["/colombia-map"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByTestId("colombia-map-3d")).toBeInTheDocument();
  });

  test("renderiza Paint3DView en /paint3d", () => {
    render(
      <MemoryRouter initialEntries={["/paint3d"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByTestId("paint-3d")).toBeInTheDocument();
  });
});