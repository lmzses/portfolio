<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
	import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
	import { Button } from '$lib/components/ui/button';
	import { Slider } from '$lib/components/ui/slider';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import { Card } from '$lib/components/ui/card';

	let mountRef: HTMLDivElement;
	let rotationSpeed = 0.001;
	let satelliteCount = 5;
	let showAtmosphere = true;
	let showClouds = true;
	let dayTime = true;
	let selectedLocation: string | null = null;

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let earth: THREE.Mesh;
	let clouds: THREE.Mesh;
	let atmosphere: THREE.Mesh;
	let satelliteGroup: THREE.Group;
	let controls: OrbitControls;
	let composer: EffectComposer;
	let outlinePass: OutlinePass;
	let locationMarkers: THREE.Mesh[] = [];

	const locations = [
		{ name: 'New York', lat: 40.7128, lon: -74.006 },
		{ name: 'London', lat: 51.5074, lon: -0.1278 },
		{ name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
		{ name: 'Sydney', lat: -33.8688, lon: 151.2093 }
	];

	onMount(() => {
		if (typeof window !== 'undefined') {
			initScene();
			animate();
			window.addEventListener('resize', handleResize);
			window.addEventListener('mousemove', onMouseMove as EventListener);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', onMouseMove);
			mountRef?.removeChild(renderer.domElement);
		}
	});

	function initScene() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(
			75,
			typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 1,
			0.1,
			1000
		);
		renderer = new THREE.WebGLRenderer({ antialias: true });
		if (typeof window !== 'undefined') {
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
		mountRef.appendChild(renderer.domElement);

		// Earth
		const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
		const earthTexture = new THREE.TextureLoader().load('/earth_daymap.jpg');
		const earthNightTexture = new THREE.TextureLoader().load('/earth_nightmap.jpg');
		const normalMap = new THREE.TextureLoader().load('/earth_normal_map.jpg');
		const specularMap = new THREE.TextureLoader().load('/earth_specular_map.jpg');
		const earthMaterial = new THREE.MeshPhongMaterial({
			map: earthTexture,
			normalMap: normalMap,
			specularMap: specularMap,
			specular: new THREE.Color(0x333333),
			shininess: 25
		} as THREE.MeshPhongMaterialParameters);
		earth = new THREE.Mesh(earthGeometry, earthMaterial);
		scene.add(earth);

		// Clouds
		const cloudGeometry = new THREE.SphereGeometry(5.05, 64, 64);
		const cloudTexture = new THREE.TextureLoader().load('/earth_clouds.png');
		const cloudMaterial = new THREE.MeshPhongMaterial({
			map: cloudTexture,
			transparent: true,
			opacity: 0.4
		});
		clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
		scene.add(clouds);

		// Atmosphere
		const atmosphereGeometry = new THREE.SphereGeometry(5.1, 64, 64);
		const atmosphereMaterial = new THREE.ShaderMaterial({
			vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
			fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
			blending: THREE.AdditiveBlending,
			side: THREE.BackSide
		});
		atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
		scene.add(atmosphere);

		// Satellites
		satelliteGroup = new THREE.Group();
		scene.add(satelliteGroup);
		updateSatellites(satelliteCount);

		// Space station
		const loader = new GLTFLoader();
		loader.load(
			'/space_station.glb',
			(gltf) => {
				const spaceStation = gltf.scene;
				spaceStation.scale.set(0.1, 0.1, 0.1);
				spaceStation.position.set(8, 0, 0);
				scene.add(spaceStation);
			},
			undefined,
			(error) => {
				console.error('An error occurred while loading the space station model:', error);
			}
		);

		// Stars
		const starGeometry = new THREE.BufferGeometry();
		const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
		const starVertices = [];
		for (let i = 0; i < 10000; i++) {
			const x = (Math.random() - 0.5) * 2000;
			const y = (Math.random() - 0.5) * 2000;
			const z = (Math.random() - 0.5) * 2000;
			starVertices.push(x, y, z);
		}
		starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
		const stars = new THREE.Points(starGeometry, starMaterial);
		scene.add(stars);

		// Lighting
		const ambientLight = new THREE.AmbientLight(0x404040);
		scene.add(ambientLight);
		const pointLight = new THREE.PointLight(0xffffff, 1);
		pointLight.position.set(10, 10, 10);
		scene.add(pointLight);

		// Camera position
		camera.position.z = 15;

		// OrbitControls
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		// Post-processing
		composer = new EffectComposer(renderer);
		const renderPass = new RenderPass(scene, camera);
		composer.addPass(renderPass);
		const bloomPass = new UnrealBloomPass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			1.5,
			0.4,
			0.85
		);
		composer.addPass(bloomPass);
		outlinePass = new OutlinePass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			scene,
			camera
		);
		composer.addPass(outlinePass);

		// Location markers
		locations.forEach((location) => {
			const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
			const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
			const marker = new THREE.Mesh(markerGeometry, markerMaterial);
			const position = latLonToVector3(location.lat, location.lon, 5.1);
			marker.position.copy(position);
			earth.add(marker);
			locationMarkers.push(marker);
		});
	}

	function updateSatellites(count: number) {
		satelliteGroup.clear();
		const satelliteGeometry = new THREE.SphereGeometry(0.1, 16, 16);
		const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
		for (let i = 0; i < count; i++) {
			const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
			const angle = (i / count) * Math.PI * 2;
			satellite.position.set(Math.cos(angle) * 7, Math.sin(angle) * 7, 0);
			satelliteGroup.add(satellite);
		}
	}

	function latLonToVector3(lat: number, lon: number, radius: number) {
		const phi = (90 - lat) * (Math.PI / 180);
		const theta = (lon + 180) * (Math.PI / 180);
		const x = -(radius * Math.sin(phi) * Math.cos(theta));
		const z = radius * Math.sin(phi) * Math.sin(theta);
		const y = radius * Math.cos(phi);
		return new THREE.Vector3(x, y, z);
	}

	function animate() {
		requestAnimationFrame(animate);
		earth.rotation.y += rotationSpeed;
		clouds.rotation.y += rotationSpeed * 1.1;
		satelliteGroup.rotation.y += 0.002;
		controls.update();
		composer.render();
	}

	function handleResize() {
		if (typeof window !== 'undefined') {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			composer.setSize(window.innerWidth, window.innerHeight);
		}
	}
	function onMouseMove(event: MouseEvent) {
		if (typeof window === 'undefined') return;

		const mouse = new THREE.Vector2(
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		);

		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects(locationMarkers);

		if (intersects.length > 0) {
			const index = locationMarkers.indexOf(intersects[0].object as THREE.Mesh);
			selectedLocation = locations[index].name;
			outlinePass.selectedObjects = [intersects[0].object];
		} else {
			selectedLocation = null;
			outlinePass.selectedObjects = [];
		}
	}

	$: {
		if (satelliteGroup) {
			updateSatellites(satelliteCount);
		}
	}

	$: {
		if (atmosphere) {
			atmosphere.visible = showAtmosphere;
		}
	}

	$: {
		if (clouds) {
			clouds.visible = showClouds;
		}
	}

	$: {
		if (earth) {
			earth.material.map = dayTime
				? new THREE.TextureLoader().load('/earth_daymap.jpg')
				: new THREE.TextureLoader().load('/earth_nightmap.jpg');
		}
	}
