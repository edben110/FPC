import React, { useState, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

// Definición de 16 departamentos principales de Colombia
// Coordenadas normalizadas (x, z) basadas en geografía real de Colombia
const DEPARTMENTS = [
  // Costa Caribe (4)
  { id: 1, name: "La Guajira", position: [-0.1, 0, 1.65], color: "#FF6B6B", region: "Caribe" },
  { id: 2, name: "Magdalena", position: [0.2, 0, 1.4], color: "#FFA07A", region: "Caribe" },
  { id: 3, name: "Atlántico", position: [0.5, 0, 1.3], color: "#FF8C42", region: "Caribe" },
  { id: 4, name: "Bolívar", position: [0.35, 0, 1], color: "#FFB6C1", region: "Caribe" },
  
  // Región Andina (6)
  { id: 5, name: "Santander", position: [0.15, 0, 0.6], color: "#4ECDC4", region: "Andina" },
  { id: 6, name: "Boyacá", position: [-0.2, 0, 0.4], color: "#45B7D1", region: "Andina" },
  { id: 7, name: "Cundinamarca", position: [0, 0, 0.2], color: "#5DADE2", region: "Andina" },
  { id: 8, name: "Antioquia", position: [0.6, 0, 0.8], color: "#3498DB", region: "Andina" },
  { id: 9, name: "Tolima", position: [0.3, 0, -0.1], color: "#6C5CE7", region: "Andina" },
  { id: 10, name: "Huila", position: [0.5, 0, -0.3], color: "#A29BFE", region: "Andina" },
  
  // Región Pacífica (3)
  { id: 11, name: "Chocó", position: [0.8, 0, 0.5], color: "#2ECC71", region: "Pacífica" },
  { id: 12, name: "Valle del Cauca", position: [0.7, 0, 0], color: "#27AE60", region: "Pacífica" },
  { id: 13, name: "Nariño", position: [0.9, 0, -0.5], color: "#58D68D", region: "Pacífica" },
  
  // Región Orinoquía (2)
  { id: 14, name: "Meta", position: [-0.3, 0, -0.2], color: "#F8B500", region: "Orinoquía" },
  { id: 15, name: "Casanare", position: [-0.4, 0, 0.4], color: "#F7B731", region: "Orinoquía" },
  
  // Distrito Capital (1)
  { id: 16, name: "Bogotá D.C.", position: [0, 0, 0], color: "#9B59B6", region: "Capital" },
];

// Zona de destino para cada departamento
function TargetZone({ department, isOccupied, onDrop }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  return (
    <group position={department.position}>
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onDrop(department.id)}
      >
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial
          color={isOccupied ? "#4ade80" : hovered ? "#fbbf24" : "#94a3b8"}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {isOccupied && (
        <Text
          position={[0, 0.05, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          ✓
        </Text>
      )}
    </group>
  );
}

// Departamento arrastrable
function DraggableDepartment({ department, isPlaced, onSelect, isSelected, index, totalDepartments }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  }, [hovered]);

  if (isPlaced) return null;

  // Distribuir departamentos en columnas a la derecha
  const col = Math.floor(index / 8);
  const row = index % 8;
  const x = 2.2 + col * 0.6;
  const z = -1.4 + row * 0.4;

  return (
    <mesh
      ref={meshRef}
      position={[x, 0.2, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect(department)}
    >
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial
        color={isSelected ? "#fbbf24" : department.color}
        emissive={isSelected ? "#f59e0b" : "#000000"}
        emissiveIntensity={isSelected ? 0.3 : 0}
      />
      <Html position={[0, 0.25, 0]} center>
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            padding: "3px 6px",
            borderRadius: 4,
            fontSize: 9,
            fontWeight: "bold",
            color: "#1f2937",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            maxWidth: 80,
            textAlign: "center",
            lineHeight: "1.2",
          }}
        >
          {department.name}
        </div>
      </Html>
    </mesh>
  );
}

