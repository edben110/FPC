import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../Sidebar";

describe("Sidebar", () => {
  test("se oculta en la página de inicio", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar />
      </MemoryRouter>
    );

    // El sidebar debe retornar null en la página de inicio
    expect(container.firstChild).toBeNull();
  });

  test("muestra los enlaces principales en otras rutas", () => {
    render(
      <MemoryRouter initialEntries={["/geo3d"]}>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Explorador 3D Interactivo")).toBeInTheDocument();
    expect(screen.getByText("Mapa de Colombia")).toBeInTheDocument();
    expect(screen.getByText("Pintura 3D")).toBeInTheDocument();
  });

  test("marca activo el enlace según la ruta", () => {
    render(
      <MemoryRouter initialEntries={["/geo3d"]}>
        <Sidebar />
      </MemoryRouter>
    );

    const activeLink = screen.getByText("Explorador 3D Interactivo").closest("a");
    expect(activeLink).toHaveClass("from-purple-100");
    expect(activeLink).toHaveClass("font-semibold");
  });
});