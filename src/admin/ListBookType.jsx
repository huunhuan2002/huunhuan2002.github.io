import React, { Component } from 'react';
import queryString from 'query-string';
import { BrowserRouter, Route, Link } from 'react-router-dom';
class ListBookType extends Component {
    constructor(props){
        super(props);
        this.state={
            itemsListBookType: [{}]
        }
    }
    handleDelele =(id)=>{
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/UpdateBookType/${id[0]}`, {
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
    fecthAPI = ()=>{
        let booktypename = ""
        if(typeof(queryString.parse(this.props.location.search).booktypename) != "undefined")
        {
            booktypename = queryString.parse(this.props.location.search).booktypename
        }
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/ListBookType?booktypename=${booktypename}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            itemsListBookType: result
          });
        },

        (error) => {
          this.setState({
            error
          });
        }
      );
    }
    componentDidMount(){
        this.fecthAPI()
    }
    render() {
        const items = this.state.itemsListBookType.map((value, index) => {
            var icon = new String("glyphicon glyphicon-")
            if(value.BiXoa == 1)
            {
                icon = icon+"ok";
            }
            else
                icon = icon +"remove"
			return (
                 <tr key={"key_"+value.MaLoaiSanPham}>
                    <td>{value.MaLoaiSanPham}</td>
                    <td>{value.TenLoaiSanPham}</td>
                    <td>
                        <Link to={`/admin/UpdateBookType/${value.MaLoaiSanPham}`}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </Link>

                    </td>
                    <td>
                        <a href="#" onClick={this.handleDelele.bind(this,[value.MaLoaiSanPham,value.BiXoa])} >
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
                        <input type="text" className="form-control" name="booktypename" placeholder="Tên loại sách"  ></input>
                    </div>
                    <button type="submit" className="btn"><span className="glyphicon glyphicon-search"></span></button>
                    <Link to="/admin/addBookType"><button type="button" className="btn" ><span className="glyphicon glyphicon-plus"></span></button></Link>
                </form>
                <table className="table table-striped" id="orderList">
                <thead>
                    <tr className="nb active">
                        <td>Mã Loại</td>
                        <td colSpan="3">Tên Loại</td>
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

export default ListBookType;