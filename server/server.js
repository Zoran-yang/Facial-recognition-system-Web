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


//監聽使用者需求
app.listen(3000, () => {
  console.log(`Server is working!!!!!!!!!`)
})

//解析使用者需求
app.use(express.json())
// 跨網域需求(讓撰寫者可以在瀏覽器上測試全端專案)
app.use(cors())


//使用者行為 : signin || 對應網路行為 : get || 結果 : 顯示成功或失敗
app.post('/signin', (req, res) => {
  const {email, password} = req.body
  db("login").select("*").where("email",email).then((data) => {
    const isVaild = bcrypt.compareSync(password, data[0].hash)
    if (isVaild){
      return db("userinfo").select("*").where("email",email).then((loginUser)=>{
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








