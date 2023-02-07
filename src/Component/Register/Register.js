import { Component } from "react"

class Register extends Component{
    constructor(){
        super()
        this.state = {
            name : "",
            email: "",
            password: "",
        }
    }


    onNameChange = (e) => {
        this.setState({name : e.target.value} )
    }

    onEmailChange = (e) => {
        this.setState({email : e.target.value} )
    }

    onPasswordChange = (e) => {
        this.setState({password : e.target.value} )
    }

    onSumbitRigister = () => {
        fetch("http://localhost:3000/register", 
            {
                method: 'POST', 
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify(
                    {
                        "name" : this.state.name,
                        "email" : this.state.email,
                        "password" : this.state.password
                    }
                )
            }
        )
        .then((res) => res.json())
        .then((data) =>{
                if (data[0].name){ //檢查回傳資料非"Register failed"
                    this.props.submitRegister()
                    this.props.loadUser(data[0])
                }else{
                    console.log(data)

                }
            }
        ).catch((err)=>{
            console.log(err)
            console.log("Register error")
        })
    }


    render(){
        return(
            <div className="flex justify-center content-center flex-wrap ma3" >
                <article className="flex justify-center content-center flex-wrap pa4 black-80 shadow-5 br3" style={{backgroundColor : "rgba(255, 255, 255, 0.8)"}}>
                    <div action="sign-up_submit" method="get" >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="ph0 mh0 fw6">Register</legend>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="email-address">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent w-100 measure" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent w-100 measure" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="mt3">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                                type="submit" 
                                value="Submit" 
                                onClick={this.onSumbitRigister}
                            />
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}



export default Register