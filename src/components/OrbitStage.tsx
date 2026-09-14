import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { MealModel } from './MealModel';
import { ThemeMode, CameraPreset } from '../types';

interface OrbitStageProps {
  theme: ThemeMode;
  preset: CameraPreset;
}

// Preset camera coordinates & target focus points tuned for 3x larger model
const PRESET_CONFIGS: Record<CameraPreset, { position: [number, number, number]; target: [number, number, number] }> = {
  combo: {
    position: [0, 1.2, 3.2],
    target: [0, 0, 0],
  },
  burger: {
    position: [1.1, 0.65, 2.1],
    target: [0.55, -0.1, 0.1],
  },
  fries: {
    position: [-1.3, 1.2, 2.3],
    target: [-0.65, 0.15, -0.1],
  },
};

function CameraRig({
  preset,
  isInteracting,
  controlsRef,
}: {
  preset: CameraPreset;
  isInteracting: boolean;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...PRESET_CONFIGS[preset].position));
  const targetLook = useRef(new THREE.Vector3(...PRESET_CONFIGS[preset].target));

  useEffect(() => {
    targetPos.current.set(...PRESET_CONFIGS[preset].position);
    targetLook.current.set(...PRESET_CONFIGS[preset].target);
  }, [preset]);

  useFrame((_, delta) => {
    if (!isInteracting && controlsRef.current) {
      const lerpFactor = Math.min(delta * 3.0, 0.15);
      camera.position.lerp(targetPos.current, lerpFactor);
      controlsRef.current.target.lerp(targetLook.current, lerpFactor);
      controlsRef.current.update();
    }
  });

  return null;
}

function LightingRig({ theme }: { theme: ThemeMode }) {
  const isDark = theme === 'dark';

  return (
    <>
      {/* Ambient illumination */}
      <ambientLight
        color={isDark ? '#2D283E' : '#FFF9F0'}
        intensity={isDark ? 1.0 : 1.6}
      />

      {/* Main directional sun / spotlight */}
      <directionalLight
        position={isDark ? [4, 7, 3] : [5, 8, 4]}
        intensity={isDark ? 2.8 : 2.4}
        color={isDark ? '#F59E0B' : '#FFF4E0'}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Warm fill light */}
      <pointLight
        position={[-4, 3, -2]}
        intensity={isDark ? 1.4 : 0.9}
        color={isDark ? '#EF4444' : '#FFE8D6'}
      />

      {/* Dramatic rim/accent light */}
      <spotLight
        position={[0, 6, -5]}
        intensity={isDark ? 3.2 : 1.3}
        color={isDark ? '#FBBF24' : '#FFFFFF'}
        angle={0.6}
        penumbra={0.8}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-neutral-900/90 text-amber-300 shadow-xl border border-neutral-700/50">
        <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="font-serif tracking-widest text-sm uppercase text-white/90">Preparing 3D Meal...</span>
      </div>
    </Html>
  );
}

export function OrbitStage({ theme, preset }: OrbitStageProps) {
  const [isInteracting, setIsInteracting] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handleStart = () => {
    setIsInteracting(true);
    setAutoRotate(false);
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
  };

  const handleEnd = () => {
    setIsInteracting(false);
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => {
      setAutoRotate(true);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-10" data-testid="orbit-stage">
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 3.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <LightingRig theme={theme} />
        
        <Suspense fallback={<LoadingFallback />}>
          <MealModel floatEnabled={!isInteracting} />
          <ContactShadows
            position={[0, -0.85, 0]}
            opacity={theme === 'dark' ? 0.8 : 0.45}
            scale={9}
            blur={2.2}
            far={2.0}
            color={theme === 'dark' ? '#000000' : '#332211'}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={1.8}
          maxDistance={5.5}
          minPolarAngle={Math.PI / 6} // ~30 deg
          maxPolarAngle={Math.PI / 2.15} // ~83 deg
          autoRotate={autoRotate}
          autoRotateSpeed={1.0}
          onStart={handleStart}
          onEnd={handleEnd}
          makeDefault
        />

        <CameraRig preset={preset} isInteracting={isInteracting} controlsRef={controlsRef} />
      </Canvas>
    </div>
  );
}
