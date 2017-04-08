const root = `${__dirname}/..`

module.exports = {
    entry: `${root}/js/es6/main.js`,
    output: {
        path: `${root}/dist`,
        filename: 'bundle-es6.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
};
