import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MealModelProps {
  floatEnabled?: boolean;
}

export function MealModel({ floatEnabled = true }: MealModelProps) {
  const { scene } = useGLTF('/burger_and_fries.glb');
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Enable shadows on all child meshes
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current && floatEnabled) {
      // Gentle subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.15}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/burger_and_fries.glb');