// Mapa base simplificado
function ColombiaMapBase() {
  // Cargar la textura del mapa de Colombia
  const mapTexture = useLoader(TextureLoader, '/Colombia.jpg');

  return (
    <group>
      {/* Mapa de Colombia como imagen de fondo */}
      <mesh position={[-0.1, -0.19, 0]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <planeGeometry args={[4.5, 4.5]} />
        <meshStandardMaterial 
          map={mapTexture}
          transparent={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Grid de referencia */}
      <gridHelper
        args={[6, 30, "#60a5fa", "#bfdbfe"]}
        position={[0, -0.2, 0]}
      />
    </group>
  );
}

// Brújula simplificada
function Compass() {
  return (
    <group position={[-1.3, 0.2, 1.5]}>
      {/* Base */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>

      {/* Aguja Norte (roja) */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.04, 0.15, 8]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>

      {/* Texto N */}
      <Text
        position={[0, 0.1, 0.2]}
        fontSize={0.08}
        color="#e74c3c"
        anchorX="center"
        anchorY="middle"
      >
        N
      </Text>
    </group>
  );
}

// Componente principal del Canvas 3D
function MapScene({ departments, placedDepartments, selectedDept, onSelectDept, onPlaceDept }) {
  return (
    <>
      <color attach="background" args={["#f0f9ff"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, 5, -5]} intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.3} color="#ffd700" />
      <hemisphereLight args={["#ffffff", "#60a5fa", 0.4]} />

      <ColombiaMapBase />
      
      {/* Brújula */}
      <Compass />

      {/* Zonas objetivo */}
      {departments.map((dept) => (
        <TargetZone
          key={dept.id}
          department={dept}
          isOccupied={placedDepartments.includes(dept.id)}
          onDrop={onPlaceDept}
        />
      ))}

      {/* Departamentos arrastrables */}
      {departments.map((dept, index) => (
        <DraggableDepartment
          key={dept.id}
          department={dept}
          isPlaced={placedDepartments.includes(dept.id)}
          onSelect={onSelectDept}
          isSelected={selectedDept?.id === dept.id}
          index={index}
          totalDepartments={departments.length}
        />
      ))}

      <OrbitControls
        enablePan={true}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        maxDistance={20}
        minDistance={2}
      />
      
      {/* Ayudas visuales */}
      <axesHelper args={[2]} />
    </>
  );
}

// Componente principal
export default function ColombiaMap3D() {
  const [placedDepartments, setPlacedDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("¡Arrastra los departamentos al mapa!");
  const [showCelebration, setShowCelebration] = useState(false);
  const audioContextRef = useRef(null);

  // Inicializar Web Audio API
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Reproducir sonido de éxito
  const playSuccessSound = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 523.25; // C5
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
    
    // Segunda nota
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.value = 659.25; // E5
    osc2.type = "sine";
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
    osc2.start(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.45);
  };

  // Reproducir sonido de error
  const playErrorSound = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = "sawtooth";
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  };

  const handleSelectDept = (dept) => {
    setSelectedDept(dept);
    setMessage(`Has seleccionado: ${dept.name}. ¡Haz clic en su ubicación en el mapa!`);
  };

  const handlePlaceDept = (targetId) => {
    if (!selectedDept) {
      setMessage("Primero selecciona un departamento de la derecha 👉");
      return;
    }

    setAttempts(attempts + 1);

    if (selectedDept.id === targetId) {
      // ¡Correcto!
      setPlacedDepartments([...placedDepartments, targetId]);
      setScore(score + 10);
      setMessage(`¡Excelente! 🎉 ${selectedDept.name} está en el lugar correcto`);
      playSuccessSound();
      setSelectedDept(null);

      // Celebración si completó todos
      if (placedDepartments.length + 1 === DEPARTMENTS.length) {
        setShowCelebration(true);
        setMessage("🎊 ¡FELICITACIONES! Has completado el mapa de Colombia 🇨🇴");
        setTimeout(() => setShowCelebration(false), 3000);
      }
    } else {
      // Incorrecto
      setMessage(`❌ Intenta de nuevo. ${selectedDept.name} no va ahí`);
      playErrorSound();
    }
  };

  const handleReset = () => {
    setPlacedDepartments([]);
    setSelectedDept(null);
    setScore(0);
    setAttempts(0);
    setMessage("¡Nuevo juego! Arrastra los departamentos al mapa");
    setShowCelebration(false);
  };

  const progress = Math.round((placedDepartments.length / DEPARTMENTS.length) * 100);

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
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
        <Canvas 
          camera={{ position: [4, 5, 6], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <MapScene
            departments={DEPARTMENTS}
            placedDepartments={placedDepartments}
            selectedDept={selectedDept}
            onSelectDept={handleSelectDept}
            onPlaceDept={handlePlaceDept}
          />
        </Canvas>

        {/* Mensaje flotante */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            background: "rgba(255,255,255,0.95)",
            padding: 12,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            fontSize: 14,
            fontWeight: 600,
            color: "#1f2937",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {message}
        </div>

        {/* Celebración */}
        {showCelebration && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(34, 197, 94, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: "bold",
              color: "#15803d",
              animation: "pulse 1s ease-in-out",
            }}
          >
            🎊 ¡COMPLETADO! 🎊
          </div>
        )}
      </div>

      {/* Panel de control */}
      <div
        style={{
          width: 320,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: 16,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
          fontFamily: "'Comic Sans MS', 'Arial Rounded MT Bold', Arial, sans-serif",
          color: "#fff",
        }}
      >
        <h3 style={{ margin: "0 0 16px 0", fontSize: "20px", textAlign: "center", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
          🗺️ Mapa de Colombia 🇨🇴
        </h3>

        {/* Estadísticas */}
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            padding: 12,
            borderRadius: 12,
            marginBottom: 12,
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ marginBottom: 8, fontWeight: "bold", fontSize: "15px" }}>
            ⭐ Puntuación: {score} pts
          </div>
          <div style={{ marginBottom: 8, fontWeight: "bold", fontSize: "15px" }}>
            🎯 Intentos: {attempts}
          </div>
          <div style={{ marginBottom: 8, fontWeight: "bold", fontSize: "15px" }}>
            📊 Progreso: {placedDepartments.length}/{DEPARTMENTS.length}
          </div>
          
          {/* Barra de progreso */}
          <div
            style={{
              background: "rgba(255,255,255,0.3)",
              borderRadius: 12,
              height: 24,
              overflow: "hidden",
              position: "relative",
              border: "2px solid rgba(255,255,255,0.4)",
            }}
          >
            <div
              style={{
                background: "linear-gradient(90deg, #10b981, #059669)",
                height: "100%",
                width: `${progress}%`,
                transition: "width 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 13,
                fontWeight: "bold",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {progress > 10 && `${progress}%`}
            </div>
          </div>
        </div>

        {/* Lista de departamentos */}
        <div style={{ marginBottom: 12 }}>
          <strong style={{ display: "block", marginBottom: 10, fontSize: "16px", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
            📋 Departamentos por Región:
          </strong>
          <div style={{ maxHeight: 220, overflowY: "auto", background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: 8 }}>
            {["Caribe", "Andina", "Pacífica", "Orinoquía", "Amazonía", "Capital"].map((region) => (
              <div key={region} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: "bold",
                    color: "#000000",
                    marginBottom: 4,
                    textTransform: "uppercase",
                  }}
                >
                  {region}
                </div>
                {DEPARTMENTS.filter((d) => d.region === region).map((dept) => (
                  <div
                    key={dept.id}
                    style={{
                      padding: 6,
                      marginBottom: 3,
                      borderRadius: 4,
                      background: placedDepartments.includes(dept.id)
                        ? "#d1fae5"
                        : "#f9fafb",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11,
                      border: selectedDept?.id === dept.id ? "2px solid #fbbf24" : "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 2,
                        background: dept.color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        flex: 1,
                        color: "#000000",
                        textDecoration: placedDepartments.includes(dept.id)
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {dept.name}
                    </span>
                    {placedDepartments.includes(dept.id) && <span>✅</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Botón reiniciar */}
        <button
          onClick={handleReset}
          style={{
            width: "100%",
            padding: 12,
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
            border: "none",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 6px 12px rgba(245, 87, 108, 0.4)",
            transition: "all 0.2s",
            fontFamily: "'Comic Sans MS', Arial, sans-serif",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 8px 16px rgba(245, 87, 108, 0.5)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 6px 12px rgba(245, 87, 108, 0.4)";
          }}
        >
          🔄 Reiniciar Juego
        </button>
      </div>
    </div>
  );
}
