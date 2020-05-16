# 安裝與啟動

下載點 : https://www.mongodb.com/download-center

安裝完成之後，在 Windows 下必須設定系統路徑，我的路徑在： 『C:\Program Files\MongoDB\Server\3.0\bin』

接著請啟動命令列，然後在目前資料夾下建立資料庫路徑 db ，接著輸入下列指令。

```
D:\>mkdir db

D:\db>mongod --dbpath db
```

此時 mongodb 伺服器就會啟動完成此時


```
D:\db>mongo
MongoDB shell version: 3.0.2
connecting to: test
```

# 指令

```
show.dbs

use test

```

參考 : https://gitlab.com/ccckmit/course/-/wikis/%E9%99%B3%E9%8D%BE%E8%AA%A0/%E6%9B%B8%E7%B1%8D/%E7%B6%B2%E7%AB%99%E8%A8%AD%E8%A8%88/mongodbUse


