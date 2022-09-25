import {
	extend,
	ReactThreeFiber,
	useFrame,
	useThree,
} from '@react-three/fiber';
import CameraControlsDefault from 'camera-controls';
import React, {
	ForwardedRef,
	forwardRef,
	MutableRefObject,
	useEffect,
	useRef,
} from 'react';
import {
	Box3,
	MathUtils,
	Matrix4,
	MOUSE,
	Quaternion,
	Raycaster,
	Sphere,
	Spherical,
	Vector2,
	Vector3,
	Vector4,
} from 'three';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			cameraControlsDefault: ReactThreeFiber.Node<
				CameraControlsDefault,
				typeof CameraControlsDefault
			>;
		}
	}
}

const subsetOfTHREE = {
	Box3: Box3,
	MOUSE: MOUSE,
	MathUtils: {
		DEG2RAD: MathUtils.DEG2RAD,
		clamp: MathUtils.clamp,
	},
	Matrix4: Matrix4,
	Quaternion: Quaternion,
	Raycaster: Raycaster,
	Sphere: Sphere,
	Spherical: Spherical,
	Vector2: Vector2,
	Vector3: Vector3,
	Vector4: Vector4,
};

CameraControlsDefault.install({ THREE: subsetOfTHREE });
extend({ CameraControlsDefault });

// eslint-disable-next-line react/display-name
export const CameraControls = forwardRef<CameraControlsDefault, unknown>(
	(_, ref) => {
		const cameraControls = useRef<CameraControlsDefault | null>(null);
		const camera = useThree(state => state.camera);
		const renderer = useThree(state => state.gl);
		useFrame((_, delta) => cameraControls.current?.update(delta));
		useEffect(() => () => cameraControls.current?.dispose(), []);
		return (
			<cameraControlsDefault
				ref={mergeRefs<CameraControlsDefault>(cameraControls, ref)}
				args={[camera, renderer.domElement]}
			/>
		);
	}
);

export type CameraControls = CameraControlsDefault;

function mergeRefs<T>(...refs: (MutableRefObject<T> | ForwardedRef<T>)[]) {
	return (instance: T): void => {
		for (const ref of refs) {
			if (typeof ref === 'function') {
				ref(instance);
			} else if (ref) {
				ref.current = instance;
			}
		}
	};
}
