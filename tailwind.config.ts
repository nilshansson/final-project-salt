import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        saltOrange: "#FF7961",
        saltDarkBlue: "#0F2D45",
        saltDarkPink: "#F35c7e",
        saltLightPink: "#eed3d0",
        saltBlack: "#353535",
        saltLightGrey: "#EBEBEB",
        saltGreenPastell: "#E1FFED",
        saltBluePastell: "#ECF7FA",
        lightGrey: "#F3F0F0",
        mediumGrey: "#E6E3E3",
        darkGrey: "#D8D8D8",
      },
      height: {
        "160": "40rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
});
