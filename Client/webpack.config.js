const  {resolve} = require('path');

module.exports = {
    entry: './src/game.js',
    output: {
        filename: 'game.js',
        path: resolve(__dirname,'../src/public/javascripts/')
    }
};
