import React from "react";
import AccountInfo from "./AccountInfo"
class TopBar extends React.Component{
    render()
    {
        return(
            <div className="container" id="topBar">
                <div className="navbar navbar-inverse">
                    <AccountInfo />
                </div>
            </div>
        )
    }
}
export default TopBar;