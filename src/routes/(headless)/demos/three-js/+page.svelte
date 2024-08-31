<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
	import { Button } from '$lib/components/ui/button';
	import { Slider } from '$lib/components/ui/slider';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent } from '$lib/components/ui/card';

	let mountRef: HTMLDivElement;
	let rotationSpeed = 0.0005;
	let showAtmosphere = true;
	let showCityLights = true;
	let selectedLocation: string | null = null;

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let earth: THREE.Mesh;
	let cityLights: THREE.Mesh;
	let atmosphere: THREE.Mesh;
	let controls: OrbitControls;
	let composer: EffectComposer;
	let clouds: THREE.Mesh;
	let moon: THREE.Mesh;
	let locationMarkers: THREE.Mesh[] = [];

	const locations = [
		{ name: 'New York', lat: 40.7128, lon: -74.006 },
		{ name: 'London', lat: 51.5074, lon: -0.1278 },
		{ name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
		{ name: 'Sydney', lat: -33.8688, lon: 151.2093 },
		{ name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 }
	];

	function latLonToVector3(lat: number, lon: number, radius: number) {
		const phi = (90 - lat) * (Math.PI / 180);
		const theta = (lon + 180) * (Math.PI / 180);
		const x = -(radius * Math.sin(phi) * Math.cos(theta));
		const z = radius * Math.sin(phi) * Math.sin(theta);
		const y = radius * Math.cos(phi);
		return new THREE.Vector3(x, y, z);
	}

	onMount(() => {
		// Scene setup
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		mountRef.appendChild(renderer.domElement);

		// Earth
		const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
		const earthTexture = new THREE.TextureLoader().load('/textures/planets/earth_day_4096.jpg');
		const earthMaterial = new THREE.MeshPhongMaterial({
			map: earthTexture,
			specular: new THREE.Color(0x333333),
			shininess: 10, // Increased shininess
			bumpMap: earthTexture, // Added bump map for more detail
			bumpScale: 0.05 // Adjust this value as needed
		});
		earth = new THREE.Mesh(earthGeometry, earthMaterial);
		scene.add(earth);

		// City Lights
		const lightsGeometry = new THREE.SphereGeometry(5.01, 64, 64);
		const lightsTexture = new THREE.TextureLoader().load('/textures/planets/earth_lights_2048.png');
		const lightsMaterial = new THREE.MeshBasicMaterial({
			map: lightsTexture,
			blending: THREE.AdditiveBlending,
			transparent: true,
			opacity: 0.8
		});
		cityLights = new THREE.Mesh(lightsGeometry, lightsMaterial);
		scene.add(cityLights);

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
		atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
		scene.add(atmosphere);

		// Clouds
		const cloudsGeometry = new THREE.SphereGeometry(5.05, 64, 64);
		const cloudsTexture = new THREE.TextureLoader().load('/textures/planets/earth_clouds_2048.png');
		const cloudsMaterial = new THREE.MeshPhongMaterial({
			map: cloudsTexture,
			transparent: true,
			opacity: 0.8
		});
		clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
		scene.add(clouds);

		// Moon
		const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
		const moonTexture = new THREE.TextureLoader().load('/textures/planets/moon_1024.jpg');
		const moonMaterial = new THREE.MeshPhongMaterial({
			map: moonTexture,
			bumpMap: moonTexture,
			bumpScale: 0.002
		});
		moon = new THREE.Mesh(moonGeometry, moonMaterial);
		moon.position.set(8, 0, 0);
		scene.add(moon);

		// Stars
		const starGeometry = new THREE.BufferGeometry();
		const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
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
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Increased intensity and changed color to white
		scene.add(ambientLight);
		const pointLight = new THREE.PointLight(0xffffff, 1.5); // Increased intensity
		pointLight.position.set(10, 10, 10);
		scene.add(pointLight);

		// Camera position
		camera.position.z = 15;

		// OrbitControls
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.minDistance = 6;
		controls.maxDistance = 20;

		// Post-processing
		composer = new EffectComposer(renderer);
		const renderPass = new RenderPass(scene, camera);
		composer.addPass(renderPass);
		const bloomPass = new UnrealBloomPass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			0.5,
			0.4,
			0.85
		);
		composer.addPass(bloomPass);

		// Location markers
		locations.forEach((location) => {
			const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
			const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
			const marker = new THREE.Mesh(markerGeometry, markerMaterial);
			const position = latLonToVector3(location.lat, location.lon, 5.05);
			marker.position.copy(position);
			earth.add(marker);
			locationMarkers.push(marker);
		});

		// Animation
		function animate() {
			requestAnimationFrame(animate);
			earth.rotation.y += rotationSpeed;
			cityLights.rotation.y += rotationSpeed;
			clouds.rotation.y += rotationSpeed * 1.1; // Clouds rotate slightly faster

			// Moon orbit
			const time = Date.now() * 0.001;
			moon.position.x = Math.cos(time * 0.1) * 8;
			moon.position.z = Math.sin(time * 0.1) * 8;
			moon.rotation.y += rotationSpeed * 0.1;

			controls.update();
			composer.render();
		}
		animate();

		// Resize handler
		function handleResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			composer.setSize(window.innerWidth, window.innerHeight);
		}
		window.addEventListener('resize', handleResize);

		// Raycaster for location selection
		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();

		function onMouseMove(event: MouseEvent) {
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);
			const intersects = raycaster.intersectObjects(locationMarkers);

			if (intersects.length > 0) {
				const index = locationMarkers.indexOf(intersects[0].object as THREE.Mesh);
				selectedLocation = locations[index].name;
			} else {
				selectedLocation = null;
			}
		}
		window.addEventListener('mousemove', onMouseMove);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', onMouseMove);
			mountRef.removeChild(renderer.domElement);
		};
	});

	$: {
		if (atmosphere) {
			atmosphere.visible = showAtmosphere;
		}
		if (cityLights) {
			cityLights.visible = showCityLights;
		}
	}
</script>

<div class="relative w-full h-screen bg-black">
	<div bind:this={mountRef} class="w-full h-full" />
	<Card class="absolute bottom-4 left-4 w-64 bg-black/50 text-white">
		<CardContent class="p-4 space-y-4">
			<div class="flex items-center justify-between">
				<Label for="atmosphere-toggle">Atmosphere</Label>
				<Switch id="atmosphere-toggle" bind:checked={showAtmosphere} />
			</div>
			<div class="flex items-center justify-between">
				<Label for="city-lights-toggle">City Lights</Label>
				<Switch id="city-lights-toggle" bind:checked={showCityLights} />
			</div>
			<div class="space-y-2">
				<Label for="rotation-speed">Rotation Speed</Label>
				<Slider id="rotation-speed" min={0} max={0.002} step={0.0001} value={[rotationSpeed]} />
			</div></CardContent
		>
	</Card>
	{#if selectedLocation}
		<div class="absolute top-4 left-4 bg-black/50 text-white p-2 rounded">
			Selected: {selectedLocation}
		</div>
	{/if}
</div>
