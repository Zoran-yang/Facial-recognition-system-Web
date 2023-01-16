import "tachyons"

function SignIn({OnSignIn, OnRegister}){
    return(
        
        <main className="flex justify-center content-center flex-wrap ma5">
            <div className=" measure pa4 black-80 shadow-5 br3" style={{backgroundColor : "rgba(255, 255, 255, 0.8)"}}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                </fieldset>
                <div>
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign in" onClick={OnSignIn}/>
                </div>
                <div className="lh-copy mt3">
                    <a href="#0" className="f6 link dim black db" onClick={OnRegister}>Sign up</a>
                    {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                </div>
            </div>
        </main>
        
    )
}


export default SignIn