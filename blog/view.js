const V = module.exports = {}

V.layout = function (title, content) {
    return `
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"
            integrity="sha256-46r060N2LrChLLb5zowXQ72/iKKNiw/lAmygmHExk/o=" crossorigin="anonymous" />
        <link rel="stylesheet" href="/style.css">

        <title>${title}</title>
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
            <h5>${ posts[i].title }</h5>
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
    <h3>Posts</h3>
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
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    `)
}