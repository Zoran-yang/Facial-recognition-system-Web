
function Rank({userName, userUploadTime}){
    return(
        <div className="tc f4">
            <p>{`Hi ${userName} , Your current entry count is ...`}</p>
            <p>{userUploadTime}</p>
        </div>
    )
}


export default Rank