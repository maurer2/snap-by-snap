const path = require('path');
const fs = require('fs');
const LoaderOptionsPlugin = require('webpack');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcss = require('postcss');
const postcssModules = require('postcss-modules');

const posthtml = require('posthtml');
const posthtmlCssModules = require('posthtml-css-modules');

const { readFileSync } = require('fs');

const include = require('include');

const html = readFileSync('./src/index.html');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: 'sourcemap.map',
    },
    module: {
        rules: [
            // Babel
            /*
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/env'],
                },
              },
            },
            */
            // SCSS
            /*
            {
              test: /\.scss$/,
              use: [
                'style-loader',
                  /*
                { loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[local]--[hash:base64:5]',
                    sourceMap: true,
                  }
                },
                */
                /*
                'postcss-loader',
                'sass-loader',
              ],
            },
            */
            // CSS
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    // 'css-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            'postcss-custom-properties': {warnings: false},
                            plugins: () => [
                                postcss([
                                    postcssModules({
                                        getJSON: (cssFileName, json) => {
                                            const cssName      = path.basename(cssFileName);
                                            const jsonFileName = path.resolve(`./dist/${cssName}.json`);

                                            fs.writeFileSync(jsonFileName, JSON.stringify(json));
                                        },
                                        generateScopedName: '[name]__[local]___[hash:base64:5]',
                                    }),
                                ]),
                            ]
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                    {
                        loader: 'posthtml-loader',
                        options: {
                            config: {
                                path: './posthtml.config.js'
                            },
                            ident: 'posthtml',
                            parser: 'PostHTML Parser',
                            plugins: [
                                require('posthtml-include')({ root: 'src' })
                            ],
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        alias: {
            '~': path.resolve(__dirname, 'src/'),
        },
        extensions: ['*', '.js', '.css', '.scss'],
    },
    plugins: [
        /*
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            // hash: true,
        }),
        */
        // Copy assets
        new CopyWebpackPlugin([
            {
                from: 'src/assets/*.jpg',
                to: 'assets/',
                flatten: true,
            },
        ]),
        // HTML
        /*
        new LoaderOptionsPlugin({
            options: {
                posthtml(ctx) {
                    return {
                        parser: require('posthtml-pug'),
                        plugins: [
                            require('posthtml-bem')()
                        ]
                    }
                }
            }
        })
        */
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 9000,
        watchContentBase: true,
        hot: true,
        inline: true,
    },
};
