export default function BlockSpinner(props) {
  return (
    <>
      <mesh
        position={[4, -0.1, 0]}
        geometry={props.boxGeometry}
        material={props.floor2Material}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </>
  );
}
