

const handleRegister = (req, res, bcrypt, db) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {return res.status(400).json("blank register info")}
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
  }

  module.exports = {handleRegister} 