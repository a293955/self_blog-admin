'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = defaultSettings.title // page title

const port = process.env.port || process.env.npm_config_port || 8079 // dev port

module.exports = {
	publicPath: './',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
		proxy: {
			"/api": {
				target: "http://localhost:8090/admin",
				changeOrigin: true,
				pathRewrite: {
					"^/api": ""
				}
			}
		},
		disableHostCheck: true,
		port: port,
		overlay: {
			warnings: false,
			errors: true
		},
	},
	configureWebpack: {
		name: name,
		resolve: {
			alias: {
				'@': resolve('src')
			}
		},
		//警告 webpack 的性能提示
		performance: {
			hints:'warning',
			//入口起点的最大体积
			maxEntrypointSize: 50000000,
			//生成文件的最大体积
			maxAssetSize: 30000000
		}

	},
	chainWebpack(config) {
		config.plugin('preload').tap(() => [
			{
				rel: 'preload',
				fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
				include: 'initial'
			}
		])

		config.plugins.delete('prefetch')

		config.module
		.rule('svg')
		.exclude.add(resolve('src/icons'))
		.end()
		config.module
		.rule('icons')
		.test(/\.svg$/)
		.include.add(resolve('src/icons'))
		.end()
		.use('svg-sprite-loader')
		.loader('svg-sprite-loader')
		.options({
			symbolId: 'icon-[name]'
		})
		.end()
	}
}
