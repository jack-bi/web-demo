const skin = process.env.npm_config_skin || process.argv[2]

const entry = {
    app: ["babel-polyfill" ,'./src/main.js'],
    'common': './src/common-bundle/common.js',
}

// if (process.env.NODE_ENV !== 'production') {
//     for (var key in entry) {
//         if (skin != key) delete entry[key];
//     }
// }
module.exports = entry
