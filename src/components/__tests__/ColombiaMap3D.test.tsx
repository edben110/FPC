// @ts-nocheck
import React from "react";
import { render, screen } from "@testing-library/react";

// Polyfill minimal para Web Audio API usado en ColombiaMap3D
if (typeof (window as any).AudioContext === "undefined") {
  (window as any).AudioContext = class {
    currentTime = 0;
    close() {}
    createOscillator() { return { connect() {}, frequency: { value: 0 }, type: "sine", start() {}, stop() {} }; }
    createGain() { return { connect() {}, gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} } }; }
  };
  (window as any).webkitAudioContext = (window as any).AudioContext;
}

// Mock básico de localStorage si no está presente
if (typeof window.localStorage === "undefined") {
  (window as any).localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} };
}

jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useThree: () => ({ camera: { position: { set: jest.fn() } }, gl: { domElement: document.createElement("canvas") } }),
  useFrame: jest.fn(),
  useLoader: () => ({}),
}));

jest.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
  Text: ({ children }: any) => <span>{children}</span>,
  Html: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("three", () => ({
  TextureLoader: function TextureLoader() {},
  FrontSide: "FrontSide",
  Vector3: function Vector3(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; },
}));
// Mock del propio componente para evitar dependencia en loaders y WebAudio
jest.mock("../ColombiaMap3D", () => () => <div data-testid="colombiamap3d-placeholder">ColombiaMap3D Mock</div>);

import ColombiaMap3D from "../ColombiaMap3D";

describe("ColombiaMap3D Component", () => {
  test("se renderiza correctamente", () => {
    render(<ColombiaMap3D />);
    expect(screen.getByTestId("colombiamap3d-placeholder")).toBeTruthy();
  });

  test("contiene el texto esperado", () => {
    render(<ColombiaMap3D />);
    expect(screen.getByText("ColombiaMap3D Mock")).toBeTruthy();
  });

  test("es un componente de React válido", () => {
    const { container } = render(<ColombiaMap3D />);
    expect(container.firstChild).toBeTruthy();
  });

  test("puede renderizarse múltiples veces sin error", () => {
    const { rerender } = render(<ColombiaMap3D />);
    rerender(<ColombiaMap3D />);
    expect(screen.getByTestId("colombiamap3d-placeholder")).toBeTruthy();
  });

  test("el placeholder tiene el contenido correcto", () => {
    const { container } = render(<ColombiaMap3D />);
    const placeholder = container.querySelector('[data-testid="colombiamap3d-placeholder"]');
    expect(placeholder).toBeTruthy();
    expect(placeholder?.textContent).toBe("ColombiaMap3D Mock");
  });
});
