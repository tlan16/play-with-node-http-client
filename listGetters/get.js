const GetJson = require('./getJson.js')

exports.DI = (callback) => {
    let url = 'https://wenbo.tv/Practice-V3/config/desImg.json'
    return GetJson.get(url, callback)
}