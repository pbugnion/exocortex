
var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'electron-renderer',
    entry: [
	path.join(__dirname, 'app/index.js')
    ],
    output: {
	path: path.join(__dirname, 'dist'),
	filename: 'renderer.dev.js',
	publicPath: `http://localhost:1212/dist/`
    },
    devServer: {
	port: 1212,
	publicPath: 'http://localhost:1212/dist/',
	contentBase: path.join(__dirname, 'dist'),
	hot: true,
	headers: { 'Access-Control-Allow-Origin': '*' },
    },
    module: {
	rules: [
	    {
		test: /\.jsx?$/,
		exclude: /node_modules/,
		use: {
		    loader: 'babel-loader',
		    options: {
			cacheDirectory: true,
			presets: ['react'],
			plugins: ['transform-object-rest-spread']
		    }
		}
	    },
	    {
		test: /\.css$/,
		use: [
		    { loader: 'style-loader' },
		    { 'loader': 'css-loader' }
		]
	    },
	    // WOFF Font
	    {
		test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
		use: {
		    loader: 'url-loader',
		    options: {
			limit: 10000,
			mimetype: 'application/font-woff'
		    }
		}
	    },
	    // WOFF2 Font
	    {
		test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
		use: {
		    loader: 'url-loader',
		    options: {
			limit: 10000,
			mimetype: 'application/font-woff'
		    }
		}
	    },
	    // TTF Font
	    {
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		use: {
		    loader: 'url-loader',
		    options: {
			limit: 10000,
			mimetype: 'application/octet-stream'
		    }
		}
	    },
	    // EOT Font
	    {
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		use: 'file-loader'
	    }
	]
    },
    plugins: [
	new webpack.HotModuleReplacementPlugin()
    ]
}
