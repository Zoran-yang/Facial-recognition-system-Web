import express from "express"
const app = express();


const user = [
  {
    id : 0,
    name : "Jack",
    email : "Jack@gmail",
    password : "Jack123",
    uploadTime : 0,
    registerTime : new Date()
  },
  {
    id : 1,
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

app.get("", (req, res) =>{
  console.log("Connected")
})


//使用者行為 : signin || 對應網路行為 : get || 結果 : 顯示成功或失敗
app.post('/signIn', (req, res) => {
  if (req.body.email === user[0].email && req.body.password === user[0].password){
    res.json('Welcome your web.')
  }else{
    res.json("Fail to sign in")
  }
})


//使用者行為 : Register || 對應網路行為 : post || 結果 : 取得user資料
app.post("/", (req, res) => {
  if (req.body.email !== user[0].email && req.body.password !== user[0].password){
    res.send('Work Done.')
  }else{
    res.send("error")
  }
})

