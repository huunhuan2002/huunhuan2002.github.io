import React, { Component } from 'react';
import queryString from 'query-string';
import ListCard from "./ListCards";
class SearchResult extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: [{}]
        }
    }
    componentDidMount()
    {   
        let TenSach = queryString.parse(this.props.location.search).TenSach
        let GiaTu = queryString.parse(this.props.location.search).GiaTu
        let GiaDen = queryString.parse(this.props.location.search).GiaDen
        let MaLoaiSanPham = queryString.parse(this.props.location.search).MaLoaiSanPham
        let MaHangSanXuat = queryString.parse(this.props.location.search).MaHangSanXuat
        let TenTacGia = queryString.parse(this.props.location.search).TenTacGia
        let url = "https://backend-newaaaaa.herokuapp.com//api/searchResult?"+
                  `TenSach=${TenSach}`+
                  `&GiaTu=${GiaTu}`+
                  `&GiaDen=${GiaDen}`+
                  `&MaLoaiSanPham=${MaLoaiSanPham}`+
                  `&MaHangSanXuat=${MaHangSanXuat}`+
                  `&TenTacGia=${TenTacGia}`
        fetch(url)
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
        render() {
        return (
            <ListCard items={this.state.items} nameHeader='kết quả tìm kiếm' />
        );
    }
}

export default SearchResult;