const path = require("path")

module.exports = {
    mode: 'development',
    entry: './mainIndex.js',
    output: {
        path: path.resolve(__dirname, 'scripts'),
        filename: 'index.js'
    },
    watch: true
}
module.exports = {
    mode: 'development',
    entry: './mainSignup.js',
    output: {
        path: path.resolve(__dirname, 'scripts'),
        filename: 'clientReg.js'
    },
    watch: true
}