
import UrlInput from "../UrlInput/UrlInput"


function UrlSubmitForm({onInputChange, onPictureSubmit}){
    return(
        <div> 
            <div className="flex items-center justify-center">
                <p className="mb1 lh-title">You must try this App.</p>
            </div>
            <UrlInput onInputChange= {onInputChange} onPictureSubmit={onPictureSubmit}/>
        </div>
    )
}

export default UrlSubmitForm