import { useEffect, type RefObject } from "react";
import * as THREE from "three";

export function useCenteredScene(
  scene: THREE.Object3D,
  groupRef: RefObject<THREE.Group | null>,
  targetSize: number
) {
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const diagonal = size.length() || 1;
    const scale = targetSize / diagonal;
    group.scale.setScalar(scale);
    group.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, [scene, groupRef, targetSize]);
}
