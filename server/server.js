const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const handleRegister = require("./controller/register.js")
const handleSignin = require("./controller/signin.js")
const handleProfile = require("./controller/profile.js")
const handleImage = require("./controller/Image.js")

const app = express();

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'Facial-recognition-system'
  }
});

//監聽使用者需求
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 8000;
}

app.listen(PORT, () => {
  console.log(`Server is working!!!!!!!!!`)
})

//解析使用者需求
app.use(express.json());
// 跨網域需求(讓撰寫者可以在瀏覽器上測試全端專案)
app.use(cors());

//使用者行為 : signin || 對應網路行為 : get || 結果 : 顯示成功或失敗
app.post('/signin', (req, res) => {handleSignin.handleSignin(req, res, bcrypt, db)});

//使用者行為 : Register || 對應網路行為 : post || 結果 : 傳輸user資料
app.post("/register", (req, res) => {handleRegister.handleRegister(req, res, bcrypt, db)});

//使用者行為 : get users's own page || 對應網路行為 : get || 結果 : 返回user資料
app.get("/profile/:id", (req, res) => {handleProfile.handleProfile(req, res, db)});

//使用者行為 : update 辨識圖片同時在database中更新辨識圖片的次數 || 對應網路行為 : put || 結果 : 更新使用者辨識圖片的次數
app.put("/image", (req, res) => {handleImage.handleImage(req, res, db)});

//使用者行為 : 取得辨識圖片資料 || 對應網路行為 : put || 結果 : 更新使用者辨識圖片的次數
app.post("/imageAPI", (req, res) => {handleImage.getImageAPI(req, res)});






