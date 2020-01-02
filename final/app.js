const M = require('./model')
const Koa = require('koa')
var serve = require('koa-static')
const session = require('koa-session')
var KoaRouter = require('koa-router')
var koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const views = require('koa-views')


var app = new Koa()
const router = new KoaRouter()

app.use(views('view', {map:{html:'ejs'}})) // 使用 ejs midleware(模板引擎) **要放在router啟動之前**
app.use(koaLogger())
app.use(koaBody())
app.use(router.routes())
app.use(serve(__dirname + '/public'));

app.keys = ['*@&))9kdjafda;983'] 
const CONFIG = { 
  key: 'd**@&(_034k3q3&@^(!$!',
  maxAge: 86400000
}

app.use(session(CONFIG, app))

router
.get('/', async (ctx) => { // render要顯示的頁面
    let userid = session.userID
    console.log('session.userID:',userid)
    await ctx.render('index',{
        userid
    })
})

.get('/register', async (ctx) => { 
    await ctx.render('register',{})
})

.post('/register', register)

.get('/login', async (ctx) => {
    await ctx.render('login')
})
.post('/login', login)

.get('/error', async (ctx)=> { // 送出資料有誤，顯示錯誤訊息
    await ctx.render('error')
})

.get('/logout',logout)

.get('/cart', async (ctx) =>{
    await ctx.render('cart')
})


async function register(ctx){
    const userData = ctx.request.body // 取得頁面的資料 (帳號，密碼)
    await M.add(userData)
    ctx.redirect('/')
}  

async function login(ctx){
    let {id, password} = ctx.request.body
    console.log("login()_msg:",id,password)
    if ( await M.get(id,password) != null){ // 資料庫確認使用者資料是否存在
        session.userID = id
        ctx.redirect('/')
        console.log('login success')
    }
    else {
        ctx.redirect('/error')
    }
}

async function logout(ctx){
    console.log("logout test")
    session.userID = undefined // 清除 session 紀錄的登入資料
    ctx.redirect('/')
}

async function main() {
    await M.open()
    app.listen(3000)
    console.log("server run at http://localhost:3000/")
}

main()


