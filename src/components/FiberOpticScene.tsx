import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Pause, Play, RotateCcw } from 'lucide-react';

type CameraPreset = 'overview' | 'router' | 'mesh';

interface FiberOpticSceneProps {
  theme: 'light' | 'dark';
}

// Pre-allocated math helpers outside the render loop (zero GC)
const _vec3A = new THREE.Vector3();
const _vec3B = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _scale = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);

const CAMERA_TARGETS: Record<CameraPreset, { pos: [number, number, number]; look: [number, number, number] }> = {
  overview: { pos: [0, 3.05, 6.1], look: [0, 0.3, 0] },
  router: { pos: [1.65, 1.85, 3.2], look: [0, 0.42, 0] },
  mesh: { pos: [-2.75, 4.3, 4.7], look: [0, 0.1, 0] },
};

const NODE_COORDS: Array<{ label: string; pos: [number, number, number] }> = [
  { label: 'Hayatabad', pos: [-3.3, 0.05, 1.8] },
  { label: 'Gulbahar', pos: [3.1, 0.05, 1.5] },
  { label: 'GT Road', pos: [2.5, 0.05, -2.1] },
  { label: 'Khyber Exchange', pos: [-2.6, 0.05, -1.9] },
  { label: 'City Peshawar', pos: [0.3, 0.05, -3.0] },
  { label: 'University Town', pos: [-3.4, 0.05, -0.3] },
];

