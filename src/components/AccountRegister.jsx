import React from "react";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

import ReCAPTCHA from "react-recaptcha";

class AccountRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValid: false,
            passwordValid: false,
            emailValid: false,
            formValid: true,
            TenDangNhap: '',
            MatKhau: '',
            NhapLaiMatKhau: '',
            HoTen: '',
            DiaChi: '',
            Email: '',
            DienThoai: '',
            captcha: null,
            errCaptcha: null,
        };
    }

    // TenDangNhaponChangeHandle = (e) => {
    //     this.setState({
    //         TenDangNhap: e.target.value,
    //     });
    //     this.KiemTraUsernameTonTai();
    //     if(this.state.checkUsername != 0){
    //         this.setState({formValid:false});
    //         alert('Tên đăng nhập đã tồn tại');
    //     }
    // }
    checkUsername = () => {
        return Promise.all([fetch(`https://backend-newaaaaa.herokuapp.com/api/checkUsername/${this.state.TenDangNhap}`)
            .then(res => res.json())])
    }
    KiemTraThongTin = () => {
        let check = 1
        if (this.state.TenDangNhap == "") {
            check = 0
            this.setState({
                formValid: false,
                usernameError: true
            })
        }
        else {
            this.setState({
                usernameError: false
            })
        }
        if (this.state.checkUsername != 0) {
            check = 0
            this.setState({
                formValid: false,
                usernameExist: true
            })
        }
        else {
            this.setState({
                usernameExist: false
            })
        }
        if (this.state.MatKhau.length < 8) {
            check = 0
            this.setState({
                formValid: false,
                passError: true
            })
        }
        else {
            this.setState({
                passError: false
            })
        }
        if (this.state.MatKhau != this.state.NhapLaiMatKhau) {
            check = 0
            this.setState({
                formValid: false,
                rpassError: true
            })
        }
        else {
            this.setState({
                rpassError: false
            })
        }
        if (this.state.HoTen == "") {
            check = 0
            this.setState({
                formValid: false,
                nameError: true
            })
        }
        else {
            this.setState({
                nameError: false
            })
        }

        var emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (this.state.Email.length == 0 || !emailPattern.test(this.state.Email)) {
            check = 0
            this.setState({
                formValid: false,
                emailError: true
            })
        }
        else {
            this.setState({
                emailError: false
            })
        }

        if (this.state.captcha === undefined ||
            this.state.captcha === '' ||
            this.state.captcha === null) {
            check = 0;
            this.setState({ errCaptcha: "Hãy chọn CAPTCHA" })
        }

        return check;
    }

    onClickHandle = (e) => {
        var that = this
        this.checkUsername()
            .then(([value]) => {
                this.setState({
                    checkUsername: value[0].sl
                })
                if (that.KiemTraThongTin()) {
                    fetch("https://backend-newaaaaa.herokuapp.com/api/register", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            TenDangNhap: this.state.TenDangNhap,
                            MatKhau: this.state.MatKhau,
                            TenHienThi: this.state.HoTen,
                            DiaChi: this.state.DiaChi,
                            DienThoai: this.state.DienThoai,
                            Email: this.state.Email,
                            captcha: this.state.captcha,
                        })
                    })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                // console.log(result);
                                if (result.success == false) {
                                    this.setState({ errCaptcha: result.msg });
                                }
                                else {
                                    this.setState({
                                        Result: result.data.affectedRows
                                    });
                                }
                            },

                            (error) => {
                                this.setState({
                                    error
                                });
                            }
                        );
                }
            })

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    verifyCallback = (data) => {
        this.setState({ captcha: data });
    }

    render() {
        let usernameMS = this.state.usernameError ? (<li>Tên đăng nhập không được để trống</li>) : null
        let usernamecheckMS = this.state.usernameExist ? (<li>Tên đăng nhập đã tổn tại</li>) : null
        let passMS = this.state.passError ? (<li>Độ dài mật khẩu phải 8 kí tự trở lên</li>) : null
        let rpassMS = this.state.rpassError ? (<li>Nhập lại mật khẩu không đúng</li>) : null
        let nameMS = this.state.nameError ? (<li>Họ tên không được để trống</li>) : null
        let emailMS = this.state.emailError ? (<li>Email không đúng</li>) : null
        let errCaptcha = this.state.errCaptcha;
        let errorAlert = this.state.formValid == false ? (<div className="alert alert-danger">
            <ul>
                {usernameMS}
                {usernamecheckMS}
                {passMS}
                {rpassMS}
                {nameMS}
                {emailMS}
                <li>{errCaptcha}</li>
            </ul>
        </div>) : null
        if (this.state.Result == 1) {
            return (<div className='alert alert-success'>Đăng kí tài khoản thành công</div>)
        }
        else {
            return (
                <div className="w100p well">
                    {errorAlert}
                    <form className="w60p center-block">
                        <h2 className="page-header text-center">Đăng ký tài khoản</h2>
                        <p>Tên đăng nhập:<input className="form-control" type="text" id="txtTenDangNhap" name="TenDangNhap" value={this.state.TenDangNhap} onChange={this.handleUserInput} /></p>
                        <p>Mật khẩu:  <input className="form-control" type="password" id="txtMatKhau" name="MatKhau" value={this.state.MatKhau} onChange={this.handleUserInput} ></input></p>
                        <p>Nhập lại mật khẩu:  <input className="form-control" type="password" id="NhapLaiMatKhau" name="NhapLaiMatKhau" value={this.state.NhapLaiMatKhau} onChange={this.handleUserInput} ></input></p>
                        <p>Họ tên:  <input className="form-control" type="text" id="txtHoTen" name="HoTen" value={this.state.HoTen} onChange={this.handleUserInput} ></input></p>
                        <p>Điện thoại: <input className="form-control" type="text" id="txtDienThoai" name="DienThoai" value={this.state.DienThoai} onChange={this.handleUserInput} ></input></p>
                        <p>Địa chỉ: <input className="form-control" type="text" id="txtDiaChi" name="DiaChi" value={this.state.DiaChi} onChange={this.handleUserInput} ></input></p>
                        <p>Email: <input className="form-control" type="email" id="txtEmail" name="Email" placeholder="example@gmail.com" value={this.state.Email} onChange={this.handleUserInput} ></input></p>
                        <p><ReCAPTCHA
                            ref="recaptcha"
                            sitekey="6Lcxbl8UAAAAAAey58seZQq3DAZVboYJp8RkA0L7"
                            verifyCallback={this.verifyCallback}
                        /></p>
                        <p><button type='button' className="btn btn-primary center-block" onClick={this.onClickHandle}>Đăng ký</button></p>
                    </form>
                </div>
            )
        }
    }
}
export default AccountRegister;