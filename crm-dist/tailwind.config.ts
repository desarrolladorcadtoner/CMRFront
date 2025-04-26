import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/Register/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                'pinkToner': '#delc85',
                'blueLightToner': '#0072b1',
                'blueDarkToner': '0b4468',
                'backgroundGray': '#f3f3f3'
            },
        },
        fontSize: {
            'xxs': '0.4rem',
        },
    },
    plugins: [],
} satisfies Config;
