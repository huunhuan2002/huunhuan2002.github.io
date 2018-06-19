import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MatKhauCu: '',
            MatKhauMoi: '',
            NhapLaiMatKhau: '',
            formValid: true
        };
        this.handleUserInput = this.handleUserInput.bind(this)
    }
    handleUserInput=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    KiemTraThongTin =()=>{
        let token = localStorage.getItem('token');
        let user = jwtDecode(token);
        let pass = user.MatKhau
        let check = 1
         if(this.state.MatKhauCu != pass)
        {
            check = 0
            this.setState({
                oldpassEr: true,
                formValid: false
            })
        }
        else{
            this.setState({
                oldpassEr: false
            })
        }
        if(this.state.MatKhauMoi.length < 8)
        {
            check = 0
            this.setState({
                newpassEr: true,
                formValid: false
            })
        }
        else{
            this.setState({
                newpassEr: false
            })
        }
        if(this.state.NhapLaiMatKhau != this.state.MatKhauMoi)
        {
            check = 0
            this.setState({
                rpassEr:true,
                formValid: false
            })
        }
        else{
            this.setState({
                rpassEr:false
            })
        }
        if(check == 1)
        {
            this.setState({
                formValid: true
            })
        }
        return check
    }
    onSubmit = ()=>{
        let token = localStorage.getItem('token');
        let user = jwtDecode(token);
        let id = user.MaTaiKhoan;
        if(this.KiemTraThongTin())
        {
            fetch("https://backend-newaaaaa.herokuapp.com/api/changePassword", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            MatKhau: this.state.MatKhauMoi,
                            MaTaiKhoan: id
                        })
                        })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                this.setState({
                                    Result: result.affectedRows
                                });
                            },
        
                            (error) => {
                                this.setState({
                                    error
                                });
                            }
                        );
        }
    }
    render() {
        let usernameMS = this.state.oldpassEr?(<li>Mật khẩu cũ không đúng</li>):null
        let usernamecheckMS = this.state.newpassEr?(<li>Mật khẩu mới phải 8 kí tự trở lên</li>):null
        let passMS = this.state.rpassEr?(<li>Nhập lại mật khẩu không đúng</li>):null
        let errorAlert=this.state.formValid == false?(<div className="alert alert-danger">
            <ul>
                {usernameMS}
                {usernamecheckMS}
                {passMS}
            </ul>
        </div>):null
        if(this.state.Result == 1)
            {
                return(<div className='alert alert-success'>Đổi mật khẩu thành công</div>)
            }
        if (localStorage.getItem('token') != '' && localStorage.getItem('token')) {
            return(
                <div className="w100p well">
                    {errorAlert}
                    <form className="w60p center-block">
                        <h2 className="page-header text-center">Đổi mật khẩu</h2>
                        <p>Mật khẩu cũ:  <input className="form-control" type="password" name="MatKhauCu" value={this.state.MatKhauCu} onChange={this.handleUserInput} ></input></p>
                        <p>Mật khẩu mới:  <input className="form-control" type="password"  name="MatKhauMoi" value={this.state.MatKhauMoi} onChange={this.handleUserInput} ></input></p>
                        <p>Nhập lại mật khẩu:  <input className="form-control" type="password" id="NhapLaiMatKhau" name="NhapLaiMatKhau" value={this.state.NhapLaiMatKhau} onChange={this.handleUserInput} ></input></p>
                        <p><button type='button' className="btn btn-primary center-block" onClick={this.onSubmit}>Cập nhật</button></p>
                    </form>
                </div>
            )
        }
        return (
            <Redirect to='/' />
        );
    }
}

export default ChangePassword;