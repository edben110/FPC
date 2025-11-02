# 🇨🇴 Mapa Interactivo de Colombia 3D

## Descripción
Componente educativo interactivo que permite a los estudiantes aprender la geografía de Colombia ubicando los **32 departamentos** en un mapa 3D detallado con brújula de orientación.

## Características Implementadas ✅

### Según HU EDU-RF-CSOC-001:

1. **✅ Visualización de mapa 3D detallado de Colombia**
   - Mapa base 3D con contorno realista de Colombia
   - 32 departamentos completos renderizados
   - 5 regiones geográficas con colores diferenciados
   - Cuadrícula de referencia
   - **Brújula 3D que siempre apunta al Norte**

2. **✅ Funcionalidad de arrastrar y soltar departamentos**
   - Selección de departamentos con clic
   - Colocación en zonas objetivo del mapa
   - Interfaz intuitiva tipo "seleccionar y colocar"
   - Organización por columnas para 32 departamentos

3. **✅ Retroalimentación visual**
   - Color verde cuando el departamento está correctamente ubicado
   - Zonas objetivo que cambian de color al pasar el mouse
   - Animaciones suaves y efectos visuales
   - Regiones geográficas con colores de fondo

4. **✅ Retroalimentación sonora**
   - Sonido de éxito cuando se coloca correctamente
   - Sonido de error cuando se coloca incorrectamente
   - Web Audio API para efectos de sonido

5. **✅ Validación de ubicación correcta**
   - Verificación automática al soltar el departamento
   - Sistema de puntuación
   - Contador de intentos
   - Barra de progreso

## Características Adicionales 🎁

### Interfaz Amigable para Menores:
- 🎨 Colores brillantes y atractivos
- 🎯 Instrucciones claras y concisas
- 📊 Panel de estadísticas visual
- 🏆 Sistema de puntuación motivador
- 🎊 Celebración al completar el mapa
- 📝 Lista de departamentos organizada por región
- 🧭 **Brújula 3D interactiva que siempre apunta al Norte**

### Funcionalidades Extra:
- Rotación 3D del mapa con mouse
- Zoom interactivo
- Botón de reiniciar juego
- Mensajes contextuales
- Progreso visual en tiempo real
- Lista de departamentos con estado
- Organización por regiones geográficas
- **Brújula con puntos cardinales (N, S, E, O)**

## Los 32 Departamentos de Colombia 🗺️

### Región Caribe (7 departamentos):
1. La Guajira
2. Magdalena
3. Atlántico
4. Bolívar
5. Sucre
6. Córdoba
7. Cesar

### Región Andina (10 departamentos):
8. Norte de Santander
9. Santander
10. Boyacá
11. Cundinamarca
12. Antioquia
13. Caldas
14. Risaralda
15. Quindío
16. Tolima
17. Huila

### Región Pacífica (4 departamentos):
18. Chocó
19. Valle del Cauca
20. Cauca
21. Nariño

### Región Orinoquía (4 departamentos):
22. Arauca
23. Casanare
24. Vichada
25. Meta

### Región Amazonía (6 departamentos):
26. Guainía
27. Guaviare
28. Vaupés
29. Caquetá
30. Putumayo
31. Amazonas

### Distrito Capital:
32. Bogotá D.C.

## Nueva Característica: Brújula 3D 🧭

La brújula siempre apunta al Norte geográfico del mapa:
- **Aguja Roja** - Norte (N)
- **Aguja Blanca** - Sur (S)
- **Letras E y O** - Este y Oeste
- **Orientación fija** al norte sin importar la rotación de la cámara

## Tecnologías Utilizadas 💻

- **React** - Framework principal
- **Three.js** - Renderizado 3D
- **@react-three/fiber** - React renderer para Three.js
- **@react-three/drei** - Helpers y componentes 3D
- **Web Audio API** - Efectos de sonido

## Cómo Usar 🎮

1. Abre el menú lateral y selecciona "Mapa de Colombia"
2. Haz clic en un departamento de la lista de la derecha
3. Haz clic en la ubicación correcta en el mapa
4. ¡Gana puntos por cada respuesta correcta!
5. Completa todos los departamentos para ganar

## Ruta de Acceso 🔗

```
http://localhost:5173/colombia-map
```

## Archivos del Componente 📁

- `src/components/ColombiaMap3D.jsx` - Componente principal
- `src/components/ColombiaMap3D.d.ts` - Declaración de tipos
- `src/views/ColombiaMapView.tsx` - Vista wrapper
- `src/routes/AppRoutes.tsx` - Configuración de rutas

## Sistema de Puntuación 🎯

- **10 puntos** por cada departamento colocado correctamente
- **Progreso** mostrado en porcentaje
- **Intentos** contabilizados
- **Celebración** al completar el 100%

## Mejoras Futuras (Opcional) 🚀

- [ ] Agregar más departamentos
- [ ] Niveles de dificultad
- [ ] Modo temporizador
- [ ] Datos curiosos de cada departamento
- [ ] Multijugador competitivo
- [ ] Guardado de récords
