
function Rank({userName, userEntries}){
    return(
        <div className="tc f4">
            <p>{`Hi ${userName} , Your current entry count is ...`}</p>
            <p>{userEntries}</p>
        </div>
    )
}


export default Rank