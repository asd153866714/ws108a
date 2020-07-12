const unirest = require('unirest')
const Koa = require('koa')
const { type } = require('jquery')

const app = new Koa()

app.use(async (ctx, next) => {
    let req = await unirest.get("https://movie-database-imdb-alternative.p.rapidapi.com/")
    .query({
        "page": "1",
        "r": "json",
        "s": "Avengers Endgame"
    })
    .headers({
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "a47ea85aa6mshc16ddfdd141a240p1ee7aejsn1e2cf86d3737",
        "useQueryString": true
    })
    .end(function (res) {
        if (res.error) throw new Error(res.error);
    })
    ctx.body = req["Search"]
})

app.listen(3000)
console.log('Server run at http://localhost:3000')