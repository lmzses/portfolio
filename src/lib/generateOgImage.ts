// src/lib/generateOgImage.js
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs/promises';

// Load fonts
const interRegular = await fs.readFile('./static/fonts/Inter-Regular.ttf');
const interBold = await fs.readFile('./static/fonts/Inter-Bold.ttf');

export async function generateOgImage({ title, description, author, date, readTime }) {
	const markup = html`
		<div
			style="display: flex; flex-direction: column; justify-content: center; width: 100%; height: 100%; background: linear-gradient(to bottom right, #1e293b, #0f172a); padding: 60px;"
		>
			<h1
				style="font-size: 64px; font-weight: bold; color: white; line-height: 1.1; margin-bottom: 16px; max-width: 800px;"
			>
				${title}
			</h1>
			<p style="font-size: 24px; color: #94a3b8; margin-bottom: 24px; max-width: 700px;">
				${description}
			</p>
			<div style="display: flex; align-items: center;">
				<div
					style="width: 48px; height: 48px; border-radius: 9999px; background-color: #64748b; margin-right: 16px; display: flex;"
				></div>
				<div style="display: flex; align-items: center; gap: 1rem;">
					<p style="font-size: 20px; font-weight: bold; color: white; margin: 0;">${author}</p>
					<p style="font-size: 16px; color: #94a3b8; margin: 0;">${date}</p>
				</div>
			</div>
		</div>
	`;

	const svg = await satori(markup, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Inter',
				data: interRegular,
				weight: 400,
				style: 'normal'
			},
			{
				name: 'Inter',
				data: interBold,
				weight: 700,
				style: 'normal'
			}
		]
	});

	const resvg = new Resvg(svg);
	const pngBuffer = resvg.render().asPng();

	return pngBuffer;
}
