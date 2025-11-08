import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock de librerías 3D para evitar WebGL en JSDOM
jest.mock("@react-three/fiber", () => {
  return {
    Canvas: () => <div data-testid="canvas" />,
    useFrame: jest.fn(),
  };
});

jest.mock("@react-three/drei", () => {
  return {
    OrbitControls: () => <div data-testid="orbit-controls" />,
    Edges: () => <div data-testid="edges" />,
    Html: ({ children }: any) => <div>{children}</div>,
  };
});

import InteractiveGeo3D from "../InteractiveGeo3D";

describe("InteractiveGeo3D", () => {
  test("renderiza panel y controles básicos", () => {
    render(<InteractiveGeo3D />);
    // Canvas mockeado
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
    // Encabezado del panel
    expect(screen.getByText(/Panel de Control/i)).toBeInTheDocument();
    // Botones de figuras
    expect(screen.getByText(/📦 Cubo/)).toBeInTheDocument();
    expect(screen.getByText(/⚽ Esfera/)).toBeInTheDocument();
    expect(screen.getByText(/🔺 Pirámide/)).toBeInTheDocument();
    expect(screen.getByText(/🔷 Prisma/)).toBeInTheDocument();
    // Color y tamaño
    expect(screen.getByLabelText("color")).toBeInTheDocument();
    expect(screen.getByText(/Tamaño:/i)).toBeInTheDocument();
  });

  test("interacciones de panel: cambiar figura y toggles", async () => {
    const user = userEvent.setup();
    render(<InteractiveGeo3D />);

    // Botón de esfera
    const btnEsfera = screen.getByRole("button", { name: /⚽ Esfera/i });
    await user.click(btnEsfera);
    
    // Verificar que el botón de esfera existe después de hacer click
    expect(btnEsfera).toBeInTheDocument();

    // Botones de mostrar/ocultar
    const btnEdges = screen.getByRole("button", { name: /Ocultar Aristas/i });
    const btnVertices = screen.getByRole("button", { name: /Mostrar Puntos/i });
    const btnFaces = screen.getByRole("button", { name: /Ocultar Caras/i });

    await user.click(btnEdges);
    expect(screen.getByRole("button", { name: /Mostrar Aristas/i }))
      .toBeInTheDocument();

    await user.click(btnVertices);
    expect(screen.getByRole("button", { name: /Ocultar Puntos/i }))
      .toBeInTheDocument();

    await user.click(btnFaces);
    expect(screen.getByRole("button", { name: /Mostrar Caras/i }))
      .toBeInTheDocument();
  });
});