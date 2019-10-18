const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

app.use(serve(__dirname + '/public')); // 選擇要公開的資料夾 public
console.log('dirname;',__dirname) // 程式所在的資料夾

app.listen(3000);

console.log('listening on port 3000');