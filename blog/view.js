const V = module.exports = {}

V.layout = function (title, content) {
    return `
    <html>
    <head>
        <title>${title}</title>
        <style>
            body {
            padding: 80px;
            font: 16px Helvetica, Arial;
            }
            
            h1 {
            font-size: 2em;
            }
            
            h2 {
            font-size: 1.2em;
            }
            
            #posts {
            margin: 0;
            padding: 0;
            }
            
            #posts li {
            margin: 40px 0;
            padding: 0;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
            list-style: none;
            }
            
            #posts li:last-child {
            border-bottom: none;
            }
            
            textarea {
            width: 500px;
            height: 300px;
            }
            
            input[type=text],
            textarea {
            border: 1px solid #eee;
            border-top-color: #ddd;
            border-left-color: #ddd;
            border-radius: 2px;
            padding: 15px;
            font-size: .8em;
            }
            
            input[type=text] {
            width: 500px;
            }
        </style>
    </head>
    <body>
        <section id="content">${content}</section>
    </body>
    </html>
    `
}

V.list = function (posts) {
    let list = []

    for (let i=0; i<posts.length; i++){
        list.push(`
        <li>
            <h2>${ posts[i].title }</h2>
            <p>
                <a href="/post/${posts[i]._id}">Read post</a>
            </p>
            <p>
                <a href="/delete/${posts[i]._id}">Delete</a>
            </p>
        </li>
        `)
      }

    let content = `
    <h1>Posts</h1>
    <p>
        You have <strong>${posts.length}</strong> posts!
    </p>
    <p>
        <a href="/post/new">Create a Post</a>
    </p>
    <ul id="posts">
        ${list.join('\n')}
    </ul>
    `
    return V.layout('Posts', content)
}

V.new = function () {
    return V.layout('New Post', 
    `
    <h1>New Post</h1>
    <p>Create a new post</p>
    <form action="/create" method="post">
        <p>
            <input type="text" placeholder="Title" name="title">
        </p>
        <p>
            <textarea placeholder="Content" name="body"></textarea>
        </p>
        <p>
            <input type="submit" value="Create">
        </p>
    </form>
    `)
}

V.show = function (post) {
    return V.layout(post.title, 
    `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    `)
}