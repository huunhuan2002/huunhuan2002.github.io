import React from "react";
import jwtDecode from 'jwt-decode';
import { Link, Redirect } from 'react-router-dom';

class InfoAccount extends React.Component {
    DangXuatHandle = () => {
        localStorage.removeItem('token');
    }

    render() {
        let token = localStorage.getItem('token');
        let user = jwtDecode(token);
        let TenHienThi = user.TenHienThi;
        let loaiTK = user.MaLoaiTaiKhoan;
        let ad = loaiTK == 2 ? (<li><Link to="/admin"><i className="glyphicon glyphicon-user"></i>  Trang quản lý</Link></li>) : (null);
        
        return (
                <div className="container" id="topBar">
                    <div className="navbar navbar-inverse">
                        <ul className="nav pull-right">
                            <li className="dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">Xin chào, {TenHienThi} <b className="caret"></b></a>
                                <ul className="dropdown-menu">
                                    {ad}
                                    <li><Link to="/UpdateInfor"><i className="glyphicon glyphicon-pencil"></i> Cập nhật thông tin</Link></li>
                                    <li><Link to="/ChangePassword"><i className="glyphicon glyphicon-lock"></i> Đổi mật khẩu</Link></li>
                                    <li className="divider"></li>
                                    <li><a href="#" onClick={this.DangXuatHandle}><i className="glyphicon glyphicon-off"></i> Đăng xuất</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
        );
    }
}

export default InfoAccount;