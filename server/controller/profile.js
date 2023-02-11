

const handleProfile = (req, res, db) => {
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
  }


  module.exports = {handleProfile}