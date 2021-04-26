import "./App.css";
import { useState, useRef } from "react";
import { Canvas, useThree, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

function Cube(props) {
  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  const size = isBig ? 0.1 : 1;
  const color = isHovered ? "orange" : "black";

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => setIsBig(!isBig)}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxBufferGeometry attach="geometry" args={[size, size, size]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
}

function CubeMaker() {
  let cubes = [];
  for (let i = 0; i < 100; i++) {
    let rx = Math.random() * 20;
    let ry = Math.random() * 20;
    let rz = Math.random() * 20;
    let px = Math.random() * 4 - 2;
    let py = Math.random() * 4 - 2;
    let pz = Math.random() * 4 - 2;
    cubes.push(<Cube rotation={[rx, ry, rz]} position={[px, py, pz]} />);
  }
  return cubes;
}

function Scene() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return (
    <>
      <ambientLight />
      <pointLight intensity={1} position={[-1, 2, 1]} />
      <CubeMaker />

      <orbitControls args={[camera, domElement]} />
    </>
  );
}

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default App;
