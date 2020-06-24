const M = module.exports = {}
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://localhost:27017'
const dbName = 'Blog'
var client, db, posts

M.open = async function () {
    client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    db = await client.db(dbName)
    posts = await db.collection('posts')
}

M.list = async function () {
    var postList = await posts.find({}).sort({ created_at: -1 }).toArray()
    // console.log('postList = ', postList)
    return postList
}

M.get = async function (id) {
    let post = await posts.findOne({ _id: new ObjectID(id) })
    // console.log('get: post=', post)
    return post
}

M.add = async function (post) {
    post.created_at = new Date()
    let r = await posts.insertOne(post)
    return r
}

M.remove = async function (id) {
    let post = await posts.remove({_id: ObjectID(id)})
    // console.log("remove: post=", post)
    return post
}