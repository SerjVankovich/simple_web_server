const app = require('express')()
const scrapper = require('./scrapper')

const REDDIT_URL = "https://www.reddit.com/"

app.get("/", (req, res) => {
   scrapper.makeRequest(REDDIT_URL, (html, err) => {
       if (err) {
           res.status('400')
           res.json({'error': `cannot connect with ${REDDIT_URL}`})
           return
       }

       const posts = scrapper.parseHtml(html)

       res.status(200)
       return res.json(posts)
   })
})

app.listen(8080, () => console.log("Server start at port 8080"))
