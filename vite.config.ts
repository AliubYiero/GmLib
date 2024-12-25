import { defineConfig } from 'vite';

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
		},
	},
} );
