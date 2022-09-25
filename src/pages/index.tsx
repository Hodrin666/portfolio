/**
 * Module dependencies.
 */

import { Canvas } from '@react-three/fiber';
import { CameraControls } from 'components/camera-controls';
import Particles from 'components/particles';
import type { NextPage } from 'next';
import { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.main`
	width: 100vw;
	height: 100vh;
	background-color: black;
`;

const Home: NextPage = () => {
	const cameraControls = useRef<CameraControls | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	return (
		<Container>
			<Canvas ref={canvasRef}>
				<CameraControls ref={cameraControls} />
				<ambientLight intensity={0.1} />
				<directionalLight color="red" position={[0, 0, 5]} />
				<Particles count={500} />

				{/* <CircularMotion scale={0.1} /> */}
			</Canvas>
		</Container>
	);
};

export default Home;
