/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        fontFamily: {
          poppinsThin: ['Poppins-Thin'],
          poppinsExtraLight: ['Poppins-ExtraLight'],
          poppinsLight: ['Poppins-Light'],
          poppinsRegular: ['Poppins-Regular'],
          poppinsMedium: ['Poppins-Medium'],
          poppinsSemiBold: ['Poppins-SemiBold'],
          poppinsBold: ['Poppins-Bold'],
          poppinsExtraBold: ['Poppins-ExtraBold'],
          poppinsBlack: ['Poppins-Black'],
          poppinsBlackItalic: ['Poppins-BlackItalic'],
        }
    },
  },
  plugins: [],
}