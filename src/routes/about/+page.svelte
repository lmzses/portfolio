<script>
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import {
		Github,
		Twitter,
		BookOpen,
		Rocket,
		Microchip,
		Trees,
		Code,
		Headphones,
		Coffee,
		Mail
	} from 'lucide-svelte';
	import { writable } from 'svelte/store';

	let activePassion = writable('Space');

	const passions = [
		{
			title: 'Space',
			icon: Rocket,
			content:
				'I always been curious about the space. I am amazeed by the majesty of our universe and beauty of it. It is incredible how little we talk about something so great.',
			image:
				'https://ucarecdn.com/0183e3e1-c60d-4fa8-acbf-494e852fa879/211cb91029054d17b614114779dbcda1.webp'
		},
		{
			title: 'Philosophy',
			icon: BookOpen,
			content:
				"Philosophy challenges me to think critically about existence, knowledge, and ethics. I'm particularly drawn to existentialism and its exploration of individual freedom and responsibility. Engaging with philosophical ideas helps me approach both life and coding with a more thoughtful perspective.",
			image:
				'https://ucarecdn.com/2cdc1353-3e47-48ee-a07f-8abb83dc1045/StockCakeClassicalLibraryDecor_1724862423.jpg'
		},
		{
			title: 'Technolgy',
			icon: Microchip,
			content:
				"The world of science, especially physics and biology, never ceases to amaze me. I'm always eager to learn about new scientific breakthroughs, from quantum computing to CRISPR gene editing. This passion for understanding how things work translates directly into my approach to solving complex coding problems.",
			image:
				'https://ucarecdn.com/33930237-1bed-47cb-8e05-456bbd974c2a/StockCakeFingertouchingtechnology_1724862267.jpg'
		},
		{
			title: 'Nature & Animals',
			icon: Trees,
			content:
				"My love for animals goes beyond just admiring cute photos online. I'm deeply interested in animal behavior and cognition, and I volunteer at a local animal shelter. This compassion and attention to the needs of others influences how I approach user-centric design in my development work.",
			image:
				'https://ucarecdn.com/8281ebe1-96e6-4b33-b191-b6a79c3176db/StockCakeSereneNatureMoment_1724862803.jpg'
		}
	];
</script>

<svelte:head>
	<title>About me - Lmzses</title>
</svelte:head>

<section id="about" class="max-w-2xl mx-auto mb-16">
	<h1 class="text-4xl font-bold mb-8">About Me</h1>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
		<div class="md:col-span-2 space-y-6">
			<p class="text-lg">
				Hey there! I'm Lmzses, a web developer with an insatiable curiosity for both technology and
				the world around us. My journey in tech began with a simple "Hello World" and has evolved
				into a passion for creating digital experiences that are not just functional, but also
				meaningful and beautiful.
			</p>
			<p class="text-lg">
				With a background in computer science and a love for continuous learning, I've honed my
				skills in JavaScript, React, and Node.js. But my interests don't stop at the edge of my
				screen. I'm equally fascinated by the cosmos, philosophical debates, scientific
				breakthroughs, and the intricate world of animal behavior.
			</p>
			<p class="text-lg">
				This diverse range of interests isn't just a hobby—it's the fuel that drives my creativity
				and problem-solving in web development. Whether I'm designing an intuitive user interface or
				architecting a complex backend system, I draw inspiration from the elegance of nature, the
				vastness of space, and the depth of human thought.
			</p>
		</div>
		<div>
			<div class="flex flex-wrap gap-2 justify-center">
				<Button variant="outline" size="sm" class="group" href="https://github.com/lmzses/">
					<Code class="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
					GitHub
				</Button>
				<Button variant="outline" size="sm" class="group" href="https://x.com/lmzses">
					<Twitter class="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
					Twitter/X
				</Button>
			</div>
		</div>
	</div>

	<h2 class="text-3xl font-semibold mb-6">My Passions</h2>
	<div class="mb-16">
		<Tabs value={$activePassion} on:change={(event) => ($activePassion = event.detail)}>
			<TabsList class="grid w-full h-fit gap-2 grid-cols-2 md:grid-cols-4">
				{#each passions as passion}
					<TabsTrigger value={passion.title} class="flex items-center">
						<svelte:component this={passion.icon} class="mr-2 h-4 w-4" />
						{passion.title}
					</TabsTrigger>
				{/each}
			</TabsList>
			{#each passions as passion}
				<TabsContent value={passion.title}>
					<Card>
						<CardContent class="p-6">
							<div class="flex flex-col md:flex-row gap-6">
								<img
									src={passion.image}
									alt={passion.title}
									class="w-full md:w-1/2 h-48 md:h-auto object-cover rounded-lg"
								/>
								<div class="flex-1">
									<h3 class="text-2xl font-semibold mb-4">{passion.title}</h3>
									<p class="text-muted-foreground">{passion.content}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			{/each}
		</Tabs>
	</div>

	<h2 class="text-3xl font-semibold mb-6">More About Me</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
		<Card>
			<CardContent class="p-6">
				<h3 class="text-xl font-semibold mb-4 flex items-center">
					<Code class="mr-2 h-5 w-5 text-primary" />
					Coding Philosophy
				</h3>
				<p class="text-muted-foreground">
					I believe in writing code to build better products that people wants. Or sometimes code
					for build something you always wanted to exists, or make an existing product better.
				</p>
			</CardContent>
		</Card>
		<Card>
			<CardContent class="p-6">
				<h3 class="text-xl font-semibold mb-4 flex items-center">
					<Headphones class="mr-2 h-5 w-5 text-primary" />
					When I'm Not Coding
				</h3>
				<ScrollArea class="h-[200px] w-full rounded-md border p-4">
					<ul class="space-y-2">
						<li>🎧 Listening music and watching IG reels</li>
						<li>🔭 Stargazing and astrophotography</li>
						<li>🎮 Playing strategy games and puzzle solvers</li>

						<li>✍️ Writing blog posts about tech and life musings</li>
					</ul>
				</ScrollArea>
			</CardContent>
		</Card>
	</div>
</section>
