import "./FaceRecognition.css"


function FaceRecognition({imgUrl, border}){
    return(
        <div className="center ma2 container" style={{width : "500px" , height : "auto"}}> 
            <img id="img" src={imgUrl} alt=""/>
            <div className="faceBorder" style={{top: border.top_row, left: border.left_col, bottom: border.bottom_row , right: border.right_col}}></div>
        </div>
    )
}

export default FaceRecognition