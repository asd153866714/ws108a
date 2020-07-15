const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const views = require('koa-views')
const unirest = require("unirest")
const { type } = require('jquery')

require('dotenv').config()

const app = new Koa()
const router = new KoaRouter()

app.use(views('views', { map: { html: 'ejs' } }))
app.use(koaLogger())
app.use(koaBody())

app.use(router.routes())
app.use(async (ctx, next) => {
    ctx
})

router
    .get('/', async (ctx) => {
        await ctx.render('index', { // render index.html

        })
    })
    .post('/searchMovie', async (ctx) => {
        // 前端 AJAX 傳回的電影名稱
        let name = ctx.request.body
        console.log(name)

        // 傳送請求給 Movie database API
        var req =  await unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/")
            .query({
                "page": "1",
                "r": "json",
                "s": `${name}`
            })
            .headers({
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": process.env.API_KEY,
                "useQueryString": true
            })
            .end((res) => {
                if (res.error) throw new Error(res.error);
                // res.body 是 API 回應的結果
                console.log(res.body)
                ctx.body = res.body
                ctx.status = 200
            })
        ctx.body = req           
    });

app.listen(3000)
console.log('Server run at http://localhost:3000')