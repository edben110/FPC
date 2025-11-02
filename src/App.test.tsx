import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza el título principal de HomePage", () => {
  render(<App />);
  expect(screen.getByText(/Componentes Educativos 3D/i)).toBeInTheDocument();
});