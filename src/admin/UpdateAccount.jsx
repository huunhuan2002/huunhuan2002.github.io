import React, { Component } from 'react';
import { BrowserRouter, Route, Link,Redirect } from 'react-router-dom';
class UpdateAccount extends Component {
    constructor(props){
        super(props);
        this.state={
            items: [{}],
            accountType: [{}]
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    fecthAPI = (id)=>{
        fetch(`https://backend-newaaaaa.herokuapp.com/api/admin/findByAccount/${id}`)                                                                                                              
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                items: result
              });
            },
    
            (error) => {
              this.setState({
                error
              });
            }
          );
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        fetch(`https://backend-newaaaaa.herokuapp.com/api/admin/UpdateAccount/${this.props.match.params.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TenHienThi: this.refs.TenHienThi.value,
                MaLoaiTaiKhoan: this.refs.MaLoaiTaiKhoan.value,
                DienThoai: this.refs.DienThoai.value,
                DiaChi: this.refs.DiaChi.value,
                Email: this.refs.Email.value
            })
            })
            .then(
               (result)=>{
                  this.setState({
                      redirect: true
                  })
                  
               },
               (error)=>{
                    console.log(error);
               }
            )
    }
    componentDidMount(){
        this.fecthAPI(this.props.match.params.id)
        this.getAccountType()
    }
    getAccountType = ()=>{
        fetch(`https://backend-newaaaaa.herokuapp.com/api/admin/getAccountType`)                                                                                                              
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
                accountType: result
            });
          },
  
          (error) => {
            this.setState({
              error
            });
          }
        );
      }
      handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        const temp= this.state.items.slice()
        temp[0][name] = value
        this.setState({
            items: temp
        })
    }
    render() {
        if(this.state.redirect)
        {
            return <Redirect to = '/admin/ListAccount' />
        }
        const options = this.state.accountType.map((value, index) => {
            const id = value.MaLoaiTaiKhoan;
            const ten = value.TenLoaiTaiKhoan;
			return (
                <option  value={id}    key={"key_"+id} >
                    {ten}
                </option>
			);
        });
        return (
            <div className="w100p well">
                <form className="w60p center-block" onSubmit={this.handleSubmit}>
                    <h2 className="page-header text-center">Cập Nhật Tài Khoản #{this.props.match.params.id}</h2>
                    <p>Họ tên: <input name="TenHienThi" onChange={this.handleInput} ref="TenHienThi" value={this.state.items[0].TenHienThi} className="form-control" type="text"></input></p>
                    <p>Loại tài khoản:
                    <select  className="form-control" onChange={this.handleInput} name="MaLoaiTaiKhoan" ref="MaLoaiTaiKhoan" value={this.state.items[0].MaLoaiTaiKhoan}>
                            <option value="" className="hidden">-- Chọn loại tài khoản --</option>
                            {options}
                    </select>
                    </p>	 	
                    <p>Điện thoại: <input name="DienThoai" onChange={this.handleInput} ref="DienThoai" value={this.state.items[0].DienThoai} className="form-control" type="text"></input></p>
                    <p>Địa chỉ: <input ref="DiaChi" name="DiaChi" onChange={this.handleInput} value={this.state.items[0].DiaChi} className="form-control" type="text"></input></p>
                    <p>Email: <input ref="Email" name="Email" onChange={this.handleInput} value={this.state.items[0].Email} className="form-control" type="email"></input></p>
                    <p><button type="submit" className="btn btn-primary center-block">Cập Nhật</button></p>
                </form>
            </div>
        );
    }
}

export default UpdateAccount;