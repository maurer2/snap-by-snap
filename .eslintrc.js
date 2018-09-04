// const path = require('path');

module.exports = {
    "extends": "airbnb-base",
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
    },
    "rules": {
        "quotes": [
            2,
            "single"
        ]
    },
    settings: {
        'import/resolver': 'webpack'
    }
    /*
    "settings": {
        "import/resolver": {
            "alias": [
                ["@app", path.resolve(__dirname, 'src/')]
            ]
        }
    }
    */
};