/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#fafafa",
        "on-primary": "#18181b",
        "text-primary": "#fafafa",
        "text-secondary": "#616161",
        "text-tertiary": "#121212",
        "text-inverse": "#18181b",
        "surface-base": "#0d0d0d",
        "surface-muted": "#000000",
        "border-default": "#1c1c1c",
      },
      fontFamily: {
        sans: ["Hedvig Letters Sans", "system-ui", "arial"],
      },
      fontSize: {
        "display": ["96px", { lineHeight: "104px", letterSpacing: "-0.02em", fontWeight: "400" }],
        "headline-lg": ["24px", { lineHeight: "32px", fontWeight: "400" }],
        "headline-md": ["20px", { lineHeight: "28px", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-md": ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "label-sm": ["10px", { lineHeight: "14px", fontWeight: "400" }],
      },
      borderRadius: {
        "none": "0px",
        "full": "9999px",
      },
      // Overrides Tailwind's default 1–8 steps on purpose: the design
      // system's dense dashboard scale (4–24px) is the only valid rhythm.
      spacing: {
        "1": "4px",
        "2": "6px",
        "3": "8px",
        "4": "12px",
        "5": "14px",
        "6": "16px",
        "7": "20px",
        "8": "24px",
      },
      transitionDuration: {
        "instant": "150ms",
        "fast": "200ms",
        "normal": "300ms",
      },
    },
  },
};
