import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import pkg from './package.json';

export default defineConfig( {
	esbuild: {
		drop: [
			'debugger',
			'console',
		],
		minifySyntax: false,
		minifyIdentifiers: false,
		minifyWhitespace: false,
	},
	build: {
		emptyOutDir: false,
		lib: {
			entry: 'src/index.ts',
			fileName: 'index',
		},
		rollupOptions: {
			/*
			* 项目 io 配置
			* */
			input: 'src/index.ts',
			output: [
				{
					entryFileNames: 'index.mjs',
					format: 'es',
				},
			],
			plugins: [
				banner( [
					'/*',
					`* @module      : ${ pkg.name }`,
					`* @author      : ${ pkg.author }`,
					`* @version     : ${ pkg.version }`,
					`* @description : ${ pkg.description }`,
					`* @keywords    : ${ pkg.keywords.join( ', ' ) }`,
					`* @license     : ${ pkg.license }`,
					`* @repository  : ${ pkg.repository.url }`,
					'*/',
				].join( '\n' ) ),
			],
		},
	},
} );
