import { Component } from "react"
import "tachyons"

class SignIn extends Component{
    constructor(){
        super()
        this.state = {
            signinEmail : "",
            signinPassword : ""
        }
    }

    onEmailChange = (e) => {
        this.setState({signinEmail : e.target.value} )
    }

    onPasswordChange = (e) => {
        this.setState({signinPassword : e.target.value} )
    }

    onSumbitSignIn = () => {
        fetch("https://facial-recognition-server.herokuapp.com/signin", 
            
            {
                method: 'POST', 
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify(
                    {"email" : this.state.signinEmail,
                    "password" : this.state.signinPassword}
                )
            }
        )
        .then((res) => res.json())
        .then((data) =>{
                if (data.id){
                    this.props.OnSignIn()
                    this.props.loadUser(data)
                }else{
                    console.log(data)
                }
            }
        ).catch(console.log)
    }

    render(){
        const {OnRegister} = this.props
        return(
            <main className="flex justify-center content-center flex-wrap ma2">
                <div className=" measure pa4 black-80 shadow-5 br3" style={{backgroundColor : "rgba(255, 255, 255, 0.8)"}}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                    </fieldset>
                    <div>
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                            type="submit" 
                            value="Sign in" 
                            onClick={this.onSumbitSignIn}
                            />
                    </div>
                    <div className="lh-copy mt3">
                        <p href="#0" className="f6 link dim black db pointer" onClick={OnRegister}>Register</p>
                        {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                    </div>
                </div>
            </main>    
        )
    }
}


export default SignIn