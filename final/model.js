const M = module.exports = {}
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const url = 'mongodb://localhost:27017'
const dbName = 'project'
var client, db, logins

M.open = async function () {
    client = await MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true})
    db = await client.db(dbName) // 創建名為 'project' 資料庫
    logins = await db.collection('logins') // 創建 db:logins 下的 colletion:login
}

M.clear = async function () {
    await logins.drop()
}

M.close = async function () {
    await client.close()
}

M.add = async function (login) {
    login.created_at = new Date() // 資料創建日期
    let r = await logins.insertOne(login) // 新增一筆 user 資料
    login._id = r.insertedID
}

M.get = async function (Id,Password) {
    let data = await logins.findOne({id:Id, password:Password}) // data 取得資料庫對應的帳密
    return data
}

M.list = async function () {
    var loginList = await logins.find({}).sort({ created_at: -1 }).toArray()
    // console.log('postList = ', postList)
    return loginList
}