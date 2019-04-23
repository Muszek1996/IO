const  {resolve} = require('path');

module.exports = {
    mode: 'development',
    entry: './src/App.js',
    output: {
        filename: 'game.js',
        path: resolve(__dirname,'../src/public/javascripts/')
    },
    devtool: 'source-map'
};
