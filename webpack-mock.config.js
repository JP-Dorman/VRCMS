const server = new WebpackDevServer(compiler, {

 hot: true,

 // enable HMR on the server
 contentBase: './src/client',

 // fallback to root for other urls
 historyApiFallback: true,

 // proxy requests through to the api server to be able to maintain hot reloading
 proxy: {
   '/api': {
     target: 'https://localhost:8081/',
     secure: false,
   },

   '/auth': {
     target: 'https://localhost:8081/',
     secure: false,
   },
 },

 https: true,

 stats: {
   colors: true,
   chunks: false,
 },
})
