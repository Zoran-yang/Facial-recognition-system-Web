
const handleSignin = (req, res, bcrypt, db) => {
  const {email, password} = req.body
  if (!email || !password) {return res.status(400).json("blank signin info")}
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
}

module.exports = {handleSignin};