import { MeshProps, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import {
	BufferGeometry,
	Float32BufferAttribute,
	MathUtils,
	Object3D,
	Vector3,
} from 'three/src/Three';

interface Props extends MeshProps {
	count: number;
}

function randomAsteroidCirclePosition(radius: number): Vector3 {
	const vector = new Vector3();
	const x = MathUtils.randFloat(-1, 1);
	const y = MathUtils.randFloat(-1, 1);
	const z = MathUtils.randFloat(-0.5, 0.5);
	const r = MathUtils.randFloat(0.5 * radius, 0.58 * radius);

	const normalizationFactor = 1 / Math.sqrt(x * x + y * y);

	vector.x = x * normalizationFactor * r;
	vector.y = y * normalizationFactor * r;
	vector.z = z;

	return vector;
}

function Asteroid(props: Props): JSX.Element {
	const { count } = props;
	const ref = useRef(null!);
	const [positions] = useMemo(() => {
		const positionsArray: number[] = [];
		const sizes = new Float32Array(count * 3);

		for (let i = 0; i < count; i++) {
			const vector = randomAsteroidCirclePosition(5);

			positionsArray.push(vector.x, vector.y, vector.z);
			sizes[i] = Math.random() < 0.03 ? 10 : 6;
		}

		const positions = new Float32Array(positionsArray);
		console.log('gg', positions);
		return [positions];
	}, [count]);

	//console.log('Positions', positions);

	return (
		<points>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={positions.length / 3}
					itemSize={3}
					array={positions}
				/>
			</bufferGeometry>
			<pointsMaterial size={0.03} />
		</points>
	);
}

export default Asteroid;
