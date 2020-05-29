const U = require('./model/user')
const P = require('./model/pDetail')
const C = require('./model/cart')
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

app.keys = ['*@&))9kdjafda;983'] 
const CONFIG = { 
  key: 'd**@&(_034k3q3&@^(!$!',
  maxAge: 86400000
}
app.use(session(CONFIG, app)) // session 要放在 router 前面

app.use(router.routes())
app.use(serve(__dirname + '/view'));


router
.get('/', async (ctx) => { // render要顯示的頁面
    ctx.session.error_l = undefined
    ctx.session.error_r = undefined
    
    let userid = ctx.session.userID
    await ctx.render('index',{ // render index.html
        userid
    })
})

.get('/signup', async (ctx) => {
    console.log(ctx.request.querystring)
    let message = ctx.session.error_r
    await ctx.render('signup',{
        message
    })
})

.post('/signup', signup)

.get('/login', async (ctx) => {
    let message = ctx.session.error_l
    await ctx.render('login',{
        message
    })
})

.post('/login', login)

.get('/logout', logout)

.get('/cart', loadCart)

.get('/product', pDetails)

.post('/addItemToCart', addItemToCart)

.post('/updateProductAmount', updateProductAmount)

.post('/removeCartItem', removeCartItem)

async function signup(ctx){
    const userData = ctx.request.body // 取得頁面的資料 (帳號，密碼)
    console.log(userData)
    let data = await U.get(userData.id)
    console.log(userData.id)
    if (userData.id && userData.password != "" ){

        if (data == null){ // 確認帳號是否重複
            await U.add(userData)
            console.log("sign up success!")
            ctx.redirect('/')
        }
        else {
            ctx.session.error_r = "帳號已被使用"
            ctx.redirect('/signup')
        }
    }
    else {
        ctx.session.error_r = "帳號或密碼不能為空白"
        ctx.redirect('/signup')
    }
}  

async function login(ctx){
    let {id, password} = ctx.request.body
    console.log(ctx.request.body)
    let find_login =  await U.get(id)

    if (id && password != ""){
        if (find_login != null){ // 確認使用者資料是否存在
            if (find_login.password == password){ // 確認密碼
                ctx.session.userID = id
                ctx.session.error_l = undefined
                ctx.redirect('/')
            }           
            else {
                ctx.session.error_l = "密碼錯誤"
                ctx.redirect('/login')
            }
        }
        else {
            ctx.session.error_l = "用戶不存在"
            ctx.redirect('/login')
        }
    }
    else {
        ctx.session.error_l = "帳號或密碼不可為空白"
        ctx.redirect('/login')
    }
}

async function logout(ctx){
    ctx.session.userID = undefined // 清除 session 紀錄的登入資料
    ctx.redirect('/')
}

async function pDetails(ctx){
    let pid = await ctx.query.pid
    console.log(pid,typeof(pid))

    if (pid){
        let find_p = await P.get(pid)

        let product = find_p
        let userid = ctx.session.userID
        await ctx.render('product',{
            product, userid
        })
    }
    else {
        ctx.redirect("/")
    }

}

async function addItemToCart(ctx){
    console.log("start")
    console.log(ctx.request.body, typeof(ctx.request.body))
    let userid = ctx.session.userID

    if(userid != undefined){
        console.log("login-check")
        let p_data = ctx.request.body       
        let find_user = await C.getProduct(userid, p_data)

        if(find_user != null){ 
            await C.addAmount(userid, p_data)        // 更新商品數量
        }
        else{
            await C.addItem(userid, p_data)             // 新增一筆資料
        }
    }
    else{
        console.log('no login')
    }

    console.log('stop')
    ctx.body = null
}

async function loadCart(ctx){
    let userid = ctx.session.userID
    let data = await C.getCart(userid)
    let c_data = []
    console.log(typeof(c_data))

    await data.forEach(element => {
        c_data.push(element)
    });
    console.log(c_data, typeof(c_data))

    await ctx.render('cart',{ 
        userid, c_data
    })
}

async function updateProductAmount(ctx) {
    let userid = ctx.session.userID
    let p_data = JSON.parse(ctx.request.body)
    console.log('ajax test')
    await C.updateAmount(userid, p_data.name, p_data.amount)
    ctx.response.body = "Sever response"    
}

async function removeCartItem(ctx) {
    let userid = ctx.session.userID
    let p_data = JSON.parse(ctx.request.body)
    console.log(p_data)
    await C.remove(userid, p_data.name)
    console.log("remove success")
    ctx.response.body = "hello world" // 要傳回 response 否則 Client 會 not found
}

(async function(){
    await U.open()
    await P.open()
    await C.open()
    app.listen(3000)
    console.log("server run at http://localhost:3000")
}())


