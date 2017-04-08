const root = `${__dirname}/..`;
const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: `${root}/js/es6/main.js`,
    output: {
        path: `${root}/dist`,
        filename: 'bundle-es6.js'
    },
    devtool: production ? '#cheap-source-map' : '#eval-source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-0'],
            }
        }, {
            test: /\.(scss|sass|css)$/,
            loader: 'style-loader!css-loader!sass-loader'
        }]
    }
};
