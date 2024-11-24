/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'oxford-blue': '#0E1428',
				'rich-black': '#001011',
				'electric-blue': '#64E9EE',
				'light-sky-blue': '#97C8EB',
				'spring-green': '#35FF69'
			}
		}
	},
	plugins: ['prettier-plugin-tailwindcss']
};
