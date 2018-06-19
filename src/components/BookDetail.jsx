import React from "react";
import BookDetailBottom from "./BookDetailBottom";
import jwtDecode from "jwt-decode";
import $ from "jquery";

class BookDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{}],
            inputQuanity: "1",
            tongSoBinhLuan: 0,
            isCartSuccess: false,
            listComment: [{}],
            TenHienThi: null,
            afterAddCmt: null
        }
    }

    getTenHienThi = () => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            let user = jwtDecode(token);
            this.setState({ TenHienThi: user.TenHienThi })
        }
    }

    fetchAPI = (id) => {
        fetch(`https://backend-newaaaaa.herokuapp.com//api/product/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result[0]
                    });
                },

                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }

    fetchAPIComment = (id) => {
        fetch(`https://backend-newaaaaa.herokuapp.com//api/comment/product/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tongSoBinhLuan: result[0].SoLuong
                    });
                },

                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }
    fetchListComment = (id) => {
        fetch(`https://backend-newaaaaa.herokuapp.com//api/comment/getList/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        listComment: result
                    });
                },

                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }

    componentDidMount() {
        this.getTenHienThi();
        this.fetchAPI(this.props.match.params.bookid);
        this.fetchAPIComment(this.props.match.params.bookid);
        this.fetchListComment(this.props.match.params.bookid);
    }

    componentWillReceiveProps(newprops) {
        this.getTenHienThi();
        this.fetchAPI(newprops.match.params.bookid);
        this.fetchAPIComment(newprops.match.params.bookid);
        this.fetchListComment(newprops.match.params.bookid);
    }

    XuLyThemGioHang = () => {
        if (this.state.items.SoLuongTon - this.refs.txtSoLuongNhap.value < 0) {
            alert('Sách không đủ số lượng đặt hàng');
        }
        else {
            if (localStorage.getItem('carts')) {
                let flag = false;
                let carts = JSON.parse(localStorage.getItem('carts'));

                for (let i = 0; i < carts['danhsach'].length; i++) {
                    if (carts['danhsach'][i].MaSanPham === this.state.items.MaSanPham) {
                        flag = true;
                        carts['danhsach'][i].SoLuong = parseInt(this.refs.txtSoLuongNhap.value);
                        break;
                    }
                }
                if (flag === false) {
                    carts['danhsach'].push({
                        "MaSanPham": this.state.items.MaSanPham,
                        "SoLuong": this.refs.txtSoLuongNhap.value,
                        "GiaSanPham": this.state.items.GiaSanPham
                    });
                }
                localStorage.setItem('carts', JSON.stringify(carts));
            }
            else {
                let carts = JSON.stringify({
                    "danhsach": [{
                        "MaSanPham": this.state.items.MaSanPham,
                        "SoLuong": this.refs.txtSoLuongNhap.value,
                        "GiaSanPham": this.state.items.GiaSanPham
                    }]
                });
                localStorage.setItem('carts', carts);
            }
            this.setState({ isCartSuccess: true })
            let that = this;
            setTimeout(function () { that.setState({ isCartSuccess: false }) }, 5000);
        }
    }
    pad = (number) => {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }
    formatdate = () => {
        var date = new Date();
        return date.getFullYear() +
            '-' + this.pad(date.getMonth() + 1) +
            '-' + this.pad(date.getDate()) +
            'T' + this.pad(date.getHours()) +
            ':' + this.pad(date.getMinutes()) +
            ':' + this.pad(date.getSeconds());
    }
    KiemTraThongTin = () => {
        let check = 1
        if (!localStorage.getItem('token') && this.refs.usrcmt.value == '') {
            check = 0
            this.setState({
                error: true
            })
        }
        else {
            this.setState({
                error: false
            })
        }
        if (this.refs.NoiDung.value == '') {
            check = 0
            this.setState({
                nullVal: true
            })
        }
        else {
            this.setState({
                nullVal: false
            })
        }
        return check
    }
    XuLyThemBinhLuan = () => {
        if (this.KiemTraThongTin()) {
            let tmpname = this.state.TenHienThi ? this.state.TenHienThi : this.refs.usrcmt.value;
            // let tg = new Date().toISOString().slice(0, 19).replace('T', ' ');
            let tg = this.formatdate()
            let cmt = {
                MaSanPham: this.state.items.MaSanPham,
                TenHienThi: tmpname,
                NoiDung: this.refs.NoiDung.value,
                ThoiGian: tg,
            }

            fetch('https://backend-newaaaaa.herokuapp.com//api/comment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cmt: cmt,
                })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            afterAddCmt: result,
                            tongSoBinhLuan: parseInt(this.state.tongSoBinhLuan) + 1,
                        });
                        this.fetchListComment(this.state.items.MaSanPham);
                    },

                    (error) => {
                        this.setState({
                            error
                        });
                    }
                );
        }
    }

    render() {
        let styleCmt = {
            width: 500,
            height: 80
        };
        let styleName = {
            width: 500
        };
        let styleTime = {
            color: "#999999"
        }

        let successCart = this.state.isCartSuccess ? (<div className="alert alert-success">
            <strong>Thành công!</strong> Đã thêm sách vào giỏ hàng.
            </div>) : null;

        let error = this.state.error ? (<div className="alert alert-danger">
            Vui lòng nhập tên hoặc đăng nhập tài khoản để bình luận !!!
            </div>) : null;

        let nullVal = this.state.nullVal ? (<div className="alert alert-danger">
            Vui lòng nhập  bình luận !!!
            </div>) : null;


        const listComment = this.state.listComment.map((comment, index) => {
            const name = comment.TenHienThi;
            const nd = comment.NoiDung;
            let tmp = comment.ThoiGian;
            let date = new Date(tmp);
            const time = date.toLocaleString();
            return (
                <React.Fragment key={index}>
                    <b>{name}</b> <i style={styleTime}>{time}</i> <br />
                    <span>{nd}</span> <hr />
                </React.Fragment>
            );
        });

        const inputNameComment = localStorage.getItem('token') ? null : (<span><label htmlFor="usr">Name:</label>
            <input type="text" className="form-control" id="usr" ref="usrcmt" style={styleName} placeholder="Nhập tên của bạn" /></span>);

        const tmpGia = this.state.items.GiaSanPham ? (this.state.items.GiaSanPham).toLocaleString('en') : null;

        return (
            <React.Fragment>
                <div className="clearfix" id="productDetail">
                    <div className="w40p thumbnail pull-left">
                        <img src={`https://backend-newaaaaa.herokuapp.com//images/Product/${this.state.items.HinhURL}`} alt={`${this.state.items.TenSanPham}`} />
                    </div>
                    <div className="w60p pull-right">
                        <ul>
                            <li className="list-group-item"><h2>{this.state.items.TenSanPham}</h2></li>
                            <li className="list-group-item"><b>Tác giả: </b>{this.state.items.TenTacGia}</li>
                            <li className="list-group-item"><b>Nhà xuất bản: </b>{this.state.items.TenHangSanXuat}</li>
                            <li className="list-group-item"><b>Thể loại: </b>{this.state.items.TenLoaiSanPham}</li>
                            <li className="list-group-item"><b>Giới thiệu: </b>{this.state.items.MoTa}</li>
                            <li className="list-group-item"><b>Số lượng còn:</b>{this.state.items.SoLuongTon} quyển</li>
                            <li className="list-group-item"><h4>Giá: <span className="price">{tmpGia} VNĐ</span></h4></li>
                            <li className="list-group-item">
                                Số lượng: <input type="text" defaultValue="1" className="list-group-item" name="txtSoLuongNhap" id="txtSoLuongNhap" ref="txtSoLuongNhap" />
                            </li>
                            <li className="list-group-item">
                                <button type="Submit" onClick={this.XuLyThemGioHang} className="btn btn-danger" >Đặt vào giỏ hàng</button>
                            </li>
                            {successCart}
                        </ul>
                    </div>
                </div>
                <BookDetailBottom MaSanPham={this.state.items.MaSanPham} MaLoaiSanPham={this.state.items.MaLoaiSanPham} />

                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <textarea className="form-control" rows="5" id="comment" ref="NoiDung" style={styleCmt} placeholder="Bạn nghĩ gì về sách này?"></textarea>
                    {inputNameComment}
                    {error}
                    {nullVal}
                </div>
                <button type="button" className="btn btn-primary" onClick={this.XuLyThemBinhLuan}>Bình Luận</button>

                <hr />
                <h4>Bình luận của bạn đọc <span className="label label-default">{this.state.tongSoBinhLuan}</span></h4>
                <div>
                    {listComment}
                </div>
            </React.Fragment>
        );
    }
}

export default BookDetail;