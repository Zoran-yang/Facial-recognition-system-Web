
import SumbitButtom from "../SumbitButtom/SumbitButtom"
import "./UrlInput.css"

function UrlForm(){
    return(
        <div className="flex items-center justify-center">
            <div className="flex items-center justify-center shadow-5 pa3 br3 formBackground" >       
                <form className=" black-80">
                    <div className="measure">
                        <input id="name" className="input-reset ba b--black-20 pa2" type="text" placeholder="Your Picture Url"/>
                    </div>
                </form>
                <SumbitButtom />
            </div>
            
        </div>

        
    )
}


export default UrlForm