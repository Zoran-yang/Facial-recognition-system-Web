import express from "express"
import cors from "cors"
const app = express();


const users = [
  {
    id : "0",
    name : "Jack",
    email : "Jack@gmail",
    password : "Jack123",
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
  console.log("Connected")
})


//使用者行為 : signin || 對應網路行為 : get || 結果 : 顯示成功或失敗
app.post('/signin', (req, res) => {
  if (req.body.email === users[0].email && req.body.password === users[0].password){
    res.json('Welcome to your web.')
  }else{
    res.json("Fail to sign in")
  }
})


//使用者行為 : Register || 對應網路行為 : post || 結果 : 傳輸user資料
app.post("/register", (req, res) => {
  if (req.body.email !== users[0].email && req.body.password !== users[0].password){
    res.send('Work Done.')
  }else{
    res.send("error")
  }
})

//使用者行為 : get users's own page || 對應網路行為 : get || 結果 : 返回user資料
app.get("/profile/:id", (req, res) => {
  const {id} = req.params
  let found = false
  users.forEach((user) => {
      if (user.id === id){
        found = true
        user.uploadTime++
        return res.json(user)
      }
    }
  )
  if (!found) {res.status(400).send("user not found")}
})


//使用者行為 : update 辨識圖片同時在database中更新辨識圖片的次數 || 對應網路行為 : put || 結果 : 更新使用者辨識圖片的次數
app.put("/image", (req, res) => {
  const {id} = req.params
  let found = false
  users.forEach((user) => {
      if (user.id === id){
        found = true
        return res.json(user)
      }
    }
  )
  if (!found) {res.status(400).send("user not found")}
})








