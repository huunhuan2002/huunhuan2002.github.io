import React, { Component } from 'react';
import queryString from 'query-string';
import jwtDecode from "jwt-decode";
import { BrowserRouter, Route, Link } from 'react-router-dom';
class ListAccount extends Component {
    constructor(props){
        super(props);
        this.state={
            itemsListAccount: [{}]
        }
    }
    componentDidMount(){
     this.fecthAPI()
    }
    fecthAPI =()=>{
        let username = ""
        if(typeof(queryString.parse(this.props.location.search).username) != "undefined")
        {
            username = queryString.parse(this.props.location.search).username
        }
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/ListAccount?username=${username}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            itemsListAccount: result
          });
        },

        (error) => {
          this.setState({
            error
          });
        }
      );
    }
    handleDelete = (id)=>{
        let token = localStorage.getItem('token');
        let user = jwtDecode(token);
        let TenDangNhap=user.TenDangNhap;
        if(TenDangNhap == id[2])
        {
            alert("không được xóa tài khoản hiện tại ")
        }
        else{
            fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/UpdateAccount/${id[0]}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    BiXoa: !id[1],
                })
                })
                .then(
                   (result)=>{
                      this.fecthAPI()
                      
                   },
                   (error)=>{
                        console.log(error);
                   }
                )
        }
        
    }
    render() {
        const items = this.state.itemsListAccount.map((value, index) => {
            var icon = new String("glyphicon glyphicon-")
            if(value.BiXoa == 1)
            {
                icon = icon+"ok";
            }
            else
                icon = icon +"remove"
            const MaTaiKhoan = value.MaTaiKhoan
            const TenDangNhap = value.TenDangNhap
            const TenHienThi = value.TenHienThi
            const DienThoai = value.DienThoai
            const DiaChi = value.DiaChi
            const Email = value.Email
            const BiXoa = value.BiXoa
            const TenLoaiTaiKhoan = value.TenLoaiTaiKhoan
            return (
                <tr key={"key_"+MaTaiKhoan}>
                    <td>{MaTaiKhoan}</td>
                    <td>{TenDangNhap}</td>
                    <td>{TenLoaiTaiKhoan}</td>
                    <td>{TenHienThi}</td>
                    <td>{DienThoai}</td>
                    <td>{DiaChi}</td>
                    <td>{Email}</td>
                    <td>
                        <Link to={`/admin/UpdateAccount/${MaTaiKhoan}`}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </Link>
                    </td>
                    <td>
                        <a href="#" onClick={this.handleDelete.bind(this,[MaTaiKhoan,BiXoa,TenDangNhap])}>
                            <span className={icon}></span>
                        </a>
                    </td>
                </tr>
            );
		});
        return (
            <div>
                <form  className="navbar-form pull-right" id="searchBox">
                    <div className="input-group">
                        <input type="text" name="username" className="form-control" placeholder="Tên đăng nhập"  ></input>
                    </div>
                    <button type="submit" className="btn"><span className="glyphicon glyphicon-search"></span></button>
                </form>
                <table className="table table-striped" id="orderList">
                    <thead>
                        <tr className="nb active">
                            <td>Mã</td>
                            <td>Tên Đăng Nhập</td>
                            <td>Loại Tài Khoản</td>
                            <td>Tên Hiển Thị</td>
                            <td>Điện Thoại</td>
                            <td>Địa Chỉ</td>
                            <td colSpan="3">Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListAccount;