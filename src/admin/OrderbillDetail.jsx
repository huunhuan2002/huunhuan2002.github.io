import React, { Component } from 'react';

class OrderbillDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{}]
        }
    }
    componentDidMount(){
        fetch(`https://backend-newaaaaa.herokuapp.com/api/admin/getOrderbillDetail/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            })
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
        const item = this.state.items.map((value,index)=>{
            return(
                <tr key={"key_"+value.MaSanPham}>
                    <td>{value.MaSanPham}</td>
                    <td>{value.TenSanPham}</td>
                    <td>{value.TenTacGia}</td>
                    <td>{value.GiaSanPham}</td>
                    <td>{value.SoLuong}</td>
                </tr>
            )
        })
        return (
            <div className="panel">
            <h2 className="page-header text-center">Chi tiết hóa đơn #{this.props.match.params.id} </h2>
                <div className="panel-body">
                    <table className="table table-striped">
                        <thead>
                            <tr className="active">
                                <td>Mã sách</td>
                                <td>Tên sách</td>
                                <td>Tác giả</td>
                                <td>Giá</td>
                                <td>Số lượng</td>
                            </tr>
                        </thead>
                        <tbody>
                            {item}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default OrderbillDetail;