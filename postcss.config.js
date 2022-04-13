const tailwindcss = require('tailwindcss');
module.exports = {
    theme: {
        extend: {
            colors: {
                'grey-blue': '#3b5167',
            }
        }
    },
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ],
};
