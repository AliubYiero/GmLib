import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
// @ts-ignore
import pkg from './package.json';


const createConfig = (
	// options: { minify: boolean },
) => ( {
	test: {
		environment: 'happy-dom', // 测试环境 (默认 'node')
		globals: true,        // 启用全局 API (如 describe/test/expect)
		coverage: {           // 覆盖率配置
			provider: 'istanbul', // 或 'v8'
			reporter: [ 'text', 'html' ],
		},
		include: [ '**/*.{test,spec}.{js,ts}' ],
		exclude: [ 'node_modules' ],
	},
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
			fileName: () => 'index.mjs',
		},
		rollupOptions: {
			/*
			* 项目 io 配置
			* */
			input: 'src/index.ts',
			external: [], // 添加需要外部化的依赖
			output: [
				{
					entryFileNames: 'index.mjs',
					format: 'es',
					globals: {}, // 为外部化依赖指定全局变量
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

// @ts-ignore
export default defineConfig( ( { mode } ) => {
	// console.log( 'mode', mode );
	// if ( mode === 'minify' ) return createConfig( { minify: true } );
	// return createConfig( { minify: false } );
	return createConfig();
} );
