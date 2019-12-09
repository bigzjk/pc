const path = require('path')
const { paths } = require("react-app-rewired");
const { 
  override, 
  fixBabelImports,
  addDecoratorsLegacy,
  addWebpackAlias,
  addWebpackModuleRule
} = require('customize-cra');
const config = require(paths.scriptVersion + "/config/webpack.config.js")(
  process.env.NODE_ENV
);
module.exports = override(
  // 关于webpack的相关配置
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addDecoratorsLegacy(),
  addWebpackAlias({
    '@': path.resolve(__dirname,'./src')
  }),
  addWebpackModuleRule({
    test: /\.(scss|sass)$/,
    use: appendScssLoader([
      {
        loader: "sass-resources-loader",
        options: {
          resources: path.resolve(__dirname, "./src/assets/scss/global.scss")
        }
      }
    ])
  })
)

function appendScssLoader(Loader) {
  let scssLoader = [...config.module.rules[2].oneOf[5].use, ...Loader];
  return scssLoader;
}