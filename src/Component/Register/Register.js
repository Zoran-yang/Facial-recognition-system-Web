

function Register({submitRegister}){
    return(
        <div className="flex justify-center content-center flex-wrap ma3" >
            <article className="flex justify-center content-center flex-wrap pa4 black-80 shadow-5 br3" style={{backgroundColor : "rgba(255, 255, 255, 0.8)"}}>
                <div action="sign-up_submit" method="get" >
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6">Register</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Name</label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="name"  id="name"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div className="mt3"><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Submit" onClick={submitRegister}/></div>
                </div>
            </article>
        </div>
    )
}


export default Register