import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges, Html } from "@react-three/drei";
import * as THREE from "three";

function useGeometryFor(shape) {
  return useMemo(() => {
    switch (shape) {
      case "cubo":
        return new THREE.BoxGeometry(1, 1, 1);
      case "esfera":
        return new THREE.SphereGeometry(0.75, 32, 32);
      case "piramide":
        // pirámide cuadrada: cone con 4 lados
        return new THREE.ConeGeometry(0.9, 1.4, 4);
      case "prisma":
        // prisma triangular: cilindro con 3 lados
        return new THREE.CylinderGeometry(0.8, 0.8, 1.2, 3);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [shape]);
}

function ShapeMesh({
  shape,
  color,
  scale,
  showEdges,
  showVertices,
  showFaces,
  rotation,
}) {
  const geom = useGeometryFor(shape);
  const meshRef = useRef();
  const edgesRef = useRef();
  
  // compute vertices positions once per geometry
  const vertices = useMemo(() => {
    const pos = geom.attributes.position.array;
    const verts = [];
    for (let i = 0; i < pos.length; i += 3) {
      verts.push(new THREE.Vector3(pos[i], pos[i + 1], pos[i + 2]));
    }
    // unique vertices (approx)
    const unique = [];
    const seen = {};
    verts.forEach((v) => {
      const key = v.x.toFixed(4) + "|" + v.y.toFixed(4) + "|" + v.z.toFixed(4);
      if (!seen[key]) {
        seen[key] = true;
        unique.push(v.clone());
      }
    });
    return unique;
  }, [geom]);

  const facesCount = useMemo(() => {
    if (geom.index) return geom.index.count / 3;
    return geom.attributes.position.count / 3;
  }, [geom]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation.x;
      meshRef.current.rotation.y = rotation.y;
      meshRef.current.rotation.z = rotation.z;
      meshRef.current.scale.setScalar(scale);
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = rotation.x;
      edgesRef.current.rotation.y = rotation.y;
      edgesRef.current.rotation.z = rotation.z;
      edgesRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geom}>
        <meshStandardMaterial
          color={color}
          transparent={!showFaces}
          opacity={showFaces ? 1 : 0.12}
          metalness={0.1}
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {showEdges && (
        <mesh ref={edgesRef} geometry={geom}>
          <Edges threshold={15} color="#000000" />
        </mesh>
      )}

      {showVertices && (
        <group
          rotation={[rotation.x, rotation.y, rotation.z]}
          scale={[scale, scale, scale]}
        >
          {vertices.map((v, i) => (
            <mesh
              key={i}
              position={[v.x, v.y, v.z]}
            >
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color={"#222"} />
            </mesh>
          ))}
        </group>
      )}

      {/* Provide small labels with counts near the shape */}
      <Html position={[0, -1.4, 0]}>
        <div style={{ background: "rgba(255,255,255,0.9)", padding: 8, borderRadius: 6, fontSize: 12 }}>
          <div><strong>{shape}</strong></div>
          <div>Caras: {facesCount}</div>
          <div>Vértices: {vertices.length}</div>
          <div>Aristas (aprox.): {Math.round((vertices.length + facesCount) * 1.2)}</div>
        </div>
      </Html>
    </group>
  );
}

export default function InteractiveGeo3D() {
  const [shape, setShape] = useState("cubo");
  const [color, setColor] = useState("#1e90ff");
  const [scale, setScale] = useState(1);
  const [showEdges, setShowEdges] = useState(true);
  const [showVertices, setShowVertices] = useState(false);
  const [showFaces, setShowFaces] = useState(true);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0.6, z: 0 });

  // keyboard interaction
  useEffect(() => {
    function onKey(e) {
      const step = 0.1;
      const rotStep = 0.08;
      switch (e.key) {
        case "ArrowLeft":
          setRotation((r) => ({ ...r, y: r.y - rotStep }));
          break;
        case "ArrowRight":
          setRotation((r) => ({ ...r, y: r.y + rotStep }));
          break;
        case "ArrowUp":
          setRotation((r) => ({ ...r, x: r.x - rotStep }));
          break;
        case "ArrowDown":
          setRotation((r) => ({ ...r, x: r.x + rotStep }));
          break;
        case "+":
        case "=":
          setScale((s) => Math.min(2.5, s + step));
          break;
        case "-":
          setScale((s) => Math.max(0.2, s - step));
          break;
        case "v":
          setShowVertices((s) => !s);
          break;
        case "e":
          setShowEdges((s) => !s);
          break;
        case "f":
          setShowFaces((s) => !s);
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // gentle auto-rotation when user not interacting (visual aid for younger users)
  useEffect(() => {
    const id = setInterval(() => {
      setRotation((r) => ({ ...r, y: r.y + 0.002 }));
    }, 16);
    return () => clearInterval(id);
  }, []);

  const containerStyle = {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    flexWrap: "wrap",
  };

  const panelStyle = {
    width: 320,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: 16,
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
    fontFamily: "'Comic Sans MS', 'Arial Rounded MT Bold', Arial, sans-serif",
    fontSize: 14,
    color: "#fff",
  };

  const canvasStyle = {
    width: "640px",
    height: "480px",
    borderRadius: 16,
    background: "linear-gradient(180deg, #a8edea 0%, #fed6e3 100%)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    border: "4px solid #fff",
  };

  const buttonStyle = (baseColor) => ({
    flex: 1,
    padding: "10px 16px",
    border: "none",
    borderRadius: "12px",
    background: baseColor,
    color: "#fff",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.2s ease",
    fontFamily: "'Comic Sans MS', Arial, sans-serif",
  });

  const shapeButtonStyle = (isActive) => ({
    padding: "12px",
    border: "none",
    borderRadius: "16px",
    background: isActive 
      ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: isActive ? "0 6px 12px rgba(245, 87, 108, 0.4)" : "0 4px 8px rgba(79, 172, 254, 0.3)",
    transition: "all 0.2s ease",
    fontFamily: "'Comic Sans MS', Arial, sans-serif",
    width: "100%",
    marginBottom: "8px",
  });

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    fontSize: "15px",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
  };

  return (
    <div style={containerStyle}>
      <div style={canvasStyle}>
        <Canvas 
          camera={{ position: [2.5, 2, 3], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.9} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} />
          <ShapeMesh
            shape={shape}
            color={color}
            scale={scale}
            showEdges={showEdges}
            showVertices={showVertices}
            showFaces={showFaces}
            rotation={rotation}
          />
          <OrbitControls enablePan={false} />
          <gridHelper args={[10, 10, "#bbb", "#eee"]} position={[0, -1.5, 0]} />
          <axesHelper args={[2]} />
        </Canvas>
      </div>

      <div style={panelStyle}>
        <h3 style={{ marginTop: 0, fontSize: "20px", textAlign: "center", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
          ✨ Panel de Control ✨
        </h3>

        <label style={labelStyle}>🔷 Elige tu Figura</label>
        <button style={shapeButtonStyle(shape === "cubo")} onClick={() => setShape("cubo")}>
          📦 Cubo
        </button>
        <button style={shapeButtonStyle(shape === "esfera")} onClick={() => setShape("esfera")}>
          ⚽ Esfera
        </button>
        <button style={shapeButtonStyle(shape === "piramide")} onClick={() => setShape("piramide")}>
          🔺 Pirámide
        </button>
        <button style={shapeButtonStyle(shape === "prisma")} onClick={() => setShape("prisma")}>
          🔷 Prisma
        </button>

        <label style={{...labelStyle, marginTop: "16px"}}>🎨 Color Mágico</label>
        <input
          aria-label="color"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: "100%", height: 50, marginBottom: 12, borderRadius: 12, border: "3px solid #fff", cursor: "pointer" }}
        />

        <label style={labelStyle}>📏 Tamaño: {scale.toFixed(2)}</label>
        <input
          type="range"
          min="0.2"
          max="2.5"
          step="0.01"
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          style={{ width: "100%", marginBottom: 12, height: 8, cursor: "pointer" }}
        />

        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <button 
            onClick={() => { setShowEdges(s => !s); }} 
            style={buttonStyle(showEdges ? "#ff6b6b" : "#4ecdc4")}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            {showEdges ? "🔲 Ocultar Aristas" : "🔳 Mostrar Aristas"}
          </button>
          <button 
            onClick={() => { setShowVertices(s => !s); }} 
            style={buttonStyle(showVertices ? "#ff6b6b" : "#f7b731")}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            {showVertices ? "⚫ Ocultar Puntos" : "🔴 Mostrar Puntos"}
          </button>
          <button 
            onClick={() => { setShowFaces(s => !s); }} 
            style={buttonStyle(showFaces ? "#ff6b6b" : "#a29bfe")}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            {showFaces ? "📐 Ocultar Caras" : "📊 Mostrar Caras"}
          </button>
        </div>
      </div>
    </div>
  );
}