const http = require('http')
const moment = require('moment')
const fileSizer = require("filesize")
const parallelLevel = 30

const { URL } = require('url')

const agent = new http.Agent({
    maxSockets: parallelLevel,
})

const buildOptions = url => {
    url = new URL(url)
    let options = {
        hostname: url.hostname,
        port: url.port || 80,
        path: url.pathname,
        method: 'GET',
        agent,
    }

    return options
}

const get = (urls) => {
    console.log('start downloading %d urls', urls.length)

    for (let url of urls) {
        http.get(buildOptions(url), res => {

            let rawData = ''
    
            res.on('data', chunk => {
                rawData += chunk
            })
    
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('chunk ends with data size of', fileSizer(rawData.length))
                    delete rawData
                } else {
                    console.log('Status:', res.statusCode, 'URL', url)
                }
            })
    
        }).on('socket', e => {
            console.log("Socket when", moment().format('hh:mm:ss:SSSS'))
        })
    }
}

exports.download = get