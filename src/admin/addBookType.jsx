import React, { Component } from 'react';
import { BrowserRouter, Route, Link,Redirect } from 'react-router-dom';
class addBookType extends Component {
    constructor(props){
        super(props)
        this.state ={
            items: [{}]
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleSubmit = (e)=>{
        e.preventDefault()
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/addBookType`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TenLoaiSanPham: this.refs.TenLoaiSanPham.value,
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
    handleInput = (e)=>{
        const temp= this.state.items.slice()
        temp[0].TenLoaiSanPham = e.target.value
        this.setState({
            items: temp
        })
    }
    render() {
        if(this.state.redirect)
        {
            return <Redirect to = '/admin/ListBookType' />
        }
        return (
           <div className="panel">
            <h2 className="page-header text-center">Thêm loại sách</h2>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}  className="frmEdit w40p center-block">
                    Tên Loại: 
                        <input onChange={this.handleInput} type="text" className="form-control" autoFocus="true" ref="TenLoaiSanPham"></input>
                        <br></br>
                        <button type="submit" className="btn btn-primary center-block">Lưu</button>
                </form>
            </div>
        </div>
        );
    }
}

export default addBookType;