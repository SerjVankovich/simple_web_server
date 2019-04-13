const cheerio = require('cheerio')
const fetch = require('axios')

exports.makeRequest = (url, cb) => {
    fetch.get(url)
    .then(res => res.data)
    .then(body => cb(body, null))
    .catch(err => cb(null, error))
}

exports.parseHtml = html => {
    const posts = []
        const title = cheerio(".scrollerItem", html).map( (i, node) => {
            const img = cheerio("img", node)
            const h2 = cheerio("h2", node)
            const a = cheerio("a.SQnoC3ObvgnGjWt90zD9Z", node)
            const author = cheerio("a.s1i3ufq7-0.bsfRLa", node)
            posts.push({
                title: h2.text(),
                link: "https://www.reddit.com" + a.prop('href'),
                imgSrc: img.prop('src'),
                author: author.text(),
                authorLink: "https://www.reddit.com" + author.prop('href')
            })
        })

    return posts
    
}