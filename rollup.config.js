import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
	input: 'router.js',
	output: [
		{
			file: 'dist/router.cjs.js',
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: 'dist/router.esm.js',
			format: 'es',
			sourcemap: true,
		},
		{
			file: 'dist/router.umd.js',
			format: 'umd',
			name: 'Router',
			sourcemap: true,
		},
	],
	plugins: [
		resolve(),
		commonjs(),
		babel({
			babelHelpers: 'bundled',
			presets: ['@babel/preset-env'],
		}),
		terser()
	]
};
