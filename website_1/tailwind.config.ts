import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                toasted: {
                    teal: "#00E5FF",
                    purple: "#9D00FF",
                    yellow: "#FFEA00",
                    orange: "#FF5E00",
                    blue: "#2979FF",
                    black: "#050505",
                },
            },
            fontFamily: {
                sans: ['var(--font-outfit)', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
export default config;
