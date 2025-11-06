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
    expect(screen.getByText(/Interacción 3D/i)).toBeInTheDocument();
    // Select de figuras y opciones
    const combo = screen.getByRole("combobox");
    expect(combo).toBeInTheDocument();
    expect(screen.getByText("Cubo")).toBeInTheDocument();
    expect(screen.getByText("Esfera")).toBeInTheDocument();
    expect(screen.getByText("Pirámide")).toBeInTheDocument();
    expect(screen.getByText("Prisma (triangular)"))
      .toBeInTheDocument();
    // Color y escala
    expect(screen.getByLabelText("color")).toBeInTheDocument();
    expect(screen.getByText(/Escala:/i)).toBeInTheDocument();
  });

  test("interacciones de panel: cambiar figura y toggles", async () => {
    const user = userEvent.setup();
    render(<InteractiveGeo3D />);

    // Cambiar la figura a "esfera"
    const combo = screen.getByRole("combobox");
    await user.selectOptions(combo, "esfera");
    // El valor del select debe ser 'esfera'
    expect((combo as HTMLSelectElement).value).toBe("esfera");

    // Botones de mostrar/ocultar
    const btnEdges = screen.getByRole("button", { name: /Ocultar aristas/i });
    const btnVertices = screen.getByRole("button", { name: /Mostrar vértices/i });
    const btnFaces = screen.getByRole("button", { name: /Ocultar caras/i });

    await user.click(btnEdges);
    expect(screen.getByRole("button", { name: /Mostrar aristas/i }))
      .toBeInTheDocument();

    await user.click(btnVertices);
    expect(screen.getByRole("button", { name: /Ocultar vértices/i }))
      .toBeInTheDocument();

    await user.click(btnFaces);
    expect(screen.getByRole("button", { name: /Mostrar caras/i }))
      .toBeInTheDocument();
  });
});