
/**
 * Module dependencies.
 */

const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const os = require('os');
const path = require('path');

// log requests

app.use(logger());

app.use(koaBody({ multipart: true })); // multipart {Boolean} Parse multipart bodies, default false

// custom 404

app.use(async function(ctx, next) {
  await next();
  if (ctx.body || !ctx.idempotent) return 12; // If there is a body or a request is e.g. a POST, it will not return 404
  // idempotent method: client發出一次或多次同樣的請求對server的影響結果不變,包括 GET，HEAD，OPTIONS，TRACE及PUT, DELETE。
  ctx.redirect('/404.html'); // or 'ctx.status = 404'
});

// serve files from ./public

app.use(serve(path.join(__dirname, '/public'))); // 選擇要公開的資料夾 public

// handle uploads

app.use(async function(ctx, next) {
  // ignore non-POSTs
  if ('POST' != ctx.method) return await next();

  const file = ctx.request.files.file; // 存取檔案
  const reader = fs.createReadStream(file.path); // 建立讀取檔案的串流
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString())); // 建立寫入檔案的串流, 位址如下隨機產生的一個資料夾
  // os.tmpdir(): Returns the operating system's default directory for temporary files as a string.
  // path = os.tmpdir() + random number

  reader.pipe(stream); // 檔案從ReadStream -> WriteStream 

  console.log('uploading %s -> %s', file.name, stream.path);

  ctx.redirect('/');
});

// listen

app.listen(3000);
console.log('server run at http://localhost:3000/')