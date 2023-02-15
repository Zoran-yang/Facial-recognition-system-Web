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

  showFaceBorder = (y) => {
    const img = document.querySelector("#img")
    if (img){
        let x = y
  
        return {
            top_row : x.top_row*img.clientHeight,
            bottom_row : (1-x.bottom_row)*img.clientHeight,
            left_col : x.left_col*img.clientWidth,
            right_col : (1-x.right_col)*img.clientWidth,
        }
    }
  }

  onPictureSubmit = async () => {
    this.setState({imgUrl: this.state.inputUrl})
    let IMAGE_URL = this.state.inputUrl; 

    await fetch("https://facial-recognition-server.herokuapp.com/imageAPI",
      {
        method: 'POST', 
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify(
            {
                "IMAGE_URL" :IMAGE_URL
            }
        )
      }
    )
    .then((res) => res.json())
    .then((fetchInfo) =>{
        if (fetchInfo){
          this.setState(Object.assign(this.state.border,this.showFaceBorder(fetchInfo)))    
        }    
      }
    ).catch(console.log)


    await fetch("https://facial-recognition-server.herokuapp.com/image",
      {
        method: 'PUT', 
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify(
            {
                "id" : this.state.userInfo.id,
                "IMAGE_URL" :IMAGE_URL
            }
        )
      }
    )
    .then((res) => res.json())
    .then((fetchInfo) =>{
        if (fetchInfo){
          this.setState(Object.assign(this.state.userInfo,fetchInfo))    
        }     
      }
    ).catch(console.log)
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
