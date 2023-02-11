
const USER_ID = '1tkesfpq048n';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '711fade4e94b41baa2256fab4217ea64';
const APP_ID = 'Face-recognition';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'f76196b43bbd45c99b4f3cd8e8b40a8a';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    

// // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// // this will default to the latest version_id

const getImageAPI = (req, res)=> {
    const {IMAGE_URL} = req.body
    const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

    const stub = ClarifaiStub.grpc();

    // This will be used by every Clarifai endpoint call
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + PAT);

    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            model_id: MODEL_ID,
            version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
            inputs: [
                { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }

            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
            }
            res.json(response.outputs[0].data.regions[0].region_info.bounding_box)
        }
    )
}



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

  module.exports = {handleImage, getImageAPI}