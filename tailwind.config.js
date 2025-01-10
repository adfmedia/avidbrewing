// NVM version 22
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
let containers = Object.assign({}, defaultTheme.screens);
containers["2xl"] = "1441px";
containers["3xl"] = "1921px";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html}',
        './src/js/**/*.js',
    ],

    theme: {
        screens: {
            'xxs':  '320px',
            'xs':   '370px',
            'xsm':  '500px',
            'sm':   '768px',
            'md':   '1024px',
            'lg':   '1280px',
            'xl':   '1368px',
            '2xl':  '1920px',
            '3xl':  '3320px',
        },
        container: {
            center: true,
            padding: "1rem", // Add horizontal padding by default
            screens: containers,
        },
        extend: {
            colors: {
                gray: {
                    50:     "#f9fafb",
                    100:    "#f3f4f6",
                    200:    "#e5e7eb",
                    300:    "#d1d5db",
                    400:    "#9ca3af",
                    500:    "#5A5A5A", // Brand Charcoal
                    600:    "#4b5563",
                    700:    "#374151",
                    800:    "#1f2937",
                    900:    "#212121", // Brand Main black
                    950:    "#020617",
                },
                primary:    "#00C76F", // Brand green
                secondary:  "#DAAC00", // Brand gold
                goldDark:  "#927200", // Brand deep gold
                snow:        "#F8F6F0", // Brand snow for bgs
                success:    "#06d6a0",
                danger:     "#ef476f",
                warning:    "#ffd166",
                info:       "#38a0c2",
            },
            fontFamily: {
                sans: ["NunitoSans", ...defaultTheme.fontFamily.sans],
                //   serenity: ["Serenity", 'sans-serif'],
                serenityBold: ["Serenity", 'sans-serif'],
                serenityMedium: ["Serenity", 'sans-serif'],
            },
            fontSize: {
                tiny:           ["11px", "14px"],
                lead:           ["16px", "24px"],
                "lead-lg":      ["24px", "32px"],
                excerpt:        ["18px", "26px"],
                text:           ["16px", "28px"],
                quote:          ["20px", "28px"],
                capitalized:    ["14px", { lineHeight: "19px", letterSpacing: "2px" }],
                base:           '1.063rem',
                '2xl': '1.25rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
                '5xl': '2.5rem',

                "heading-1":    ["50px", "56px"],
                "heading-2":    ["40px", "46px"],
                "heading-3":    ["34px", "40px"],
                "heading-4":    ["30px", "36px"],
                "heading-5":    ["20px", "26px"],
                "heading-6":    ["18px", "24px"],
                "sub-heading":  ["27px", "33px"],
            },
            boxShadow: {
                img:        "0 47px 65px rgb(21 28 38 / 10%)",
                menu:       "4px 4px 40px rgb(16 24 40 / 10%)",
                input:      "14px 14px 36px 0 #99999938",
                product:    "0px 45px 80px 0px #0000000a",
                card:       "0px 45px 80px 0px #0000000a",
                3:          "0px 47px 65px 0px #151c261a",
                4:          "0px 20px 60px -6px #0000000a",
                sm:         "0px 1px 2px 0px #0000000d",
                nav:        "0 0 15px 0 rgb(0 0 0 / 9%)",
                header:     "0 8px 20px 0 rgb(0 0 0 / 5%)",
            },
            lineClamp: {
                3:  "3",
                5:  "5",
                10: "10",
            },
            keyframes: {
                float: {
                    "0%":   { transform: "translateY(-20px)" },
                    "100%": { transform: "translateY(0px)" },
                },
            },
            animation: {
                float:      "float 2s linear infinite alternate",
                "float-md": "float 4s linear infinite alternate",
                "float-lg": "float 6s linear infinite alternate",
            },
        }
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};
