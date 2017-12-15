const { URL } = require('url')
const http = require('http')

const buildOptions = url => {
    url = new URL(url)
    let options = {
        hostname: url.hostname,
        port: url.port || 80,
        path: url.pathname,
        method: 'GET',
    }

    return options
}

const get = (url, callback) => {
    let options = buildOptions(url)
    console.log(options)
    http.get(options, res => {

        let json = ''
    
        res.on('data', chunk => {
            json += chunk
            console.log('received chunk, data size grows to', json.length)
        })
    
        res.on('end', () => {
            if (res.statusCode === 200) {
                try {
                    console.log('chunk ends with data size of', json.length)
                    let data = JSON.parse(json)
                    console.log('decoded json has size of', data.length)

                    callback(data)
                } catch (e) {
                    console.log('Error parsing JSON!')
                }
            } else {
                console.log('Status:', res.statusCode)
            }
        })
    })
}

exports.get = get