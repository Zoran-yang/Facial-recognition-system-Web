import Logo from "../../Component/Logo/Logo"
import SignIn from "../../Component/SignIn/SignIn"
import UrlSubmitForm from "../../Component/UrlSubmitForm/UrlSubmitForm"
import Footer from "../../Component/Footer/Footer"
import Rank from "../../Component/Rank/Rank"
import Register from "../../Component/Register/Register"
import Navigation from "../../Component/Navigation/Navigation"
import FaceRecognition from "../../Component/FaceRecognition/FaceRecognition"
import ParticlesBg from 'particles-bg'
import './App.css';
import { Component } from "react"




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


const originalState = {
  inputUrl : "" ,
  imgUrl : "" , 
  border : {},
  SignIn : false,
  Register : false,
  userInfo : {
    id : "",
    name : "",
    email : "",
    entries : "",
    registerTime : "",
  }
}



class App extends Component{
  constructor(){
    super()
    this.state = originalState
  }

  loadUser = (data) => {
    const {id , name, email, entries, registerTime} = data
    this.setState({userInfo : {
        id : id,
        name : name,
        email : email,
        entries : entries,
        registerTime : registerTime,
      }
    })
  }

  onInputChange = (e) => {
    this.setState({inputUrl : e.target.value})
  }

  onPictureSubmit = async () => {
    this.setState({imgUrl: this.state.inputUrl})
    console.log(originalState)

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

    await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => this.showFaceBorder(result))
        .then(result => this.setState({border : result}))
        .catch(error => console.log('error', error))

    await fetch("http://localhost:3000/image",
      {
        method: 'PUT', 
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify(
            {
                "id" : this.state.userInfo.id,
            }
        )
      }
    ).then((res) => res.json())
    .then((data) =>{
        if (data){
          this.setState(Object.assign(this.state.userInfo,data))
        }
      }
    ).catch(console.log)
  }

  showFaceBorder = (y) => {
    const img = document.querySelector("#img")
    if (img){
      let x = y.outputs[0].data.regions[0].region_info.bounding_box

      return {
        top_row : x.top_row*img.clientHeight,
        bottom_row : (1-x.bottom_row)*img.clientHeight,
        left_col : x.left_col*img.clientWidth,
        right_col : (1-x.right_col)*img.clientWidth,
      }
    }
  }

  OnSignIn = () =>{
    this.setState({SignIn : true})
  }

  OnSignOut = () =>{
    this.setState(originalState)
  }

  OnRegister = () =>{
    this.setState({Register : true})
  }

  submitRegister = () =>{
    this.setState({Register : false})
    this.setState({SignIn : true})
  }

  render(){
    return (
    <>
    <ParticlesBg type="cobweb" bg={true} />
    {!this.state.SignIn
      ? ( !this.state.Register
          ? (
            (
              <>
              <Logo />
              <SignIn loadUser ={this.loadUser} OnSignIn = {this.OnSignIn} OnRegister={this.OnRegister}/>
              </>
            )
          )
          : (
            <>
            
            <Logo />
            <Register loadUser ={this.loadUser} submitRegister = {this.submitRegister}/>
            </>
          )
      )
      : 
      (
        (
          <>
          <Navigation OnSignOut={this.OnSignOut}/>
          <Logo />
          <Rank userName = {this.state.userInfo.name} userEntries = {this.state.userInfo.entries}/>
          <UrlSubmitForm onInputChange = {this.onInputChange} onPictureSubmit = {this.onPictureSubmit} />
          <FaceRecognition imgUrl={this.state.imgUrl}  border={this.state.border}/>
          <Footer />
        </>
        )
      )
    }
    </>
    )
    }
  
}


export default App;
