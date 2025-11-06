import React, { useState, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

// Definición de 16 departamentos principales de Colombia
// Coordenadas normalizadas (x, z) basadas en geografía real de Colombia
const DEPARTMENTS = [
  // Costa Caribe (4)
  { id: 1, name: "La Guajira", position: [-0.3, 0, 1.4], color: "#FF6B6B", region: "Caribe" },
  { id: 2, name: "Magdalena", position: [-0.1, 0, 1.2], color: "#FFA07A", region: "Caribe" },
  { id: 3, name: "Atlántico", position: [0.1, 0, 1.1], color: "#FF8C42", region: "Caribe" },
  { id: 4, name: "Bolívar", position: [0, 0, 0.9], color: "#FFB6C1", region: "Caribe" },
  
  // Región Andina (6)
  { id: 5, name: "Santander", position: [-0.2, 0, 0.8], color: "#4ECDC4", region: "Andina" },
  { id: 6, name: "Boyacá", position: [-0.3, 0, 0.6], color: "#45B7D1", region: "Andina" },
  { id: 7, name: "Cundinamarca", position: [-0.1, 0, 0.4], color: "#5DADE2", region: "Andina" },
  { id: 8, name: "Antioquia", position: [0.3, 0, 0.8], color: "#3498DB", region: "Andina" },
  { id: 9, name: "Tolima", position: [0.3, 0, 0.2], color: "#6C5CE7", region: "Andina" },
  { id: 10, name: "Huila", position: [0.3, 0, -0.1], color: "#A29BFE", region: "Andina" },
  
  // Región Pacífica (3)
  { id: 11, name: "Chocó", position: [0.5, 0, 0.5], color: "#2ECC71", region: "Pacífica" },
  { id: 12, name: "Valle del Cauca", position: [0.5, 0, 0.2], color: "#27AE60", region: "Pacífica" },
  { id: 13, name: "Nariño", position: [0.6, 0, -0.2], color: "#58D68D", region: "Pacífica" },
  
  // Región Orinoquía (2)
  { id: 14, name: "Meta", position: [-0.2, 0, 0.1], color: "#F8B500", region: "Orinoquía" },
  { id: 15, name: "Casanare", position: [-0.4, 0, 0.5], color: "#F7B731", region: "Orinoquía" },
  
  // Distrito Capital (1)
  { id: 16, name: "Bogotá D.C.", position: [0, 0, 0.2], color: "#9B59B6", region: "Capital" },
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

// Mapa base con 8 puntos conectados que forman un plano personalizable
// PUEDES MODIFICAR ESTOS 8 PUNTOS PARA CREAR LA FORMA QUE QUIERAS
function ColombiaMapBase() {
  // Cargar la textura del mapa de Colombia
  const mapTexture = useLoader(TextureLoader, '/Colombia.jpg');
  
  // Define aquí los 8 puntos [x, z] que formarán el contorno del país
  // Posicionados DEBAJO de donde se sitúan los departamentos (y = -0.15)
  const points = [
    [-0.5, 1.7],   // Norte (La Guajira)
  [0.3, 1.2],    // Noroeste (Urabá)
  [0.6, 0.5],    // Oeste (Chocó)
  [0.7, -0.2],   // Suroeste (Nariño)
  [0, -0.5],  // Sur (Putumayo)
  [-0.4, -1.1],  // Sureste (Amazonas)
  [-0.7, 0.4],   // Este (Arauca)
  [-0.4, 1.1],   // Noreste (Venezuela)
  ];

  // Crear la forma conectando los puntos
  const countryShape = new THREE.Shape();
  
  // Empezar desde el primer punto
  countryShape.moveTo(points[0][0], points[0][1]);
  
  // Conectar todos los demás puntos
  for (let i = 1; i < points.length; i++) {
    countryShape.lineTo(points[i][0], points[i][1]);
  }
  
  // Cerrar el contorno volviendo al primer punto
  countryShape.closePath();

  const extrudeSettings = {
    depth: 0.02,
    bevelEnabled: false,
  };

  return (
    <group>
      {/* Mapa de Colombia como imagen de fondo */}
      <mesh position={[0, -0.21, 0]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <planeGeometry args={[4, 5]} />
        <meshBasicMaterial 
          map={mapTexture}
          transparent={false}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      {/* Líneas conectando los puntos para visualizar mejor */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length + 1}
            array={new Float32Array([
              ...points.flatMap(p => [p[0], -0.13, p[1]]),
              points[0][0], -0.13, points[0][1] // Cerrar el contorno
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff0000" linewidth={2} />
      </line>

      {/* Grid de referencia */}
      <gridHelper
        args={[6, 30, "#60a5fa", "#bfdbfe"]}
        position={[0, -0.16, 0]}
      />

      {/* Marcadores de los 8 puntos - posicionados DEBAJO */}
      {points.map((point, index) => (
        <group key={index}>
          <mesh position={[point[0], -0.12, point[1]]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
          </mesh>
          {/* Número del punto */}
          <Text
            position={[point[0], -0.08, point[1]]}
            fontSize={0.08}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {index + 1}
          </Text>
        </group>
      ))}
    </group>
  );
}

// Brújula simplificada
function Compass() {
  return (
    <group position={[1.5, 0.2, -1.3]}>
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
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        maxDistance={10}
        minDistance={4}
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
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      {/* Canvas 3D */}
      <div
        style={{
          width: "800px",
          height: "600px",
          borderRadius: 12,
          overflow: "hidden",
          background: "linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          position: "relative",
          border: "2px solid #bfdbfe",
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
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            fontSize: 14,
            fontWeight: 600,
            color: "#1f2937",
            textAlign: "center",
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
          width: 300,
          background: "#fff",
          padding: 16,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h3 style={{ margin: "0 0 12px 0", color: "#1f2937" }}>
          🗺️ Mapa de Colombia
        </h3>

        {/* Estadísticas */}
        <div
          style={{
            background: "#f3f4f6",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <strong>Puntuación:</strong> {score} pts
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Intentos:</strong> {attempts}
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Progreso:</strong> {placedDepartments.length}/{DEPARTMENTS.length}
          </div>
          
          {/* Barra de progreso */}
          <div
            style={{
              background: "#e5e7eb",
              borderRadius: 8,
              height: 20,
              overflow: "hidden",
              position: "relative",
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
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {progress > 10 && `${progress}%`}
            </div>
          </div>
        </div>

        {/* Lista de departamentos */}
        <div style={{ marginBottom: 12 }}>
          <strong style={{ display: "block", marginBottom: 8 }}>
            Departamentos por Región:
          </strong>
          <div style={{ maxHeight: 320, overflowY: "auto" }}>
            {["Caribe", "Andina", "Pacífica", "Orinoquía", "Amazonía", "Capital"].map((region) => (
              <div key={region} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: "bold",
                    color: "#4b5563",
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

        {/* Instrucciones */}
        <div
          style={{
            background: "#dbeafe",
            padding: 12,
            borderRadius: 8,
            fontSize: 12,
            marginBottom: 12,
          }}
        >
          <strong>📖 Instrucciones:</strong>
          <ol style={{ margin: "8px 0 0 0", paddingLeft: 20 }}>
            <li>Haz clic en un departamento (derecha del mapa)</li>
            <li>Luego haz clic en su ubicación correcta</li>
            <li>¡Completa todos para ganar!</li>
          </ol>
        </div>

        {/* Botón reiniciar */}
        <button
          onClick={handleReset}
          style={{
            width: "100%",
            padding: 12,
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#2563eb")}
          onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
        >
          🔄 Reiniciar Juego
        </button>
      </div>
    </div>
  );
}
