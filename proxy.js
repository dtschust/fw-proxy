var express = require('express')
var httpProxy = require('http-proxy')

var apiProxy = httpProxy.createProxyServer({secure: false})
var app = express()

app.set('port', (process.env.PORT || 8000));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.all('/api/*', function (req, res) {
    apiProxy.web(req, res, { target: 'https://feedwrangler.net'})
  })

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
