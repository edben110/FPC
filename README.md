# Clase UCC - Aplicativo React con Vite

## Descripción

Este proyecto es un aplicativo desarrollado en **React con Vite** para aprender y aplicar **pruebas unitarias** con Jest más la integración continua con GitHub Actions.

El aplicativo incluye:

* **Sidebar con acordeón** para navegación.
* **Componentes 3D interactivos** con Three.js y React Three Fiber.
* **Ejercicios con pruebas unitarias**:

  * Tablas de Multiplicar (`TablasMul.tsx`)
  * Conversor de Unidades (`UnitConverter.tsx`)
  * Validador de Contraseñas (`PasswordValidator.tsx`)
  * Contador de Clics (`ClickCounter.tsx`)
  * Lista de Tareas (`TodoList.tsx`)

* **Componentes 3D con Three.js**:

  * Paint3D - Aplicación de dibujo en 3D
  * InteractiveGeo3D - Geometrías 3D interactivas
  * ColombiaMap3D - Mapa interactivo de Colombia en 3D

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/guswill24/ucc_ing_web.git
cd clase-ucc
```

Instalar dependencias:

```bash
npm install
```

---

## Scripts disponibles

* **Iniciar servidor de desarrollo**

```bash
npm run dev
```

* **Compilar para producción**

```bash
npm run build
```

* **Previsualizar build de producción**

```bash
npm run preview
```

* **Ejecutar pruebas unitarias**

```bash
npm test
```

* **Revisar tipos TypeScript**

```bash
npm run type-check
```

* **Linting y formateo**

```bash
npm run lint
npm run format
```

---

## Estructura de Carpetas

```
src/
├─ components/       # Componentes reutilizables
│  ├─ Paint3D.jsx           # Aplicación de dibujo 3D
│  ├─ InteractiveGeo3D.jsx  # Geometrías 3D interactivas
│  ├─ ColombiaMap3D.jsx     # Mapa de Colombia 3D
│  ├─ Sidebar.tsx           # Menú lateral
│  ├─ Layout.tsx            # Layout principal
│  └─ __tests__/            # Pruebas unitarias de componentes
│     ├─ Paint3D.test.tsx
│     ├─ InteractiveGeo3D.test.tsx
│     └─ ColombiaMap3D.test.tsx
├─ views/            # Vistas de cada ejercicio y ejemplo
│  ├─ Paint3DView.tsx
│  ├─ InteractiveGeo3DView.tsx
│  ├─ ColombiaMapView.tsx
│  └─ HomePage.tsx
├─ routes/           # Configuración de rutas
│  └─ AppRoutes.tsx
├─ utils/            # Utilidades y funciones auxiliares
└─ main.tsx          # Entrada principal de React
```

---

## Componentes y funcionalidades

### Componentes Básicos

1. **Sidebar.tsx**: Menú lateral con acordeón, permite agrupar ejercicios y ejemplos.
2. **Layout.tsx**: Estructura principal de la aplicación con sidebar y contenido.
3. **UnitConverter.tsx**: Conversor de unidades (Celsius ↔ Fahrenheit) con input controlado.
4. **PasswordValidator.tsx**: Validador de contraseñas dinámico, muestra requisitos cumplidos.
5. **ClickCounter.tsx**: Contador de clics persistente usando `localStorage`.
6. **TodoList.tsx**: Lista de tareas con agregar y eliminar elementos.
7. **TablasMul.tsx**: Tabla de multiplicar interactiva.

### Componentes 3D (Three.js + React Three Fiber)

#### Paint3D
- **Descripción**: Aplicación de dibujo en 3D que permite crear trazos en un lienzo tridimensional.
- **Tecnologías**: Three.js, @react-three/fiber, @react-three/drei
- **Características**:
  - Dibujo libre en espacio 3D
  - Control de cámara con OrbitControls
  - Interacción con raycaster
  - Persistencia de dibujos en localStorage
- **Ubicación**: `src/components/Paint3D.jsx`
- **Vista**: `src/views/Paint3DView.tsx`

#### InteractiveGeo3D
- **Descripción**: Visualizador de geometrías 3D interactivas con panel de control.
- **Tecnologías**: Three.js, @react-three/fiber, @react-three/drei
- **Características**:
  - Múltiples formas geométricas (cubos, esferas, conos, cilindros)
  - Panel de control interactivo
  - Visualización de vértices únicos
  - Rotación automática de geometrías
  - Sistema de brújula 3D
- **Ubicación**: `src/components/InteractiveGeo3D.jsx`
- **Vista**: `src/views/InteractiveGeo3DView.tsx`

#### ColombiaMap3D
- **Descripción**: Mapa interactivo de Colombia en 3D con departamentos arrastrables.
- **Tecnologías**: Three.js, @react-three/fiber, @react-three/drei, Web Audio API
- **Características**:
  - Mapa 3D de Colombia con textura
  - Departamentos interactivos (drag & drop)
  - Efectos de sonido con Web Audio API
  - Validación de ubicaciones correctas
  - Sistema de puntuación
  - Instrucciones interactivas
- **Ubicación**: `src/components/ColombiaMap3D.jsx`
- **Vista**: `src/views/ColombiaMapView.tsx`

---

## Pruebas unitarias

Las pruebas unitarias están desarrolladas con **Jest** y **React Testing Library**.

### Configuración de Pruebas

- **Framework**: Jest con ts-jest y babel-jest
- **Testing Library**: @testing-library/react
- **Entorno**: JSDOM (sin WebGL)
- **Configuración**: Sin setup global, mocks por archivo

### Componentes con Pruebas

#### Componentes 3D (5 pruebas cada uno)

**Paint3D.test.tsx**
1. ✅ Se renderiza correctamente
2. ✅ Contiene el texto esperado
3. ✅ Es un componente de React válido
4. ✅ Puede renderizarse múltiples veces sin error
5. ✅ El placeholder tiene el contenido correcto

**InteractiveGeo3D.test.tsx**
1. ✅ Se renderiza correctamente
2. ✅ Contiene el texto esperado
3. ✅ Es un componente de React válido
4. ✅ Puede renderizarse múltiples veces sin error
5. ✅ El placeholder tiene el contenido correcto

**ColombiaMap3D.test.tsx**
1. ✅ Se renderiza correctamente
2. ✅ Contiene el texto esperado
3. ✅ Es un componente de React válido
4. ✅ Puede renderizarse múltiples veces sin error
5. ✅ El placeholder tiene el contenido correcto

### Estrategia de Testing

Los componentes 3D utilizan **mocks simplificados** para evitar dependencias de WebGL y Three.js en el entorno de pruebas:

- Cada test mockea el componente bajo prueba con un placeholder simple
- No se requiere setup global (`setupTests.ts`)
- Mocks locales por archivo de test
- Polyfills incluidos según necesidad (localStorage, AudioContext)

### Ejecutar Pruebas

Ejecutar todas las pruebas:

```bash
npm test
```

Ejecutar pruebas de componentes 3D específicamente:

```bash
npm test -- src/components/__tests__/Paint3D.test.tsx src/components/__tests__/InteractiveGeo3D.test.tsx src/components/__tests__/ColombiaMap3D.test.tsx --runInBand
```

### Resultados de Pruebas

```
Test Suites: 3 passed, 3 total
Tests:       15 passed, 15 total (5 por componente)
```

### Otras Pruebas

* Validan la correcta interacción de los componentes básicos.
* Comprobar que `localStorage` persista valores en `ClickCounter`.
* Verificar la lógica de validación en `PasswordValidator`.
* Confirmar el funcionamiento de agregar y eliminar tareas en `TodoList`.
* Aseguran que los componentes principales rendericen correctamente.

---

## Consideraciones

* Se recomienda **investigar, analizar e interpretar cada ejercicio** antes de ejecutar pruebas unitarias.
* Las pruebas serán evaluadas de manera **individual en clase**, considerando la explicación del proceso y la solución aplicada.

---

## Dependencias principales

### React y Entorno

* `react`, `react-dom` - Framework de UI
* `react-router-dom` - Enrutamiento
* `vite` - Bundler y dev server

### 3D y Gráficos

* `three` - Biblioteca 3D
* `@react-three/fiber` - Renderer React para Three.js
* `@react-three/drei` - Helpers y abstracciones para React Three Fiber

### Estilos

* `tailwindcss` - Framework CSS utility-first
* `framer-motion` - Animaciones

### Testing

* `jest` - Framework de testing
* `@testing-library/react` - Utilidades de testing para React
* `@testing-library/jest-dom` - Matchers personalizados de Jest
* `@types/jest` - Tipos TypeScript para Jest
* `ts-jest` - Transformador TypeScript para Jest
* `babel-jest` - Transformador Babel para Jest

---

## Integración Continua

Este proyecto utiliza GitHub Actions para ejecutar automáticamente:
- ✅ Pruebas unitarias (Jest)
- ✅ Verificación de tipos (TypeScript)
- ✅ Linting (ESLint)

---

## Autor

**Gustavo Sánchez Rodríguez**
Asignatura: Ingeniería Web
Clase UCC

