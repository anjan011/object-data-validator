import terser from '@rollup/plugin-terser';

export default {
    input: 'src/main.js', // Your source file
    output: [
        {
            file: 'dist/bundle.umd.js',
            format: 'umd',
            name: 'ValidatorLibrary', // The global variable name for <script> tag
        },
        {
            file: 'dist/bundle.cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/bundle.esm.js',
            format: 'esm',
        },
        // Add a minified version of your UMD bundle
        {
            file: 'dist/bundle.umd.min.js',
            format: 'umd',
            name: 'ValidatorLibrary',
            plugins: [terser()], // The syntax remains the same
        },
        {
            file: 'dist/bundle.cjs.min.js',
            format: 'cjs',
            plugins: [terser()], // Added this for CommonJS minification
        },
        // Add a minified version of your ES module bundle
        {
            file: 'dist/bundle.esm.min.js',
            format: 'esm',
            plugins: [terser()],
        },
    ],
};