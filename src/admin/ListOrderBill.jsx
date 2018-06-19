import React from "react";
import OrderBill from "./OrderBill";
import Search from "./SearchOrderBill";
import queryString from 'query-string';
import Detail from "./OrderbillDetail";
import $ from 'jquery';
class ListOrderBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsListOrderBill: [{}]
        }
    }
    getOrderbill = ()=>{
        let date = ""
        if(typeof(queryString.parse(this.props.location.search).date) != "undefined")
        {
             date = queryString.parse(this.props.location.search).date
        }
        fetch(`https://backend-newaaaaa.herokuapp.com/api/admin/ListOrderBill?date=${date}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        itemsListOrderBill: result
                    });
                },

                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }
    componentDidMount() 
    {
      this.getOrderbill()  
    }

    render() {
        const items = this.state.itemsListOrderBill.map((value, index) => {
            const MaDonHang = value.MaDonDatHang;
            const MaKhachHang = value.MaTaiKhoan;
            const MaTinhTrang = value.MaTinhTrang;
            const TenTinhTrang = value.TenTinhTrang;
            const NgayLap = value.NgayLap;
            const DiaChi = value.DiaChi;
            const HoTen = value.TenHienThi
            const TongTien = value.TongThanhTien;
            return (
                    <OrderBill id={MaDonHang}
                        key={"key_" + MaDonHang}
                        makhachhang={MaKhachHang}
                        matinhtrang={MaTinhTrang}
                        tentinhtrang={TenTinhTrang}
                        diachi={DiaChi}
                        hoten={HoTen}
                        ngaylap={NgayLap}
                        tongtien={TongTien}
                    />
            );
        });
        return (

            <div>
                <Search />
                <table className="table table-striped" id="orderList">
                    <thead>
                        <tr className="nb active">
                            <td>Mã Đơn Hàng</td>
                            <td>Mã Khách Hàng</td>
                            <td>Họ tên </td>
                            <td>Địa chỉ</td>
                            <td>Tổng tiền</td>
                            <td>Ngày lập đơn</td>
                            <td colSpan="4">Trạng thái</td>
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
export default ListOrderBill;