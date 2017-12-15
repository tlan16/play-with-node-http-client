var http = require('http')
var moment = require('moment')

start = moment.now()

let agent = new http.Agent({
    maxSockets: 4,
})

let options = {
    hostname: 'www.google.co.uk',
    port: 80,
    path: '/',
    method: 'GET',
    agent: agent,
}

for (let i = 0; i < 25; i++) {
    http.get(options, function (res) {
        res.on('data', function (chunk) {
        })
    }).on('socket', function (e) {
        console.log("Socket to Google", moment.now() - start);
    })
}