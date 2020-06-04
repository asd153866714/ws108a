# 利用 Amazon Lightsail 架站

## 建立執行個體

位置選擇亞洲區的日本

作業系統 CentOS

轉成固定 ip

下載對應金鑰並轉換

## Linux 處理

用瀏覽器 SSH 連接，或用 putty 金鑰遠端登入(username 預設為 centos)

`sudo su` 切換到 root 並修改密碼

`useradd xing` 建立一個新的使用者 xing 

修改配置檔讓 ssh 可以用密碼驗證登入，參考 -- https://www.cnblogs.com/jasonxiaoqinde/p/7695171.html

用 WinSCP 登入來傳送檔案到 xing 家目錄下

## 設置 Node.js 環境

* Node.js 
* pm2 
* nginx 反向代理取得 ssl 憑證
* 參考 -- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-centos-7