</script>

<div class="relative w-full h-screen bg-black">
	<div bind:this={mountRef} class="w-full h-full" />
	<Card class="absolute bottom-4 left-4 w-64 bg-black/50 text-white">
		<div class="p-4 space-y-4">
			<div class="flex items-center justify-between">
				<Label for="atmosphere-toggle">Atmosphere</Label>
				<Switch id="atmosphere-toggle" bind:checked={showAtmosphere} />
			</div>
			<div class="flex items-center justify-between">
				<Label for="clouds-toggle">Clouds</Label>
				<Switch id="clouds-toggle" bind:checked={showClouds} />
			</div>
			<div class="flex items-center justify-between">
				<Label for="day-night-toggle">Day/Night</Label>
				<Switch id="day-night-toggle" bind:checked={dayTime} />
			</div>
			<div class="space-y-2">
				<Label for="rotation-speed">Rotation Speed</Label>
				<Slider id="rotation-speed" min={0} max={0.01} step={0.0001} value={[rotationSpeed]} />
			</div>
			<div class="space-y-2">
				<Label for="satellite-count">Satellites</Label>
				<Slider id="satellite-count" min={0} max={20} step={1} value={[satelliteCount]} />
			</div>
		</div>
	</Card>
	{#if selectedLocation}
		<div class="absolute top-4 left-4 bg-black/50 text-white p-2 rounded">
			Selected: {selectedLocation}
		</div>
	{/if}
</div>
