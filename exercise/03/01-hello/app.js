const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) { // 伺服器透過ctx回應瀏覽器的請求
  console.log('url=', ctx.url) // url 根目錄後的網址
  ctx.body = 'Hello World';
});

app.listen(3000);
