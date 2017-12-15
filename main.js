const ListGetter = require('./listGetters/get')
const BatchDownloader = require('./batchDownloader')

const baseUrl = 'https://wenbo.tv/Practice-V3'

ListGetter.DI(list => {
    let urls = []
    for (di of list) {
        urls.push(
            baseUrl + '/' + di.imgUrl,
            baseUrl + '/' + di.voiceUrl,
        )
    }

    console.log(urls)
    BatchDownloader.download(urls)
})