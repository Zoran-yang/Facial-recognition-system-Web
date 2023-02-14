const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const handleRegister = require("./controller/register.js")
const handleSignin = require("./controller/signin.js")
const handleProfile = require("./controller/profile.js")
const handleImage = require("./controller/Image.js")
const path = require('path');

const app = express();

const db = knex({
  client: 'pg',
  connection: {
    connectionString: "//dzfbmjksdibueh:937c269a2c991c55d7a3ed79ca01667bff4b349f233422b0af4c297db50abbb8@ec2-3-230-122-20.compute-1.amazonaws.com:5432/d23e3k13npt2q1",
    ssl: {
      rejectUnauthorized: false
    }
  }
});

//監聽使用者需求
let PORT = process.env.PORT;
if (PORT == null || PORT === "") {
  PORT = 8000;
}

app.listen(PORT, () => {
  console.log(`Server is working!!!!!!!!!`)
})

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//解析使用者需求
app.use(express.json());
// 跨網域需求(讓撰寫者可以在瀏覽器上測試全端專案)
app.use(cors());

app.get('/ping', function (req, res) {
  return res.send('pong');
 });

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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






