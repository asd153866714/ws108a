var unirest = require("unirest");
var fs = require('fs')

let obj = {
	table: []
}
var req = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");

req.query({
	"page": "1",
	"r": "json",
	"s": "Avengers Endgame"
});

req.headers({
	"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
	"x-rapidapi-key": "a47ea85aa6mshc16ddfdd141a240p1ee7aejsn1e2cf86d3737",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
	obj.table.push(res.body.Search)
	fs.writeFile('data.json', JSON.stringify(obj, null, 4), (err) => {
		if (err) {
			console.log(err)
			return
		}
		console.log('File has been write')
	})
});