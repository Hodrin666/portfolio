/**
 * Module dependencies.
 */

import { Camera, MeshProps, useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useState } from 'react';

function randomIntegerFromRange(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * `Circle` component.
 */

function Circle(props: MeshProps): JSX.Element {
	const ref = useRef<THREE.Mesh>(null!);
	const canvasRef = useRef(document.createElement('canvas'));
	const context = useRef(canvasRef.current.getContext('2d'));
	let radians: number = Math.random() * Math.PI * 2;
	const velocity: number = 0.05;
	const randomX = randomIntegerFromRange(2, 8);
	const randomY = randomIntegerFromRange(2, 8);
	const camera = useThree(state => state.camera);

	console.log('context');

	useFrame((state, delta) => {
		radians += velocity;

		if (ref.current?.position) {
			ref.current.position.x = Math.cos(radians) * randomX;
			ref.current.position.y = Math.sin(radians) * randomY;
			console.log(ref.current.position.z);
		}

		const theta = 0.001;
		const x = camera.position.x;
		const z = camera.position.z;

		camera.position.x = x * Math.cos(theta) + z * Math.sin(theta);
		camera.position.z = z * Math.cos(theta) - x * Math.sin(theta);
		camera.lookAt(ref.current.position);
	});

	return (
		<mesh {...props} receiveShadow={true} ref={ref}>
			<sphereBufferGeometry args={[0.5, 32, 16]} />
			<meshPhysicalMaterial color={'white'} />
		</mesh>
	);
}

/**
 * Export `Floor` component.
 */

export default Circle;
