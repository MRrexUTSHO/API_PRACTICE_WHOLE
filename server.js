const http = require('http');
const app = require('./app')
const server = http.createServer(app);
//create server er vetore app= app is hosted in this surver 

server.listen(3000,console.log('app is running '))
console.log("demo text ")