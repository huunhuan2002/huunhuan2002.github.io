import React from "react";
import CartContent from "./CartContent";
import Decode from "jwt-decode";

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: localStorage.getItem('carts') ? localStorage.getItem('carts') : null,
            ThongBao: '',
            visibleAlert: false,
            done: false,
            afterAddOrder: null,
        }
    }

    HuyTatCa = () => {
        localStorage.removeItem('carts');
        this.setState({
            items: null
        })
    }

    Huy1Sach = (maSach) => {
        let carts = JSON.parse(localStorage.getItem('carts'));
        let ds = carts['danhsach'];

        let idx = -1;
        for (let i = 0; i < ds.length; i++) {
            if (ds[i].MaSanPham == maSach) {
                idx = i;
                break;
            }
        }

        if (idx > -1) {
            carts['danhsach'].splice(idx, 1);
            localStorage.setItem('carts', JSON.stringify(carts));
            this.setState({ items: JSON.stringify(carts) });
        }
    }

    handleClickUpdate = (slMoi, ma) => {
        let carts = JSON.parse(localStorage.getItem('carts'));

        for (let i = 0; i < carts['danhsach'].length; i++) {
            if (carts['danhsach'][i].MaSanPham === ma) {
                carts['danhsach'][i].SoLuong = slMoi;
                localStorage.setItem('carts', JSON.stringify(carts));
                this.setState({ items: JSON.stringify(carts) });
                return;
            }
        }
    }

    ThemDonDatHang = (DDH, callback) => {
        fetch('https://backend-newaaaaa.herokuapp.com/api/order/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                NgayLap: DDH.NgayLap,
                TongTien: DDH.TongTien,
                MaTaiKhoan: DDH.MaTaiKhoan,
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        afterAddOrder: result
                    });
                    this.XuLyChiTiet(result.insertId);
                    callback(result);
                },

                (error) => {
                    this.setState({
                        error
                    });
                },
        );
    }

    ThemCTDonDatHang = (CT, callback) => {
        fetch('https://backend-newaaaaa.herokuapp.com/api/orderDetail/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                SoLuong: CT.SoLuong,
                GiaBan: CT.GiaBan,
                MaDonDatHang: CT.MaDonDatHang,
                MaSanPham: CT.MaSanPham,
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.CapNhatSoLuongTon(CT.MaSanPham, CT.SoLuong);
                    callback();
                },

                (error) => {
                    this.setState({
                        error
                    });
                },
        );
    }

    XuLyChiTiet = (MaDonDatHang) => {
        var that = this
        let carts = JSON.parse(localStorage.getItem('carts'));
        for (let i = 0; i < carts['danhsach'].length; i++) {
            let CT = {
                SoLuong: carts['danhsach'][i].SoLuong,
                GiaBan: carts['danhsach'][i].GiaSanPham,
                MaSanPham: carts['danhsach'][i].MaSanPham,
                MaDonDatHang: MaDonDatHang,
            }
            this.ThemCTDonDatHang(CT, function () { 
                if (i == carts['danhsach'].length - 1) {
                    localStorage.removeItem('carts');
                    that.setState({
                        done: true,
                        items: null,
                    });
                }
            });
        }
    }

    CapNhatSoLuongTon = (MaSanPham, SoLuong) => {
        fetch('https://backend-newaaaaa.herokuapp.com/api/product/updateInventory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaSanPham: MaSanPham,
                SoLuong: SoLuong,
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                },

                (error) => {
                    this.setState({
                        error
                    });
                },
        );
    }
    pad = (number)=>{
        if (number < 10) {
            return '0' + number;
        }
        return number;
      }
      formatdate = ()=>{
        var date = new Date();
        return  date.getFullYear() +
        '-' + this.pad(date.getMonth() + 1) +
        '-' + this.pad(date.getDate()) +
        'T' + this.pad(date.getHours()) +
        ':' + this.pad(date.getMinutes()) +
        ':' + this.pad(date.getSeconds());
      }
    handleDatHang = () => {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('carts')) {

                let carts = JSON.parse(localStorage.getItem('carts'));
                var TongTien = 0;
                for (let i = 0; i < carts['danhsach'].length; i++) {
                    TongTien += parseInt(carts['danhsach'][i].SoLuong) * parseInt(carts['danhsach'][i].GiaSanPham);
                }

                let token = localStorage.getItem('token');
                let user = Decode(token);
                var MaTaiKhoan = user.MaTaiKhoan;
                

                // var NgayLap = new Date().toISOString().slice(0, 19).replace('T', ' ');
                var NgayLap = this.formatdate()

                var DDH = {
                    NgayLap: NgayLap,
                    TongTien: TongTien,
                    MaTaiKhoan: MaTaiKhoan,
                }

                this.ThemDonDatHang(DDH, function (result) {
                });

            }
        }
        else {
            this.setState({ ThongBao: 'VUI LÒNG ĐĂNG NHẬP ĐỂ SỬ DỤNG CHỨC NĂNG ĐẶT HÀNG', visibleAlert: true });
        }
    }

    render() {
        let carts = JSON.parse(this.state.items);
        var cardsContent = null;

        var tmptt = 0;

        if (carts) {
            cardsContent = carts['danhsach'].map((sach, index) => {
                const ma = sach.MaSanPham;
                var sl = sach.SoLuong;

                tmptt += parseInt(sl) * parseInt(sach.GiaSanPham);

                return (
                    <CartContent key={ma} MaSanPham={ma} SoLuong={sl} handleClickHuy={() => this.Huy1Sach(ma)} handleChange={this.handleChange} handleClickUpdate={this.handleClickUpdate} />
                );
            });
        }

        tmptt = (tmptt).toLocaleString('en');

        let alertError = this.state.visibleAlert ? (<div className='alert alert-danger'><b>{this.state.ThongBao}</b></div>) : null;
        let alertSuccess = this.state.done ? (<div className='alert alert-success'><b>Đặt hàng thành công !</b></div>) : null;

        return (
            <React.Fragment>
                {alertError}
                {alertSuccess}
                <table className="table table-striped" id="cartItems">
                    <tbody>
                        <tr className="nb">
                            <td></td>
                            <td></td>
                            <td><button className="btn btn-danger" onClick={this.handleDatHang}>Đặt hàng</button></td>
                            <td><button className="btn btn-primary" onClick={this.HuyTatCa}>Hủy tất cả</button></td>
                        </tr>
                        <tr className="pull-left">
                            <td></td>
                            <td>Tổng tiền:&nbsp;</td>
                            <td><b>{tmptt} VNĐ</b></td>
                            <td></td>
                        </tr>
                        <tr>
                            {cardsContent}                                                                                                  
                        </tr>
                    </tbody>
                </table>

            </React.Fragment>
        )
    }
}

export default ShoppingCart;