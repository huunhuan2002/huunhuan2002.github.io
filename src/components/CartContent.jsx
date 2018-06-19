import React from "react";
import Card from "./Card";

class CartContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [{}],
            SoLuong: 0,
            isAlert: false,
        }
    }

    fetchAPI = (id) => {
        fetch(`https://backend-newaaaaa.herokuapp.com/api/product/${id}`)
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

    componentDidMount() {
        this.fetchAPI(this.props.MaSanPham);
        this.setState({ SoLuong: this.props.SoLuong });
    }

    componentWillReceiveProps(newProps) {
        // console.log(newProps);
        //this.fetchAPI(this.newProps.MaSanPham);
    }

    handleChange = (e) => {
        if (e.target.value > this.state.items.SoLuongTon) {
            this.setState({ isAlert: true });
        }
        else {
            this.setState({ isAlert: false });
            this.setState({ SoLuong: e.target.value });
        }
    }

    handleClickUpdate = () => {
        this.props.handleClickUpdate(this.state.SoLuong, this.state.items.MaSanPham);
    }

    render() {
        const ten = this.state.items.TenSanPham;
        const url = this.state.items.HinhURL;
        const ma = this.state.items.MaSanPham;
        const tacGia = this.state.items.TenTacGia;
        const gia = this.state.items.GiaSanPham;

        let style = {
            width: 230,
            height: 70,
            position: "absolute",
        };

        let alert = this.state.isAlert ? (<div class="alert alert-danger" style={style}>
            <strong>Sách không đủ số lượng để đặt hàng, vui lòng nhập lại!</strong>
        </div>) : null;

        return (
            <React.Fragment>
                <table>
                    <tbody>
                        <tr>
                            <td width="20%">
                                <input type="hidden" name="MaSanPham" value={this.state.items.MaSanPham} />
                                <Card key={"key_" + ma} tenSach={ten} tenTacGia={tacGia} giaBan={gia} maSach={ma} hinhAnh={"https://backend-newaaaaa.herokuapp.com/images/Product/" + url} />
                            </td>
                            <td>&nbsp;</td>
                            <td><input type="number" className="form-control wA" name="txtSoLuong" id="txtSoLuong" ref="txtSoLuong" defaultValue={this.props.SoLuong} onChange={this.handleChange} />{alert}</td>
                            <td><button type="button" name="action" value="CapNhat" className="btn btn-success" disabled={this.state.isAlert} onClick={this.handleClickUpdate}> Cập nhật</button></td>
                            <td><button type="button" name="action" value="Huy" className="btn btn-info" onClick={this.props.handleClickHuy}>Hủy</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default CartContent;