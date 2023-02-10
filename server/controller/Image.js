

const handleImage = (req, res, db) => {
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
  }

  export {handleImage}