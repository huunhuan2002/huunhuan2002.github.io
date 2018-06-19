import React, { Component } from 'react';
import queryString from 'query-string';
import { BrowserRouter, Route, Link } from 'react-router-dom';
class ListPublisher extends Component {
    constructor(props){
        super(props);
        this.state={
            itemsListPublisher: [{}]
        }
    }
    handleDelele =(id)=>{
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/UpdatePublisher/${id[0]}`, {
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
    fecthAPI =()=>{
        let publishername = ""
        if(typeof(queryString.parse(this.props.location.search).publishername) != "undefined")
        {
            publishername = queryString.parse(this.props.location.search).publishername
        }
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/ListPublisher?publishername=${publishername}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            itemsListPublisher: result
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
        const items = this.state.itemsListPublisher.map((value, index) => {
            var icon = new String("glyphicon glyphicon-")
            if(value.BiXoa == 1)
            {
                icon = icon+"ok";
            }
            else
                icon = icon +"remove"
			return (
                 <tr key={"key"+value.MaHangSanXuat}>
                    <td>{value.MaHangSanXuat}</td>
                    <td>{value.TenHangSanXuat}</td>
                    <td>
                        <Link to = {`/admin/UpdatePubliser/${value.MaHangSanXuat}`}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </Link>
                    </td>
                    <td>
                        <a href="#"onClick={this.handleDelele.bind(this,[value.MaHangSanXuat,value.BiXoa])}>
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
                        <input type="text" name="publishername" className="form-control" placeholder="Tên hãng sản xuất"  ></input>
                    </div>
                    <button type="submit" className="btn"><span className="glyphicon glyphicon-search"></span></button>
                    <Link to="/admin/addPubliser"><button type="button" className="btn" ><span className="glyphicon glyphicon-plus"></span></button></Link>
                </form>
                <table className="table table-striped" id="orderList">
                    <thead>
                        <tr className="nb active">
                            <td>Mã NXB</td>
                            <td colSpan="3">Tên NXB</td>
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

export default ListPublisher;