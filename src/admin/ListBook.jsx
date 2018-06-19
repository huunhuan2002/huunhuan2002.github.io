import React from "react";
import Book from "./Book";
import Search from "./SearchBook";
import queryString from 'query-string';
import { BrowserRouter, Route, Link } from 'react-router-dom';
class ListBook extends React.Component{
    constructor(props){
        super(props);
        this.state={
            itemsListBook: [{}]
        }
    }
    handleDelete = (id)=>{
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/UpdateBook/${id[0]}`, {
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
                  this.fecthApi()
                  
               },
               (error)=>{
                    console.log(error);
               }
            )
    }
    fecthApi =()=>{
        let bookname = ""
        if(typeof(queryString.parse(this.props.location.search).bookname) != "undefined")
        {
             bookname = queryString.parse(this.props.location.search).bookname
        }
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/ListBook?bookname=${bookname}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            itemsListBook: result
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
       this.fecthApi()
    }
    render()
    {
        const items = this.state.itemsListBook.map((value, index) => {
            const TenSach = value.TenSanPham
            const TenTacGia = value.TenTacGia
            const TenLoaiSanPham = value.TenLoaiSanPham
            const TenNXB = value.TenHangSanXuat
            const Gia = value.GiaSanPham
            const BiXoa = value.BiXoa
            const SoLuong = value.SoLuongTon
            const MaSach = value.MaSanPham
            var icon = new String("glyphicon glyphicon-")
            if(BiXoa == 1)
            {
                icon = icon+"ok";
            }
            else
                icon = icon +"remove"
			return (
                <tr key={"key_"+MaSach}>
                    <td>{TenSach}</td>
                    <td>{TenTacGia}</td>
                    <td>{TenLoaiSanPham}</td>
                    <td>{TenNXB}</td>
                    <td>{Gia}</td>
                    <td>{SoLuong}</td>
                    <td>
                        <Link to={`/admin/UpdateBook/${MaSach}`}><span className="glyphicon glyphicon-pencil"></span> </Link>
                    </td>
                    <td>
                        <a href="#" onClick={this.handleDelete.bind(this,[MaSach,BiXoa])} ><span className={icon}></span></a>
                    </td>
                </tr>
			);
		});
        return(
            <div>
                <Search />
                <table className="table table-striped" id="orderList">
                    <thead>
                        <tr className="nb active">
                            <td>Tên</td>
                            <td>Tác giả</td>
                            <td>Thể loại</td>
                            <td>NXB</td>
                            <td>Giá</td>
                            <td colSpan="3">Số lượng</td>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ListBook;