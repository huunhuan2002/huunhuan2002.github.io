import React, { Component } from 'react';
import { BrowserRouter, Route, Link,Redirect } from 'react-router-dom';
class addPublisher extends Component {
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
        fetch(`https://backend-newaaaaa.herokuapp.com/api/admin/addPublisher/`, {
            method: 'POSt',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TenHangSanXuat: this.refs.TenNXB.value,
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
        temp[0].TenHangSanXuat = e.target.value
        this.setState({
            items: temp
        })
    }
    render() {
        if(this.state.redirect)
        {
            return <Redirect to = '/admin/ListPublisher' />
        }
        return (
            <div className="panel">
                <h2 className="page-header text-center">Thêm NXB</h2>
                <div className="panel-body">
                    <form onSubmit={this.handleSubmit} className="frmEdit w40p center-block">
                        Tên NXB: 
                            <input onChange={this.handleInput} type="text" className="form-control" autoFocus ="true" ref="TenNXB"></input>
                            <br></br>
                            <button type="submit" className="btn btn-primary center-block">Lưu</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default addPublisher;