/**
 * Created by nutravel on 1/30/18.
 */
/*
 *
 * This is needed to add CSS vendor prefixes automatically through webpack.
 * Prefixes will allow older browsers to parse CSS correctly, specifically for newer CSS features
 *
 * */


module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}