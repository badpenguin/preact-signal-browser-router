import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

const globals = {
	'@preact/signals': 'preactSignals',
	preact: 'preact',
};

export default {
	input: 'router.js',
	/*
	 * 2026-07-04: preact e signals restano peer dependency dell'app host.
	 * Bundlarli qui crea una seconda runtime Preact e impedisce al Router di reagire ai signal.
	 */
	external: ['preact', '@preact/signals'],
	output: [
		{
			file: 'dist/router.cjs.js',
			format: 'cjs',
			sourcemap: true,
			globals,
		},
		{
			file: 'dist/router.esm.js',
			format: 'es',
			sourcemap: true,
			globals,
		},
		{
			file: 'dist/router.umd.js',
			format: 'umd',
			name: 'Router',
			sourcemap: true,
			globals,
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
