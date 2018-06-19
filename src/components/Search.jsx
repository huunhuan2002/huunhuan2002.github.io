import React, { Component } from 'react';

class Search extends Component {
    constructor(props){
        super(props)
        this.state={
            types: [{}],
            publisher: [{}]
            
        }
    }
    getType = ()=>{
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/getType`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    types: result
                });
            },

            (error) => {
                this.setState({
                    error
                });
            }
        );
    }
    getPubliser =()=>{
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/getPublisher`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    publisher: result
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
        this.getPubliser()
        this.getType()
    }
    render() {
        const type = this.state.types.map((value,index)=>{
            return (                
                <option   value={value.MaLoaiSanPham}    key={"key_"+value.MaLoaiSanPham} >
                    {value.TenLoaiSanPham}
                </option>
			);
        })
        const publisher = this.state.publisher.map((value,index)=>{
            return (                
                <option   value={value.MaHangSanXuat}   key={"key_"+value.TenHangSanXuat} >
                    {value.TenHangSanXuat}
                </option>
			);
        })
        var giatu= []
        for (let index = 15000; index <= 200000; index+=25000) {
            giatu.push(	<option key={index} value={index}>{index}</option>)
            
        }
        var giaden = []
        for (let index = 200000; index >= 15000; index-=25000) {
            giaden.push(	<option key={index} value={index}>{index}</option>)
            
        }
        return (
            <ul className="list-group">
                <li className="list-group-item">Giá từ:
                    <select name="giatu"  className="form-control" name="GiaTu">
                        {giatu}
                    </select>			
                </li>
                <li className="list-group-item">Đến:
                    <select name="giaden" className="form-control" name="GiaDen">
                        {giaden}
                    </select>			
                </li>
                <li className="list-group-item">Thể loại:
                    <select className="form-control" name="MaLoaiSanPham">
                        <option value="" className="hidden">-- Chọn thể loại --</option>
                        {type}
                    </select>				
                </li>
                <li className="list-group-item">Nhà xuất bản:
                    <select className="form-control" name="MaHangSanXuat">
                        <option value="" className="hidden">-- Chọn nhà xuất bản --</option>
                        {publisher}
                    </select>
                </li>
                <li className="list-group-item">Tác giả: <input className="form-control" type="text" name="TenTacGia"></input></li>
            </ul>
        );
    }
}

export default Search;