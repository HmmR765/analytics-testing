
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles, CameraShake, Trail } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

function Planet() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group>
            {/* The Main Planet Body */}
            <mesh ref={meshRef} position={[0, 0, -10]}>
                <sphereGeometry args={[8, 64, 64]} />
                <meshStandardMaterial
                    color="#050505"
                    roughness={0.7}
                    metalness={0.5}
                    emissive="#1a0005"
                    emissiveIntensity={0.2}
                />
            </mesh>
            {/* Atmosphere Glow */}
            <mesh position={[0, 0, -10]} scale={[1.15, 1.15, 1.15]}>
                <sphereGeometry args={[8, 32, 32]} />
                <meshBasicMaterial color="#c5003c" transparent opacity={0.05} side={THREE.BackSide} />
            </mesh>
            {/* Planetary Ring */}
            <mesh rotation={[Math.PI / 3, 0, 0]} position={[0, 0, -10]}>
                <torusGeometry args={[14, 0.1, 16, 100]} />
                <meshBasicMaterial color="#55ead4" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 3, 0, 0]} position={[0, 0, -10]} scale={[1.05, 1.05, 1]}>
                <torusGeometry args={[14, 0.05, 16, 100]} />
                <meshBasicMaterial color="#f3e600" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

const EXPLOSION_LIFETIME = 2.0;

function Explosion({ position, onComplete }: { position: THREE.Vector3, onComplete: () => void }) {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const [age, setAge] = useState(0);

    useFrame((state, delta) => {
        const newAge = age + delta;
        setAge(newAge);

        if (newAge >= EXPLOSION_LIFETIME) {
            onComplete();
            return;
        }

        const progress = newAge / EXPLOSION_LIFETIME;

        // Animation Curves
        // Scale: Fast expansion
        const scaleProgress = Math.min(newAge * 4, 1);
        const scale = 1 + scaleProgress * 5;

        // Opacity: Slow fade
        const opacity = 1 - Math.pow(progress, 2);

        if (groupRef.current) {
            groupRef.current.position.copy(position);
            groupRef.current.scale.set(scale, scale, scale);
        }

        if (coreRef.current) {
            const mat = coreRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = opacity;
        }

        if (ringRef.current) {
            const mat = ringRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = opacity * 0.5;
            ringRef.current.rotation.z += delta * 2;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshBasicMaterial color="#f3e600" transparent depthWrite={false} />
            </mesh>
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.8, 0.1, 8, 32]} />
                <meshBasicMaterial color="#c5003c" transparent depthWrite={false} />
            </mesh>
        </group>
    );
}

function Asteroid({ data }: { data: any }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.set(data.x, data.y, data.z);
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Trail width={2} length={8} color="#b08d5b" attenuation={(t) => t * t}>
            <mesh ref={meshRef} scale={[data.scale, data.scale, data.scale]}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#b08d5b" roughness={0.8} metalness={0.2} flatShading />
            </mesh>
        </Trail>
    );
}

function AsteroidBelt() {
    const count = 40;

    // Explosion State
    const [explosions, setExplosions] = useState<{ id: number, position: THREE.Vector3 }[]>([]);
    const nextId = useRef(0);

    const removeExplosion = (id: number) => {
        setExplosions(prev => prev.filter(e => e.id !== id));
    };

    const addExplosion = (pos: THREE.Vector3) => {
        setExplosions(prev => [...prev, { id: nextId.current++, position: pos }]);
    };

    // Physics Data Ref
    const asteroidsRef = useRef(new Array(count).fill(0).map(() => {
        const r = 15 + Math.random() * 30;
        const angle = Math.random() * Math.PI * 2;
        return {
            r,
            angle,
            y: (Math.random() - 0.5) * 8,
            scale: 0.2 + Math.random() * 0.6,
            direction: Math.random() > 0.5 ? 1 : -1,
            speed: 0.1 + Math.random() * 0.3,
            x: 0, z: 0
        };
    }));

    useFrame((state, delta) => {
        const asteroids = asteroidsRef.current;

        asteroids.forEach(a => {
            // Move: Simple Orbit
            a.angle += (a.speed / Math.max(a.r, 1)) * delta * 5 * a.direction;

            // Calc Position
            a.x = Math.cos(a.angle) * a.r;
            a.z = Math.sin(a.angle) * a.r - 10;
        });

        // Collision Check
        for (let i = 0; i < asteroids.length; i++) {
            const a1 = asteroids[i];
            // Check 3 random others
            for (let k = 0; k < 3; k++) {
                const j = Math.floor(Math.random() * count);
                if (i === j) continue;
                const a2 = asteroids[j];

                if (Math.abs(a1.x - a2.x) < 2 && Math.abs(a1.z - a2.z) < 2 && Math.abs(a1.y - a2.y) < 2) {
                    // Collision!
                    if (Math.random() < 0.05) {
                        const pos = new THREE.Vector3((a1.x + a2.x) / 2, (a1.y + a2.y) / 2, (a1.z + a2.z) / 2);
                        addExplosion(pos);
                        // No push needed for orbit logic, they pass through
                    }
                }
            }
        }
    });

    return (
        <group>
            {asteroidsRef.current.map((data, i) => (
                <Asteroid key={i} data={data} />
            ))}

            {explosions.map(ex => (
                <Explosion
                    key={ex.id}
                    position={ex.position}
                    onComplete={() => removeExplosion(ex.id)}
                />
            ))}
        </group>
    );
}

export function ImpactBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-black pointer-events-none">
            <Canvas gl={{ antialias: true }} camera={{ position: [0, 0, 20], fov: 60 }}>
                {/* Cameras/Lights */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[50, 20, 30]} intensity={2} color="#c5003c" />
                <pointLight position={[-20, -10, 0]} intensity={2} color="#55ead4" />

                {/* The Galaxy */}
                <Stars radius={200} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
                <Planet />
                <AsteroidBelt />

                {/* Impact Shake */}
                <CameraShake
                    maxYaw={0.02}
                    maxPitch={0.02}
                    maxRoll={0.02}
                    yawFrequency={0.1}
                    pitchFrequency={0.1}
                    rollFrequency={0.1}
                    intensity={1}
                />

                {/* Atmosphere fog */}
                <fog attach="fog" args={['#000', 10, 80]} />
            </Canvas>

            {/* Vignette & Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80" />
            <div className="absolute inset-0 bg-black/60" />
        </div>
    );
}
