module.exports = {
  configureWebpack:{
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  },
  "devServer": {
    port: 9002,
    host: '192.168.1.6', 
    "hot": true,
    "disableHostCheck": true
  },
  "outputDir": "../public",
  "indexPath": "../resources/views/welcome.blade.php",
  "transpileDependencies": [
    "vuetify"
  ],
}