export default function FiberOpticScene({ theme }: FiberOpticSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const presetRef = useRef<CameraPreset>('overview');
  const pausedRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const themeSyncRef = useRef<(mode: 'light' | 'dark') => void>(() => {});

  const [preset, setPreset] = useState<CameraPreset>('overview');
  const [isPaused, setIsPaused] = useState(false);

  const handlePresetChange = (next: CameraPreset) => {
    presetRef.current = next;
    setPreset(next);
  };

  const handleTogglePause = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setIsPaused(next);
  };

  useEffect(() => {
    themeSyncRef.current(theme);
  }, [theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      pausedRef.current = true;
      setIsPaused(true);
    }

    const isSoftwareGl = (() => {
      const probe = document.createElement('canvas').getContext('webgl2');
      if (!probe) return true;
      const ext = probe.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
      const gpu = String(probe.getParameter(param));
      probe.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 420;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const lightBg = 0xeaf2ed;
    const darkBg = 0x0b1510;
    const initialBg = theme === 'dark' ? darkBg : lightBg;
    scene.background = new THREE.Color(initialBg);
    scene.fog = new THREE.FogExp2(initialBg, 0.055);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 60);
    camera.position.set(...CAMERA_TARGETS.overview.pos);
    camera.lookAt(...CAMERA_TARGETS.overview.look);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envRT = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envRT.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    const hemiLight = new THREE.HemisphereLight(0xdaf7e6, 0x163023, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.9);
    keyLight.position.set(4.5, 7, 4.5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    const d = 5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    // PTCL Lime Rim Light
    const rimLight = new THREE.DirectionalLight(0x78be20, 1.15);
    rimLight.position.set(-4.5, 3.5, -4);
    scene.add(rimLight);

    const disposables: Array<{ dispose: () => void }> = [envRT];
    const registerGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      disposables.push(g);
      return g;
    };
    const registerMat = <T extends THREE.Material>(m: T): T => {
      disposables.push(m);
      return m;
    };

    // Studio Floor
    const floorGeo = registerGeo(new THREE.CircleGeometry(9, 48));
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: theme === 'dark' ? 0x0e1c15 : 0xe2ece6,
        roughness: 0.82,
        metalness: 0.08,
      })
    );
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.02;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const gridHelper = new THREE.GridHelper(12, 24, 0x007b3e, 0x78be20);
    gridHelper.position.y = -0.005;
    const gridMats = Array.isArray(gridHelper.material) ? gridHelper.material : [gridHelper.material];
    gridMats.forEach((m) => {
      m.transparent = true;
      m.opacity = theme === 'dark' ? 0.25 : 0.18;
      disposables.push(m);
    });
    disposables.push(gridHelper.geometry);
    scene.add(gridHelper);

    // Composite 3D Procedural PTCL GPON Wi-Fi 6 ONT Router Group
    const routerGroup = new THREE.Group();

    const chassisShape = new THREE.Shape();
    const cw = 1.48;
    const cd = 0.96;
    const cr = 0.12;
    chassisShape.moveTo(-cw / 2 + cr, -cd / 2);
    chassisShape.lineTo(cw / 2 - cr, -cd / 2);
    chassisShape.quadraticCurveTo(cw / 2, -cd / 2, cw / 2, -cd / 2 + cr);
    chassisShape.lineTo(cw / 2, cd / 2 - cr);
    chassisShape.quadraticCurveTo(cw / 2, cd / 2, cw / 2 - cr, cd / 2);
    chassisShape.lineTo(-cw / 2 + cr, cd / 2);
    chassisShape.quadraticCurveTo(-cw / 2, cd / 2, -cw / 2, cd / 2 - cr);
    chassisShape.lineTo(-cw / 2, -cd / 2 + cr);
    chassisShape.quadraticCurveTo(-cw / 2, -cd / 2, -cw / 2 + cr, -cd / 2);

    const chassisGeo = registerGeo(
      new THREE.ExtrudeGeometry(chassisShape, {
        depth: 0.18,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03,
      })
    );
    chassisGeo.rotateX(-Math.PI / 2);

    const ceramicWhiteMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.26,
        metalness: 0.05,
        clearcoat: 0.7,
        clearcoatRoughness: 0.18,
      })
    );
    const chassisMesh = new THREE.Mesh(chassisGeo, ceramicWhiteMat);
    chassisMesh.position.y = 0.05;
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    routerGroup.add(chassisMesh);

    // PTCL Forest Green Heatsink Collar
    const trimGeo = registerGeo(new THREE.BoxGeometry(1.52, 0.06, 0.99));
    const ptclCollarMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x007b3e,
        metalness: 0.65,
        roughness: 0.3,
        anisotropy: 0.6,
      })
    );
    const trimMesh = new THREE.Mesh(trimGeo, ptclCollarMat);
    trimMesh.position.y = 0.05;
    trimMesh.castShadow = true;
    routerGroup.add(trimMesh);

    // Optical Glass Dome
    const domeGeo = registerGeo(new THREE.SphereGeometry(0.24, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2));
    const glassMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xd9f99d,
        metalness: 0,
        roughness: 0.08,
        transmission: isSoftwareGl ? 0 : 0.88,
        transparent: true,
        opacity: isSoftwareGl ? 0.45 : 1,
        ior: 1.55,
        thickness: 0.6,
        clearcoat: 1.0,
        depthWrite: false,
      })
    );
    const domeMesh = new THREE.Mesh(domeGeo, glassMat);
    domeMesh.position.y = 0.25;
    domeMesh.renderOrder = 2;
    routerGroup.add(domeMesh);

    // Optical Core inside dome (PTCL Lime)
    const coreGeo = registerGeo(new THREE.OctahedronGeometry(0.11, 1));
    const coreMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x78be20,
        emissive: 0x007b3e,
        emissiveIntensity: 2.1,
        roughness: 0.2,
      })
    );
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.34;
    routerGroup.add(coreMesh);

    // 4 Articulated Dual-Band Wi-Fi 6 Antennas
    const antennaGeo = registerGeo(new THREE.CylinderGeometry(0.022, 0.032, 0.86, 12));
    const hingeGeo = registerGeo(new THREE.CylinderGeometry(0.04, 0.04, 0.08, 12));
    const hingeMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.85,
        roughness: 0.25,
      })
    );
    const antennaPositions: Array<[number, number, number, number]> = [
      [-0.64, -0.36, 0.14, 0.12],
      [0.64, -0.36, -0.14, 0.12],
      [-0.58, 0.36, 0.12, -0.1],
      [0.58, 0.36, -0.12, -0.1],
    ];
    antennaPositions.forEach(([ax, az, rz, rx]) => {
      const antGroup = new THREE.Group();
      antGroup.position.set(ax, 0.22, az);
      const hinge = new THREE.Mesh(hingeGeo, hingeMat);
      hinge.rotation.z = Math.PI / 2;
      antGroup.add(hinge);

      const mast = new THREE.Mesh(antennaGeo, ceramicWhiteMat);
      mast.position.y = 0.43;
      mast.castShadow = true;
      antGroup.add(mast);

      antGroup.rotation.set(rx, 0, rz);
      routerGroup.add(antGroup);
    });

    // Front PTCL Green & Lime Status LEDs
    const ledGeo = registerGeo(new THREE.BoxGeometry(0.09, 0.022, 0.02));
    const ledMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x78be20,
        emissive: 0x78be20,
        emissiveIntensity: 1.9,
      })
    );
    for (let i = 0; i < 4; i++) {
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(-0.3 + i * 0.2, 0.16, 0.5);
      routerGroup.add(led);
    }

    scene.add(routerGroup);

    // Peshawar District Fiber Nodes & Curved Optical Conduits
    const fiberCurves: THREE.CatmullRomCurve3[] = [];
    const fiberMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x007b3e,
        emissive: 0x004d26,
        emissiveIntensity: 0.45,
        roughness: 0.25,
        metalness: 0.2,
        transparent: true,
        opacity: 0.88,
      })
    );

    const nodeBaseGeo = registerGeo(new THREE.CylinderGeometry(0.18, 0.23, 0.08, 20));
    const nodeRingGeo = registerGeo(new THREE.TorusGeometry(0.2, 0.022, 10, 28));
    const nodeCoreGeo = registerGeo(new THREE.SphereGeometry(0.08, 16, 16));
    const ptclGreenBeaconMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x007b3e,
        emissive: 0x007b3e,
        emissiveIntensity: 1.35,
        roughness: 0.25,
      })
    );

    NODE_COORDS.forEach((node, idx) => {
      const [nx, ny, nz] = node.pos;
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(nx, ny, nz);

      const base = new THREE.Mesh(nodeBaseGeo, hingeMat);
      base.position.y = 0.04;
      base.castShadow = true;
      nodeGroup.add(base);

      const ring = new THREE.Mesh(nodeRingGeo, ledMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.09;
      nodeGroup.add(ring);

      const beacon = new THREE.Mesh(nodeCoreGeo, idx % 2 === 0 ? ledMat : ptclGreenBeaconMat);
      beacon.position.y = 0.15;
      nodeGroup.add(beacon);

      scene.add(nodeGroup);

      const startAngle = (idx / NODE_COORDS.length) * Math.PI * 2;
      const start = new THREE.Vector3(Math.cos(startAngle) * 0.55, 0.12, Math.sin(startAngle) * 0.45);
      const mid1 = new THREE.Vector3(nx * 0.35, 0.55 + (idx % 2) * 0.22, nz * 0.35);
      const mid2 = new THREE.Vector3(nx * 0.72, 0.32, nz * 0.72);
      const end = new THREE.Vector3(nx, 0.1, nz);
      const curve = new THREE.CatmullRomCurve3([start, mid1, mid2, end]);
      fiberCurves.push(curve);

      const tubeGeo = registerGeo(new THREE.TubeGeometry(curve, 32, 0.022, 8, false));
      const tubeMesh = new THREE.Mesh(tubeGeo, fiberMat);
      scene.add(tubeMesh);
    });

    // InstancedMesh Data Packets streaming along fiber lines
    const packetsPerLine = 4;
    const totalPackets = fiberCurves.length * packetsPerLine;
    const packetGeo = registerGeo(new THREE.CapsuleGeometry(0.032, 0.11, 4, 8));
    packetGeo.rotateX(Math.PI / 2);
    const packetMat = registerMat(new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const packetInstanced = new THREE.InstancedMesh(packetGeo, packetMat, totalPackets);
    packetInstanced.frustumCulled = false;

    const packetColors = [new THREE.Color(0x78be20), new THREE.Color(0x00a651), new THREE.Color(0xbef264)];
    for (let i = 0; i < totalPackets; i++) {
      packetInstanced.setColorAt(i, packetColors[i % packetColors.length]);
    }
    if (packetInstanced.instanceColor) {
      packetInstanced.instanceColor.needsUpdate = true;
    }
    scene.add(packetInstanced);

    // Expose live theme switcher without tearing down WebGL context
    themeSyncRef.current = (mode: 'light' | 'dark') => {
      const targetHex = mode === 'dark' ? darkBg : lightBg;
      scene.background = new THREE.Color(targetHex);
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.setHex(targetHex);
      }
      floorMat.color.setHex(mode === 'dark' ? 0x0e1c15 : 0xe2ece6);
      gridMats.forEach((m) => {
        m.opacity = mode === 'dark' ? 0.25 : 0.18;
      });
    };

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener('pointermove', onPointerMove);

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();
    let simTime = 0;
    const camPosCurrent = new THREE.Vector3(...CAMERA_TARGETS.overview.pos);
    const camLookCurrent = new THREE.Vector3(...CAMERA_TARGETS.overview.look);

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.05);

      if (!pausedRef.current) {
        simTime += delta;
        coreMesh.rotation.y += delta * 1.1;
        coreMesh.rotation.x = Math.sin(simTime * 1.4) * 0.25;
        routerGroup.position.y = Math.sin(simTime * 1.2) * 0.03;
      }

      const target = CAMERA_TARGETS[presetRef.current];
      const parallaxX = pointerRef.current.x * 0.35;
      const parallaxY = -pointerRef.current.y * 0.18;

      camPosCurrent.x = THREE.MathUtils.damp(camPosCurrent.x, target.pos[0] + parallaxX, 4.5, delta);
      camPosCurrent.y = THREE.MathUtils.damp(camPosCurrent.y, target.pos[1] + parallaxY, 4.5, delta);
      camPosCurrent.z = THREE.MathUtils.damp(camPosCurrent.z, target.pos[2], 4.5, delta);

      camLookCurrent.x = THREE.MathUtils.damp(camLookCurrent.x, target.look[0], 4.5, delta);
      camLookCurrent.y = THREE.MathUtils.damp(camLookCurrent.y, target.look[1], 4.5, delta);
      camLookCurrent.z = THREE.MathUtils.damp(camLookCurrent.z, target.look[2], 4.5, delta);

      camera.position.copy(camPosCurrent);
      camera.lookAt(camLookCurrent);

      let idx = 0;
      for (let c = 0; c < fiberCurves.length; c++) {
        const curve = fiberCurves[c];
        for (let p = 0; p < packetsPerLine; p++) {
          const t = (simTime * 0.34 + p / packetsPerLine + c * 0.13) % 1;
          curve.getPointAt(t, _vec3A);
          curve.getTangentAt(t, _vec3B);

          _mat4.lookAt(_vec3A, _vec3A.clone().add(_vec3B), _up);
          _quat.setFromRotationMatrix(_mat4);
          _scale.set(1, 1, 1);
          _mat4.compose(_vec3A, _quat, _scale);
          packetInstanced.setMatrixAt(idx, _mat4);
          idx++;
        }
      }
      packetInstanced.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      disposables.forEach((dItem) => dItem.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#DCE5DF] dark:border-[#1F352B] bg-[#EAF2ED] dark:bg-[#0B1510]">
      <div
        ref={mountRef}
        className="h-[340px] w-full sm:h-[400px] lg:h-[450px]"
        aria-label="Interactive 3D PTCL GPON Wi-Fi 6 ONT router and Peshawar fiber network"
      />

      {/* Compact Bottom Dock inside 3D Viewport */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-3">
        <div className="pointer-events-auto inline-flex flex-wrap items-center justify-center gap-1 rounded-xl border border-[#DCE5DF] dark:border-[#1F352B] bg-white/95 dark:bg-[#0F1914]/95 p-1.5 shadow-md">
          {(['overview', 'router', 'mesh'] as CameraPreset[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => handlePresetChange(mode)}
              className={`min-h-8 rounded-lg px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                preset === mode
                  ? 'bg-[#007B3E] text-white'
                  : 'text-[#3C4E45] dark:text-[#B4C5BC] hover:bg-[#EAF2ED] dark:hover:bg-[#192B22]'
              }`}
            >
              {mode === 'overview' && '3D Overview'}
              {mode === 'router' && 'Wi-Fi 6 ONT'}
              {mode === 'mesh' && 'Peshawar Ring'}
            </button>
          ))}

          <span aria-hidden="true" className="mx-1 h-4 w-px bg-[#DCE5DF] dark:bg-[#1F352B]" />

          <button
            type="button"
            onClick={handleTogglePause}
            aria-label={isPaused ? 'Resume 3D animation' : 'Pause 3D animation'}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-[#3C4E45] dark:text-[#B4C5BC] hover:bg-[#EAF2ED] dark:hover:bg-[#192B22] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            <span>{isPaused ? 'Play' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={() => handlePresetChange('overview')}
            aria-label="Reset camera view"
            className="inline-flex min-h-8 items-center rounded-lg px-2 py-1 text-xs font-medium text-[#3C4E45] dark:text-[#B4C5BC] hover:bg-[#EAF2ED] dark:hover:bg-[#192B22] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
