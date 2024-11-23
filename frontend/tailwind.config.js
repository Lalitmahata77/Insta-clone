// import daisyui from "daisyui";
// import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {}
    	}
    },
	plugins: [],

	daisyui: {
		themes: [
			// "light",
			// {
			// 	black: {
			// 		...daisyUIThemes["black"],
			// 		primary: "rgb(29, 155, 240)",
			// 		secondary: "rgb(24, 24, 24)",
			// 	},
			// },
		],
	},
};