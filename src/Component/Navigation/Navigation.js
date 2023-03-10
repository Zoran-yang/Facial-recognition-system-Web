

import "tachyons"

function Navigation({OnSignOut}){
    return(
        <div className="flex items-center justify-end pa2">
            <a href="#0" className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4" onClick={OnSignOut}>
                <span className="pl1" >Sign Out</span>
            </a>
        </div>
    )
}


export default Navigation