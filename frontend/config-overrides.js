const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
    addWebpackModuleRule({
        test: /mapbox-gl-csp-worker.js$/,
        use: { loader: 'worker-loader' },
    })
);