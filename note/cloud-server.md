# 利用 Amazon Lightsail 架站

* 基本流程 : 

            1. 取得雲端主機並架站

            2. 申請 domain name 對應到 ip  

            3. 取得 SSl 憑證
            

## 建立執行個體

位置選擇亞洲區的日本

作業系統 CentOS

轉成固定 ip

下載對應金鑰並轉換

## 申請 Domain name

免費 : NCTU Domain, 

付費 : gandi, godaddy

設定對應到自己的 ip 

## Linux 處理

用瀏覽器 SSH 連接，或用 putty 金鑰遠端登入(username 預設為 centos)

`sudo su` 切換到 root 並修改密碼

`useradd xing` 建立一個新的使用者 xing 

修改配置檔讓 ssh 可以用密碼驗證登入

參考 -- https://www.cnblogs.com/jasonxiaoqinde/p/7695171.html

用 WinSCP 登入來傳送檔案到 xing 家目錄下

## 設置 Node.js 架站

* Node.js 
* pm2 
* nginx 反向代理取得 ssl 憑證

參考 -- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-centos-7

### 防火牆設置

參考--https://blog.gtwang.org/linux/centos-7-firewalld-command-setup-tutorial/2/

開啟 80 port 並設為 perminent 避免重新啟動後跑掉

### Mongodb 安裝

參考 -- https://tecadmin.net/install-mongodb-on-centos/

啟動時注意檔案的權限問題

資料庫匯入與匯出，mongodump, mongorestore

參考 -- https://www.runoob.com/mongodb/mongodb-mongodump-mongorestore.html

### Apache httpd

一開始以為要放在預設目錄下能跑網頁，就把網站目錄連結到預設目錄下，然後一直卡在權限問題，開啟了 /home 711 之後才發現搞錯了

httpd 是一個網頁伺服器軟體，以類似靜態網頁的方式，呈現預設路徑下的檔案，開啟了 /home 權限後，完全暴露了家目錄的檔案

關掉 httpd 服務後，清空 80 port，執行 app.js 監聽 0.0.0.0:80 就能成功了

