// 在記憶體中建立資料庫
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');

// 將資料庫建立於檔案中
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('test.db')

// 建立資料表
db.serialize(function () {
    // db.run("CREATE TABLE Blog (col1, col2, col3)");

    db.run("INSERT INTO Blog VALUES (?, ?, ?)", ['a1', 'b1', 'c1']);
    db.run("INSERT INTO Blog VALUES (?, ?, ?)", ['a2', 'b2', 'c2']);
    db.run("INSERT INTO Blog VALUES (?, ?, ?)", ['a3', 'b3', 'c3']);

    // db.each("SELECT * FROM Test", function (err, row) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(row);
    // });
    db.all("SELECT * FROM Blog", function (err, rows) {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });
});
db.close();