import React, { useState, useRef, useEffect } from "react";
import { Canvas, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Line } from "@react-three/drei";

// Extender THREE para usar Line2
extend({ Line_: THREE.Line });

// Componente para dibujar líneas 3D
function DrawingLines({ strokes }) {
  return (
    <>
      {strokes.map((stroke, index) => {
        if (stroke.points.length < 2) return null;
        
        return (
          <Line
            key={index}
            points={stroke.points}
            color={stroke.color}
            lineWidth={stroke.width}
            segments
          />
        );
      })}
    </>
  );
}

// Cursor 3D que sigue al mouse
function Cursor3D({ position, color, size, isDrawing }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size / 15, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isDrawing ? 0.8 : 0.3}
        transparent
        opacity={0.8}
      />
      {/* Anillo alrededor cuando está dibujando */}
      {isDrawing && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[size / 10, size / 50, 16, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </mesh>
  );
}

// Escena 3D principal
function PaintScene({ strokes, currentStroke, onPointerDown, onPointerMove, onPointerUp, brushColor, brushSize, cursorPosition, isDrawing, cameraLocked }) {
  const { camera, gl } = useThree();
  const [pointer] = useState(() => new THREE.Vector2());
  const [raycaster] = useState(() => new THREE.Raycaster());
  // Plano de dibujo fijo en Y=0
  const [drawingPlane] = useState(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));

  useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      
      // Intersectar con el plano Y=0
      const point = new THREE.Vector3();
      raycaster.ray.intersectPlane(drawingPlane, point);
      
      if (point) {
        onPointerDown(point);
      }
    };

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      
      // Intersectar con el plano Y=0
      const point = new THREE.Vector3();
      raycaster.ray.intersectPlane(drawingPlane, point);
      
      if (point) {
        onPointerMove(point);
      }
    };

    const handlePointerUp = () => {
      onPointerUp();
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [camera, gl, onPointerDown, onPointerMove, onPointerUp, raycaster, pointer, drawingPlane]);

  return (
    <>
      <color attach="background" args={["#1a1a2e"]} />
      
      {/* Iluminación */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#ffffff" />
      <hemisphereLight args={["#ffffff", "#444444", 0.5]} />

      {/* Plano de dibujo visible - lienzo blanco */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial 
          color="#ffffff" 
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Borde del lienzo */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(15, 15)]} />
        <lineBasicMaterial attach="material" color="#3498db" linewidth={2} />
      </lineSegments>

      {/* Grid de referencia con colores amigables */}
      <gridHelper args={[20, 20, "#4a90e2", "#2c5aa0"]} position={[0, -0.01, 0]} />
      
      {/* Ejes de coordenadas con colores brillantes */}
      <axesHelper args={[5]} />

      {/* Todas las líneas dibujadas */}
      <DrawingLines strokes={strokes} />

      {/* Línea actual mientras se dibuja */}
      {currentStroke && currentStroke.points.length > 0 && (
        <Line
          points={currentStroke.points}
          color={currentStroke.color}
          lineWidth={currentStroke.width}
          segments
        />
      )}

      {/* Cursor 3D */}
      <Cursor3D 
        position={cursorPosition} 
        color={brushColor} 
        size={brushSize}
        isDrawing={isDrawing}
      />

      <OrbitControls
        enabled={!cameraLocked}
        enablePan={!cameraLocked}
        enableZoom={!cameraLocked}
        enableRotate={!cameraLocked}
        minDistance={3}
        maxDistance={30}
      />
    </>
  );
}

