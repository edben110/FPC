import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../AppRoutes";

describe("AppRoutes", () => {
  test("renderiza HomePage en la ruta raíz", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Componentes Educativos 3D/i)).toBeInTheDocument();
  });
});