import Logo from "../../Component/Logo/Logo"
import SignIn from "../../Component/SignIn/SignIn"
import UrlSubmitForm from "../../Component/UrlSubmitForm/UrlSubmitForm"
import Footer from "../../Component/Footer/Footer"
import Rank from "../../Component/Rank/Rank"
import FaceRecognition from "../../Component/FaceRecognition/FaceRecognition"
import ParticlesBg from 'particles-bg'
// import Clarifai from "clarifai"
import './App.css';
import { Component } from "react"


// const app = new Clarifai.App({
//   apiKey: '711fade4e94b41baa2256fab4217ea64'
//  });

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




class App extends Component{
  constructor(){
    super()
    this.state = {
      inputUrl : "" ,
      imgUrl : "" , 
    }
  }

  onInputChange = (e) => {
    console.log(e.target.value)
    this.setState({inputUrl : e.target.value})
  }

  onInputSubmission = () => {
    this.setState({imgUrl: this.state.inputUrl})

    let IMAGE_URL = this.state.inputUrl;
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }

  render(){
    return(
      <>
        <ParticlesBg type="cobweb" bg={true} />
        <SignIn />
        <Logo />
        <Rank />
        <UrlSubmitForm onInputChange = {this.onInputChange} onInputSubmission = {this.onInputSubmission} />
        <FaceRecognition imgUrl= {this.state.imgUrl} />
        <Footer />
      </>
    )
  }
}


export default App;
