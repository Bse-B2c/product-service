const getPath =
	path =>
	([, name]) => {
		return `${path}${name}`;
	};

module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 18,
				},
			},
		],
		'@babel/preset-typescript',
	],
	plugins: [
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				root: ['./src'],
				alias: {
					'@common': getPath('./src/common'),
					'@src': getPath('./src'),
					'@middleware': getPath('./src/middleware'),
					'@product': getPath('./src/product'),
					'@discount': getPath('./src/discount'),
					'@specification': getPath('./src/specification'),
					'@inventory': getPath('./src/inventory'),
					'@activity': getPath('./src/activity'),
				},
			},
		],
		'babel-plugin-transform-typescript-metadata',
		['@babel/plugin-proposal-decorators', { version: 'legacy' }],
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: true,
			},
		],
	],
	ignore: ['**/*.spec.ts'],
};
