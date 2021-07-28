let zIndex = {};

Array.from({ length: 500 }, (_, i) => i + 51).forEach((num) => {
    zIndex[num] = num;
});

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            lineClamp: {
                7: "7",
                8: "8",
                9: "9",
                10: "10",
                11: "11",
            },
            minWidth: {
                sm: "15rem",
                fg: "2rem",
            },
            maxWidth: {
                xsm: "17rem",
            },
            spacing: {
                13: "50px",
            },
            zIndex,
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: {
                primary: "#18191A",
                DEFAULT: "#000",
                subtle: "#101820",
                smooth: "#242526",
                secondary: "#33333333",
            },
            white: {
                DEFAULT: "#fff",
                primary: "#eeeeeeee",
                secondary: "#888",
            },
            gray: {
                DEFAULT: "gray",
            },
            green: {
                DEFAULT: "#0f0",
                primary: "#2bae66", //github
                secondary: "#3a9",
                dark: "#6c766c",
                light: "#d2f7dc",
                lighter: "#f2fff0",
            },
            red: {
                DEFAULT: "#f00",
                primary: "#e10600",
                subtle: "#933e3b",
                lighter: "#fcebec",
                dark: "#a80710",
            },
            blue: {
                primary: "#4267b2", //facebook
                secondary: "#0a66c2", // linkedin
                light: "#1da1f2", //twitter
            },
            social: {
                twitter: "#1da1f2",
                instagram: "#a80710",
                linkedin: "#0a66c2",
                github: "#eeeeeeee",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
