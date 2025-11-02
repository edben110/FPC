import { add, sub, mul, div, clamp, lerp, degToRad, radToDeg, roundTo } from "./math";

describe("utils/math", () => {
  test("suma y resta", () => {
    expect(add(2, 3)).toBe(5);
    expect(sub(10, 4)).toBe(6);
  });

  test("multiplicación y división", () => {
    expect(mul(6, 7)).toBe(42);
    expect(div(8, 2)).toBe(4);
  });

  test("división por cero lanza error", () => {
    expect(() => div(5, 0)).toThrow("Division by zero");
  });

  test("clamp limita valores dentro del rango", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(20, 0, 10)).toBe(10);
  });

  test("clamp con rango inválido lanza error", () => {
    expect(() => clamp(5, 10, 0)).toThrow("Invalid clamp range");
  });

  test("lerp interpola correctamente", () => {
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 1)).toBe(10);
  });

  test("conversiones grados/radianes", () => {
    expect(roundTo(degToRad(180), 6)).toBe(roundTo(Math.PI, 6));
    expect(roundTo(radToDeg(Math.PI), 6)).toBe(180);
  });

  test("roundTo redondea a decimales", () => {
    expect(roundTo(3.1415926, 2)).toBe(3.14);
    expect(roundTo(2.555, 2)).toBe(2.56);
  });
});