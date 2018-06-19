import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

class AccountInfo extends React.Component {

    DangXuatHandle = () => {
        localStorage.removeItem('token');
    }

    render() {
        let token = localStorage.getItem('token');
        let user = jwtDecode(token);
        let TenHienThi=user.TenHienThi;
        return (
            <ul className="nav navbar-nav pull-right">
                <li><a href="#">Hello, {TenHienThi}</a></li>
                <li><Link to="/"> Trang khách hàng</Link></li>
                <li onClick={this.DangXuatHandle}><Link to="/"> Đăng xuất</Link></li>
            </ul>
        )
    }
}
export default AccountInfo;