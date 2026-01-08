"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float, Stars, Trail, Sparkles, Text, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { NeonButton } from "../cyberpunk/NeonButton";

function CyberpunkCar({ isSelected }: { isSelected: boolean }) {
    const meshRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            if (isSelected) {
                meshRef.current.rotation.y += 0.01;
            }
        }
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Main Body */}
                <mesh position={[0, -0.5, 0]}>
                    <boxGeometry args={[4, 1, 2]} />
                    <meshStandardMaterial color={isSelected ? "#c5003c" : "#1a1a1a"} roughness={0.2} metalness={0.8} />
                </mesh>
                {/* Cabin */}
                <mesh position={[-0.5, 0.5, 0]}>
                    <boxGeometry args={[2, 1, 1.8]} />
                    <meshStandardMaterial color="#000" roughness={0} metalness={1} emissive="#55ead4" emissiveIntensity={0.2} />
                </mesh>
                {/* Wheels/Thrusters */}
                {[[-1.5, -0.8, 1], [1.5, -0.8, 1], [-1.5, -0.8, -1], [1.5, -0.8, -1]].map((pos, i) => (
                    <mesh key={i} position={new THREE.Vector3(...pos)} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.4, 0.4, 0.5, 32]} />
                        <meshStandardMaterial color="#111" />
                        <mesh position={[0, -0.26, 0]}>
                            <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
                            <meshBasicMaterial color="#f3e600" />
                        </mesh>
                    </mesh>
                ))}
                {/* Neon Lines */}
                <mesh position={[0, -0.5, 1.01]}>
                    <planeGeometry args={[3.8, 0.1]} />
                    <meshBasicMaterial color="#c5003c" toneMapped={false} />
                </mesh>
                <mesh position={[0, -0.5, -1.01]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[3.8, 0.1]} />
                    <meshBasicMaterial color="#c5003c" toneMapped={false} />
                </mesh>
            </Float>
        </group>
    );
}

function CyberpunkWeapon({ isSelected }: { isSelected: boolean }) {
    const meshRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y -= 0.005;
            if (isSelected) {
                meshRef.current.rotation.x = Math.sin(Date.now() / 500) * 0.1;
            }
        }
    });

    return (
        <group ref={meshRef}>
            <Float speed={4} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Barrel */}
                <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                    <cylinderGeometry args={[0.15, 0.15, 3, 32]} />
                    <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Energy Core */}
                <mesh position={[0, 0.3, 0]}>
                    <boxGeometry args={[1.5, 0.4, 0.4]} />
                    <meshStandardMaterial color="#000" />
                    <mesh position={[0, 0, 0.21]}>
                        <planeGeometry args={[1.4, 0.3]} />
                        <meshBasicMaterial color={isSelected ? "#55ead4" : "#222"} />
                    </mesh>
                </mesh>
                {/* Handle */}
                <mesh position={[0.8, -0.5, 0]} rotation={[0, 0, 0.5]}>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#555" />
                </mesh>
                <Sparkles count={20} scale={4} size={4} speed={0.4} opacity={0.5} color="#55ead4" />
            </Float>
        </group>
    );
}

export function CyberpunkScene() {
    const [asset, setAsset] = useState<"CAR" | "WEAPON">("CAR");

    return (
        <div className="w-full h-[500px] relative rounded-lg overflow-hidden border border-white/10 bg-black/50">
            <div className="absolute top-4 left-4 z-10 flex gap-4">
                <NeonButton onClick={() => setAsset("CAR")} glowColor={asset === "CAR" ? "primary" : "secondary"} size="sm" variant={asset === "CAR" ? "default" : "outline"}>HOVER_CAR_V8</NeonButton>
                <NeonButton onClick={() => setAsset("WEAPON")} glowColor={asset === "WEAPON" ? "accent" : "secondary"} size="sm" variant={asset === "WEAPON" ? "default" : "outline"}>PLASMA_RIFLE</NeonButton>
            </div>

            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 2, 6]} />
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.5} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#c5003c" />
                <pointLight position={[-10, 5, -10]} intensity={1} color="#55ead4" />
                <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={1} color="#f3e600" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <group position={[0, -0.5, 0]}>
                    <gridHelper args={[20, 20, 0x880425, 0x222222]} />
                </group>

                {asset === "CAR" && <CyberpunkCar isSelected={true} />}
                {asset === "WEAPON" && <CyberpunkWeapon isSelected={true} />}

                {/* Environment effects */}
                <fog attach="fog" args={['#000', 5, 20]} />
            </Canvas>

            <div className="absolute bottom-4 right-4 z-10 text-right pointer-events-none">
                <h3 className="text-2xl font-display font-bold text-white uppercase">{asset === "CAR" ? "Type-66 Avenger" : "M-179 Achilles"}</h3>
                <p className="text-secondary font-mono text-sm">ASSET_PREVIEW_MODE // INTERACTIVE</p>
            </div>
        </div>
    );
}
