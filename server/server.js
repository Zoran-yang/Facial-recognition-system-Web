import express from "express"
import cors from "cors"
import knex from 'knex'
import bcrypt from "bcrypt-nodejs"
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


const users = [
  {
    id : "0",
    name : "Jack",
    email : "Jack@gmail",
    password : "z",
    uploadTime : 0,
    registerTime : new Date()
  },
  {
    id : "1",
    name : "Tom",
    email : "Tom@gmail",
    password : "Tom123",
    uploadTime : 0,
    registerTime : new Date()
  }
] 



//監聽使用者需求
app.listen(3000, () => {
  console.log(`Server is working!!!!!!!!!`)
})

//解析使用者需求
app.use(express.json())
// 跨網域需求(讓撰寫者可以在瀏覽器上測試全端專案)
app.use(cors())

app.get("", (req, res) =>{
  res.send(users);
})


//使用者行為 : signin || 對應網路行為 : get || 結果 : 顯示成功或失敗
app.post('/signin', (req, res) => {
  const {email, password} = req.body
  // if (req.body.email === users[0].email && req.body.password === users[0].password){
  //   res.json(users[0]);
  // }else{
  //   res.json("Fail to sign in")
  // }
  db("login").select("*").where("email",email).then((data) => {
    if (bcrypt.compareSync(password, data[0].hash)){
      return db("login").select("*").where("email",email).then((loginUser)=>{
                  res.json(loginUser[0]);
                })
    }else{
      res.status(400).json("wrong login Info")
    }
  }).catch((err)=>{
    console.log(err)
    res.status(400).json("system error")
  })
})


//使用者行為 : Register || 對應網路行為 : post || 結果 : 傳輸user資料
app.post("/register", (req, res) => {
  const {name, email, password} = req.body
  const hash = bcrypt.hashSync(password);
  db.transaction(function(trx){
    return trx.insert({
      email : email,
      hash : hash
    })
    .into("login")
    .then(() => {
      return trx("userinfo").returning("*").insert(
        {
          name : name,
          email: email,
          jointime: new Date()
        }
      )
    })
  })
  .then((user) =>{
      res.json(user);
    }
  )
  .catch((err) => {
    console.log(err)
    res.status(400).json("Register failed")
  })
})

//使用者行為 : get users's own page || 對應網路行為 : get || 結果 : 返回user資料
app.get("/profile/:id", (req, res) => {
  const {id} = req.params
  db("userinfo").returning("*").where('id', id)
    .then((data) => {
        if(data.length){
          res.json(data[0])
        }
        else{
          res.status(400).json("wrong id")
        }
      }
    ).catch((err)=>{
        console.log(err)
        res.status(400).json("system error")
      }
    )
})




//使用者行為 : update 辨識圖片同時在database中更新辨識圖片的次數 || 對應網路行為 : put || 結果 : 更新使用者辨識圖片的次數
app.put("/image", (req, res) => {
  const {id} = req.body
  db("userinfo").where('id', '=', id).increment("entries",1).returning("*").then((data) => {
      if(data.length){
        res.json(data[0])
      }
      else{
        res.status(400).json("wrong id")
      }
    }).catch((err)=>{
        console.log(err)
        res.status(400).json("system error")
      }
    )
})








