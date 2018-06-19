import React from "react";
import SignIn from "./SignIn";
import InfoAccount from "./InfoAccount";
class TopBar extends React.Component {

    render() {
        if (localStorage.getItem('token')) {
            //let token = localStorage.getItem('token');
            return <InfoAccount />
        }
        return (
            <SignIn />
        )
    }
}
export default TopBar;