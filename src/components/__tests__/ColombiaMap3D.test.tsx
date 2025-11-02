import { render, screen } from "@testing-library/react";

// Mock de librerías 3D para evitar WebGL en JSDOM
jest.mock("@react-three/fiber", () => {
  return {
    Canvas: () => <div data-testid="canvas" />,
    useFrame: jest.fn(),
    useThree: jest.fn(() => ({ gl: {}, camera: {}, scene: {} })),
  };
});

jest.mock("@react-three/drei", () => {
  return {
    OrbitControls: () => <div data-testid="orbit-controls" />,
    Text: ({ children }: any) => <span>{children}</span>,
    Html: ({ children }: any) => <div>{children}</div>,
  };
});

// THREE puede ser requerido por el componente; si hace llamadas nativas complejas, se pueden stubear según necesidad

// Stub de Web Audio API para JSDOM
class MockAudioContext {
  currentTime = 0;
  destination = {} as any;
  close = jest.fn();
  createOscillator() {
    return {
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      frequency: { value: 0 },
      type: "sine",
    } as any;
  }
  createGain() {
    return {
      connect: jest.fn(),
      gain: {
        setValueAtTime: jest.fn(),
        exponentialRampToValueAtTime: jest.fn(),
      },
    } as any;
  }
}

// @ts-ignore
window.AudioContext = MockAudioContext as any;
// @ts-ignore
window.webkitAudioContext = MockAudioContext as any;

import ColombiaMap3D from "../ColombiaMap3D";

describe("ColombiaMap3D", () => {
  test("renderiza el panel principal y el Canvas mockeado", () => {
    render(<ColombiaMap3D />);
    // Canvas placeholder
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
    // Encabezado del panel de control
    expect(screen.getByText(/Mapa de Colombia/i)).toBeInTheDocument();
    // Secciones de estadísticas
    expect(screen.getByText(/Puntuación/i)).toBeInTheDocument();
    expect(screen.getByText(/Intentos/i)).toBeInTheDocument();
    expect(screen.getByText(/Progreso/i)).toBeInTheDocument();
    // Lista de regiones y departamentos
    expect(screen.getByText(/Caribe/i)).toBeInTheDocument();
    expect(screen.getByText(/Andina/i)).toBeInTheDocument();
    expect(screen.getByText(/Pacífica/i)).toBeInTheDocument();
    expect(screen.getByText(/Cundinamarca/i)).toBeInTheDocument();
    // Botón de reinicio
    expect(screen.getByRole("button", { name: /Reiniciar Juego/i })).toBeInTheDocument();
  });
});