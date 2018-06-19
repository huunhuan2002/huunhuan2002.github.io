import React from "react";
import TopBar from "./TopBar";
import Navigation from "./Navigation";
import MainRouterAdmin from "./MainRouterAdmin";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    // AuthorizationToken = () => {
    //     fetch('https://backend-newaaaaa.herokuapp.com/secret', {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `bearer ${localStorage.getItem('token')}`,
    //         },
    //         body: {}
    //     })
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 if (result === 'success')
    //                     this.setState({
    //                         checked: true
    //                     });
    //             },

    //             (error) => {
    //                 this.setState({
    //                     checked: false
    //                 });
    //             }
    //         );
    // }

    // componentWillMount() {
    //     this.AuthorizationToken();
    // }

    render() {
        // let checked = this.state.checked;
        if (localStorage.getItem('token') != '' && localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            let users = jwtDecode(token);
            let loaiTK = users.MaLoaiTaiKhoan;
            if (loaiTK == 2) {
                return (
                    <div>
                        <TopBar />
                        <Navigation />
                        <div className="container">
                            <div className="w100p" id="page">
                                <div>
                                    <MainRouterAdmin />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return (
            <Redirect to='/' />
        )
    }
}
export default Main;