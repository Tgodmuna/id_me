/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#4A90E2", // Blue
				secondary: "#50E3C2", // Teal
				dark: "#333333", // Dark Gray
				light: "#F5F7FA", // Light Gray
			},
		},
	},
	plugins: [],
};
