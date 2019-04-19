const  {resolve} = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'game.js',
        path: resolve(__dirname,'../src/public/javascripts/')
    }
};
