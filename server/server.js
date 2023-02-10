import express from "express"
import cors from "cors"
import knex from 'knex'
import bcrypt from "bcrypt-nodejs"
import {handleRegister} from "./controller/register.js"
import {handleSignin} from "./controller/signin.js"
import {handleProfile} from "./controller/profile.js"
import {handleImage} from "./controller/Image.js"
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
app.listen(3000, () => {
  console.log(`Server is working!!!!!!!!!`)
})

//解析使用者需求
app.use(express.json());
// 跨網域需求(讓撰寫者可以在瀏覽器上測試全端專案)
app.use(cors());


//使用者行為 : signin || 對應網路行為 : get || 結果 : 顯示成功或失敗
app.post('/signin', (req, res) => {handleSignin(req, res, bcrypt, db)});

//使用者行為 : Register || 對應網路行為 : post || 結果 : 傳輸user資料
app.post("/register", (req, res) => {handleRegister(req, res, bcrypt, db)});

//使用者行為 : get users's own page || 對應網路行為 : get || 結果 : 返回user資料
app.get("/profile/:id", (req, res) => {handleProfile(req, res, db)});

//使用者行為 : update 辨識圖片同時在database中更新辨識圖片的次數 || 對應網路行為 : put || 結果 : 更新使用者辨識圖片的次數
app.put("/image", (req, res) => {handleImage(req, res, db)});








