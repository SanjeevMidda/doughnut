import "./index.css";
import { OrbitControls } from "@react-three/drei";
import { Text3D, Center, useMatcapTexture } from "@react-three/drei";
import font from "./fonts/helvetiker_regular.typeface.json";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();
const materialTwo = new THREE.MeshMatcapMaterial();

function App() {
  const donutGroup = useRef();

  const [matcapTexture] = useMatcapTexture("3F3A2F_91D0A5_7D876A_94977B", 256);
  const [matcapTextureTwo] = useMatcapTexture(
    "3B3C3F_DAD9D5_929290_ABACA8",
    256
  );
  // const tempArray = [Array(100)];

  // console.log(tempArray);

  useEffect(() => {
    material.matcap = matcapTexture;
    material.needsUpdate = true;

    materialTwo.matcap = matcapTextureTwo;
    materialTwo.needsUpdate = true;
  }, [matcapTexture, matcapTextureTwo]);

  useFrame((state, delta) => {
    for (const donut of donutGroup.current.children) {
      donut.rotation.y += delta * 1.5;
    }
  });
  return (
    <>
      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font={font}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[7, 1, 1]}
          material={materialTwo}
        >
          Hello
          {/* <meshMatcapMaterial matcap={matcapTextureTwo} /> */}
          {/* <meshNormalMaterial /> */}
        </Text3D>
      </Center>
      {/* <mesh scale={1.5}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}

      <group ref={donutGroup}>
        {[...Array(100)].map((value, index) => {
          return (
            <mesh
              material={material}
              key={index}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
              ]}
              geometry={torusGeometry}
              scale={0.2 + Math.random() * 0.2}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            >
              {/* <torusGeometry args={[1, 0.6, 16, 32]} /> */}
              {/* <meshMatcapMaterial matcap={matcapTexture} wireframe /> */}
              {/* <meshNormalMaterial color="yellow" /> */}
            </mesh>
          );
        })}
      </group>
    </>
  );
}

export default App;
