import LogoIcon from "./digital-icon.png"
import Tilt from 'react-parallax-tilt';
import "./Logo.css"

function Logo(){
    return(
        
        <Tilt className="h4 w4 ma3">
            <div className="logoBackground h4 w4 ml3" >
                <img  src={LogoIcon} className="h4 w4 shadow-5" alt="Logo"/>
            </div>
        </Tilt>
    )
}


export default Logo