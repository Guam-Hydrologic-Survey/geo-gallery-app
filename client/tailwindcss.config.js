export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // scans source files 
        "./node_modules/preline/dist/*.js", // enable preline components 
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("preline/plugin"),
    ],
};