// Componente principal
export default function Paint3D() {
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#ff6b6b");
  const [brushSize, setBrushSize] = useState(3);
  const [cursorPosition, setCursorPosition] = useState([0, 0, 0]);
  const [showGallery, setShowGallery] = useState(false);
  const [savedWorks, setSavedWorks] = useState([]);
  const [workName, setWorkName] = useState("");
  const [cameraLocked, setCameraLocked] = useState(false);

  // Cargar obras guardadas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("paint3d_works");
    if (saved) {
      setSavedWorks(JSON.parse(saved));
    }
  }, []);

  const handlePointerDown = (point) => {
    setIsDrawing(true);
    setCurrentStroke({
      points: [[point.x, point.y, point.z]],
      color: brushColor,
      width: brushSize,
    });
  };

  const handlePointerMove = (point) => {
    setCursorPosition([point.x, point.y, point.z]);
    
    if (isDrawing && currentStroke) {
      const lastPoint = currentStroke.points[currentStroke.points.length - 1];
      const distance = Math.sqrt(
        Math.pow(point.x - lastPoint[0], 2) +
        Math.pow(point.y - lastPoint[1], 2) +
        Math.pow(point.z - lastPoint[2], 2)
      );

      // Solo agregar punto si hay suficiente distancia (suavizar trazo)
      if (distance > 0.1) {
        setCurrentStroke({
          ...currentStroke,
          points: [...currentStroke.points, [point.x, point.y, point.z]],
        });
      }
    }
  };

  const handlePointerUp = () => {
    if (isDrawing && currentStroke && currentStroke.points.length > 1) {
      setStrokes([...strokes, currentStroke]);
      setCurrentStroke(null);
    }
    setIsDrawing(false);
  };

  const handleClear = () => {
    if (window.confirm("¿Quieres borrar todo tu dibujo? 🎨")) {
      setStrokes([]);
      setCurrentStroke(null);
    }
  };

  const handleUndo = () => {
    if (strokes.length > 0) {
      setStrokes(strokes.slice(0, -1));
    }
  };

  const handleSave = () => {
    if (strokes.length === 0) {
      alert("¡Primero dibuja algo para guardar! 🎨");
      return;
    }

    const name = workName.trim() || `Obra ${savedWorks.length + 1}`;
    const newWork = {
      id: Date.now(),
      name,
      strokes,
      date: new Date().toLocaleDateString(),
      thumbnail: brushColor, // Usar color principal como thumbnail
    };

    const updatedWorks = [...savedWorks, newWork];
    setSavedWorks(updatedWorks);
    localStorage.setItem("paint3d_works", JSON.stringify(updatedWorks));
    
    alert(`¡Obra "${name}" guardada! 🎉`);
    setWorkName("");
  };

  const handleLoadWork = (work) => {
    setStrokes(work.strokes);
    setShowGallery(false);
    alert(`Obra "${work.name}" cargada 🎨`);
  };

  const handleDeleteWork = (id) => {
    if (window.confirm("¿Quieres borrar esta obra?")) {
      const updatedWorks = savedWorks.filter(w => w.id !== id);
      setSavedWorks(updatedWorks);
      localStorage.setItem("paint3d_works", JSON.stringify(updatedWorks));
    }
  };

  const colorPalette = [
    { name: "Rojo", color: "#ff6b6b", emoji: "❤️" },
    { name: "Naranja", color: "#ffa500", emoji: "🧡" },
    { name: "Amarillo", color: "#ffd700", emoji: "💛" },
    { name: "Verde", color: "#4ecdc4", emoji: "💚" },
    { name: "Azul", color: "#3498db", emoji: "💙" },
    { name: "Morado", color: "#9b59b6", emoji: "💜" },
    { name: "Rosa", color: "#ff69b4", emoji: "🩷" },
    { name: "Negro", color: "#2c3e50", emoji: "🖤" },
    { name: "Blanco", color: "#ecf0f1", emoji: "🤍" },
    { name: "Café", color: "#a0522d", emoji: "🤎" },
  ];

  return (
    <div style={{ display: "flex", gap: 16, padding: 20, alignItems: "flex-start" }}>
      {/* Columna izquierda: Canvas + Instrucciones */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Canvas 3D */}
        <div
          style={{
            width: "640px",
            height: "480px",
            borderRadius: 16,
            background: "linear-gradient(180deg, #a8edea 0%, #fed6e3 100%)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            border: "4px solid #fff",
            position: "relative",
          }}
        >
          <Canvas camera={{ position: [8, 8, 8], fov: 60 }}>
            <PaintScene
              strokes={strokes}
              currentStroke={currentStroke}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              brushColor={brushColor}
              brushSize={brushSize}
                cursorPosition={cursorPosition}
                isDrawing={isDrawing}
                cameraLocked={cameraLocked}
              />
            </Canvas>

            {/* Indicador de dibujo */}
            {isDrawing && (
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(255,255,255,0.95)",
                  padding: "12px 24px",
                  borderRadius: 20,
                  fontWeight: "bold",
                  fontSize: 18,
                  color: brushColor,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  animation: "pulse 1s infinite",
                }}
              >
                ✏️ ¡Dibujando!
              </div>
            )}
          </div>

          {/* Instrucciones */}
          <div
            style={{
              width: "640px",
              background: "#fff",
              padding: 16,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ margin: "0 0 12px 0", color: "#333", fontSize: 16 }}>
              📖 ¿Cómo dibujar en el lienzo 3D?
            </h4>
            <ul style={{ margin: 0, paddingLeft: 24, fontSize: 14, color: "#666" }}>
              <li>🎨 <strong>Haz clic y arrastra</strong> sobre el lienzo blanco para dibujar</li>
              <li>🖼️ <strong>Todos los trazos</strong> se dibujan en el plano blanco (sin profundidad)</li>
              <li>🔒 <strong>Bloquea la cámara</strong> para que no se mueva mientras dibujas</li>
              <li>🔄 <strong>Click derecho y mueve</strong> para rotar y ver tu obra desde diferentes ángulos</li>
              <li>🔍 <strong>Rueda del mouse</strong> para acercarte o alejarte</li>
              <li>🌈 <strong>Cambia colores y grosor</strong> en el panel derecho</li>
              <li>💾 <strong>Guarda tu obra</strong> para verla después</li>
            </ul>
          </div>
        </div>

      {/* Panel de herramientas */}
      <div
        style={{
          width: 360,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: 20,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
        }}
      >
        <h2 style={{ margin: "0 0 20px 0", color: "#fff", fontSize: 24, textAlign: "center", fontWeight: "bold" }}>
          🎨 Pintura 3D
        </h2>

        {/* Selector de colores */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 12px 0", color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            🌈 Elige tu color
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
            {colorPalette.map((c) => (
              <button
                key={c.color}
                onClick={() => setBrushColor(c.color)}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: c.color,
                  border: brushColor === c.color ? "4px solid #fff" : "2px solid rgba(255,255,255,0.5)",
                  borderRadius: 12,
                  cursor: "pointer",
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                  transition: "all 0.2s",
                  boxShadow: brushColor === c.color ? "0 4px 12px rgba(0,0,0,0.3)" : "0 2px 6px rgba(0,0,0,0.1)",
                  transform: brushColor === c.color ? "scale(1.1)" : "scale(1)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = brushColor === c.color ? "scale(1.1)" : "scale(1)")}
                title={c.name}
              >
                {c.emoji}
              </button>
            ))}
          </div>
          <div
            style={{
              marginTop: 12,
              padding: 12,
              background: brushColor,
              borderRadius: 12,
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              border: "2px solid rgba(255,255,255,0.5)",
            }}
          >
            Color seleccionado
          </div>
        </div>

        {/* Grosor del pincel */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 12px 0", color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            📏 Grosor del pincel
          </h3>
          <input
            type="range"
            min="1"
            max="10"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{ width: "100%", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Fino</span>
            <span style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
              {brushSize}
            </span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Grueso</span>
          </div>
          {/* Vista previa */}
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <div
              style={{
                display: "inline-block",
                width: brushSize * 4,
                height: brushSize * 4,
                borderRadius: "50%",
                background: brushColor,
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                border: "2px solid rgba(255,255,255,0.5)",
              }}
            />
          </div>
        </div>

        {/* Estadísticas */}
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            padding: 12,
            borderRadius: 12,
            marginBottom: 24,
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          <div style={{ fontSize: 14, color: "#fff", marginBottom: 4, fontWeight: "bold" }}>
            <strong>Trazos:</strong> {strokes.length}
          </div>
          <div style={{ fontSize: 14, color: "#fff", fontWeight: "bold" }}>
            <strong>Obras guardadas:</strong> {savedWorks.length}
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Botón de bloquear cámara */}
          <button
            onClick={() => setCameraLocked(!cameraLocked)}
            style={{
              padding: 12,
              background: cameraLocked 
                ? "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)" 
                : "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            {cameraLocked ? "🔒 Cámara bloqueada" : "🔓 Cámara libre"}
          </button>

          <button
            onClick={handleUndo}
            disabled={strokes.length === 0}
            style={{
              padding: 12,
              background: strokes.length > 0 
                ? "linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)" 
                : "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: "bold",
              cursor: strokes.length > 0 ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              boxShadow: strokes.length > 0 ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
            }}
            onMouseOver={(e) => strokes.length > 0 && (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => strokes.length > 0 && (e.target.style.transform = "scale(1)")}
          >
            ↩️ Deshacer último trazo
          </button>

          <button
            onClick={handleClear}
            disabled={strokes.length === 0}
            style={{
              padding: 12,
              background: strokes.length > 0 
                ? "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)" 
                : "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: "bold",
              cursor: strokes.length > 0 ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              boxShadow: strokes.length > 0 ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
            }}
            onMouseOver={(e) => strokes.length > 0 && (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => strokes.length > 0 && (e.target.style.transform = "scale(1)")}
          >
            🗑️ Borrar todo
          </button>

          {/* Guardar obra */}
          <div style={{ marginTop: 8 }}>
            <input
              type="text"
              placeholder="Nombre de tu obra 🎨"
              value={workName}
              onChange={(e) => setWorkName(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                border: "2px solid rgba(255,255,255,0.5)",
                borderRadius: 12,
                fontSize: 14,
                marginBottom: 8,
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.9)",
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
              }}
            />
            <button
              onClick={handleSave}
              disabled={strokes.length === 0}
              style={{
                width: "100%",
                padding: 12,
                background: strokes.length > 0 
                  ? "linear-gradient(135deg, #27ae60 0%, #229954 100%)" 
                  : "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.5)",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: "bold",
                cursor: strokes.length > 0 ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                boxShadow: strokes.length > 0 ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
              }}
              onMouseOver={(e) => strokes.length > 0 && (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => strokes.length > 0 && (e.target.style.transform = "scale(1)")}
            >
              💾 Guardar obra
            </button>
          </div>

          <button
            onClick={() => setShowGallery(!showGallery)}
            style={{
              padding: 12,
              background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            🖼️ {showGallery ? "Cerrar galería" : "Ver galería"}
          </button>
        </div>

        {/* Galería */}
        {showGallery && (
          <div
            style={{
              marginTop: 20,
              padding: 16,
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              borderRadius: 12,
              border: "2px solid rgba(255,255,255,0.3)",
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            <h3 style={{ margin: "0 0 12px 0", color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              🖼️ Mis obras guardadas
            </h3>
            {savedWorks.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textAlign: "center" }}>
                Aún no has guardado ninguna obra 🎨
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {savedWorks.map((work) => (
                  <div
                    key={work.id}
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      padding: 12,
                      borderRadius: 12,
                      border: "2px solid rgba(255,255,255,0.5)",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: work.thumbnail,
                        flexShrink: 0,
                        border: "2px solid rgba(0,0,0,0.1)",
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "#333",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {work.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        {work.date} • {work.strokes.length} trazos
                      </div>
                    </div>
                    <button
                      onClick={() => handleLoadWork(work)}
                      style={{
                        padding: "6px 12px",
                        background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        fontSize: 12,
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    >
                      Cargar
                    </button>
                    <button
                      onClick={() => handleDeleteWork(work.id)}
                      style={{
                        padding: "6px 12px",
                        background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        fontSize: 12,
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.05); }
          }
        `}
      </style>
    </div>
  );
}
