import LogoIcon from "./digital-icon.png"
import Tilt from 'react-parallax-tilt';
import "./Logo.css"

function Logo(){
    return(
        
        <Tilt className="h3 w3">
            <div className="logoBackground h3 w3 ml4" >
                <img  src={LogoIcon} className="h3 w3 shadow-5" alt="Logo"/>
            </div>
        </Tilt>
    )
}


export default Logo