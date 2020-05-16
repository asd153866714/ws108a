# 安裝與啟動

下載點 : https://www.mongodb.com/download-center

安裝完成之後，在 Windows 下必須設定系統路徑，我的路徑在： 『C:\Program Files\MongoDB\Server\3.0\bin』

接著請啟動命令列，然後在目前資料夾下建立資料庫路徑 db ，接著輸入下列指令。

`
D:\>mkdir db

D:\db>mongod --dbpath db
`

# 設定資料庫存放位置

``` shell

PS D:\110713305\ws\code\07-mongodb\db> mkdir db  

# 預設為系統資料夾，修改為 db 資料夾
PS D:\110713305\ws\code\07-mongodb\db> mongod --dbpath db

