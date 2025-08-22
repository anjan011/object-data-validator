import terser from '@rollup/plugin-terser';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
    input: 'src/main.js', // Your source file
    output: [
        {
            file: 'dist/bundle.umd.js',
            format: 'umd',
            name: 'ObjectDataValidator', // The global variable name for <script> tag
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
            name: 'ObjectDataValidator',
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

    plugins: [nodeResolve()],
};