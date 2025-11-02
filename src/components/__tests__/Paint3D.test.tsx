import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock de librerías 3D para evitar WebGL en JSDOM
jest.mock("@react-three/fiber", () => {
  return {
    Canvas: () => <div data-testid="canvas" />,
    useThree: jest.fn(() => ({ gl: { domElement: document.createElement("canvas") }, camera: {} })),
    extend: jest.fn(),
  };
});

jest.mock("@react-three/drei", () => {
  return {
    OrbitControls: () => <div data-testid="orbit-controls" />,
    Line: ({ children }: any) => <div data-testid="line">{children}</div>,
  };
});

import Paint3D from "../Paint3D";

describe("Paint3D", () => {
  test("renderiza panel y controles principales", () => {
    render(<Paint3D />);
    // Canvas mockeado
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
    // Encabezado del panel
    expect(screen.getByText(/Pintura 3D/i)).toBeInTheDocument();
    // Estadísticas
    expect(screen.getByText(/Trazos:/i)).toBeInTheDocument();
    expect(screen.getByText(/Obras guardadas:/i)).toBeInTheDocument();
    // Botones y controles presentes
    expect(screen.getByRole("button", { name: /Cámara libre/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Deshacer último trazo/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Borrar todo/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Guardar obra/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ver galería/i })).toBeInTheDocument();
  });

  test("interacciones del panel: cambiar grosor, bloquear cámara y ver galería", async () => {
    const user = userEvent.setup();
    render(<Paint3D />);

    // Grosor del pincel: deslizar y ver número
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "7" } });
    const thicknessSection = screen.getByText(/Grosor del pincel/i).closest("div") as HTMLElement;
    expect(within(thicknessSection).getByText("7")).toBeInTheDocument();

    // Bloquear cámara
    const btnCamera = screen.getByRole("button", { name: /Cámara libre/i });
    await user.click(btnCamera);
    expect(screen.getByRole("button", { name: /Cámara bloqueada/i })).toBeInTheDocument();

    // Ver galería
    const btnGallery = screen.getByRole("button", { name: /Ver galería/i });
    await user.click(btnGallery);
    expect(screen.getByText(/Mis obras guardadas/i)).toBeInTheDocument();
    expect(screen.getByText(/Aún no has guardado ninguna obra/i)).toBeInTheDocument();
  });

  test("botones de deshacer, borrar y guardar están deshabilitados sin trazos", () => {
    render(<Paint3D />);
    const btnUndo = screen.getByRole("button", { name: /Deshacer último trazo/i });
    const btnClear = screen.getByRole("button", { name: /Borrar todo/i });
    const btnSave = screen.getByRole("button", { name: /Guardar obra/i });

    expect(btnUndo).toBeDisabled();
    expect(btnClear).toBeDisabled();
    expect(btnSave).toBeDisabled();
  });
});