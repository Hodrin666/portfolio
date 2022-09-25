/**
 * Module dependencies
 */

import { MeshProps, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function randomIntegerFromRange(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function CircularMotion(props: MeshProps): JSX.Element {
	const ref = useRef<THREE.Mesh>(null!);
	const velocity = 0.01;
	let radians = 0;
	const randomX = randomIntegerFromRange(0.1, 1.1);
	const randomY = randomIntegerFromRange(0.1, 1.1);

	useFrame((state, delta) => {
		radians += velocity;

		if (ref?.current?.position) {
			ref.current.position.x = Math.cos(radians) * randomX;
			ref.current.position.y = Math.sin(radians) * randomY;
		}
	});

	return (
		<mesh {...props} ref={ref}>
			<sphereBufferGeometry args={[0.5, 32, 16]} />
			<meshPhysicalMaterial color={'white'} />
		</mesh>
	);
}

export default CircularMotion;
