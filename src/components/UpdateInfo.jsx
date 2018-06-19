import React, { Component } from 'react';
import { BrowserRouter, Route, Link,Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
class UpdateInfor extends Component {
    constructor(props){
        super(props);
        let token = localStorage.getItem('token');
        let user = jwtDecode(token);
        this.state={
            items: [{}],
            accountType: [{}],
            id: user.MaTaiKhoan
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
        fetch(`https://backend-newaaaaa.herokuapp.com/api/UpdateInfor/${this.state.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TenHienThi: this.refs.TenHienThi.value,
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
        this.fecthAPI(this.state.id)
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
            return(<div className='alert alert-success'>Cập nhật thông tin thành công</div>)
        }
        return (
            <div className="w100p well">
                <form className="w60p center-block" onSubmit={this.handleSubmit}>
                    <h2 className="page-header text-center">Cập nhật thông tin</h2>
                    <p>Họ tên: <input name="TenHienThi" onChange={this.handleInput} ref="TenHienThi" value={this.state.items[0].TenHienThi} className="form-control" type="text"></input></p>	 	
                    <p>Điện thoại: <input name="DienThoai" onChange={this.handleInput} ref="DienThoai" value={this.state.items[0].DienThoai} className="form-control" type="text"></input></p>
                    <p>Địa chỉ: <input ref="DiaChi" name="DiaChi" onChange={this.handleInput} value={this.state.items[0].DiaChi} className="form-control" type="text"></input></p>
                    <p>Email: <input ref="Email" name="Email" onChange={this.handleInput} value={this.state.items[0].Email} className="form-control" type="email"></input></p>
                    <p><button type="submit" className="btn btn-primary center-block">Cập Nhật</button></p>
                </form>
            </div>
        );
    }
}

export default UpdateInfor;