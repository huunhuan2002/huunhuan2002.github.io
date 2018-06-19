import React, { Component } from 'react';
import { BrowserRouter, Route, Link,Redirect } from 'react-router-dom';
import main from "./Main";
class UpdateOrderBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [{}],
          status: [{}],
          redirect: false,
          loadSuccess: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
      }
    fetchAPI = (id) => {
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/UpdateOrderBill/${id}`)                                                                                                              
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                items: result,
                loadSuccess: true
              });
            },
    
            (error) => {
              this.setState({
                error
              });
            }
          );
      }
      getStatus = ()=>{
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/UpdateOrderBill/getStatus`)                                                                                                              
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              status: result,
              loadSuccess: true
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
        this.fetchAPI(this.props.match.params.id);
        this.getStatus();
      }
      handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        const temp= this.state.items.slice()
        temp[0][name] = value
        this.setState({
            items: temp
        })
    }
    updateAccount = ()=>{
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/UpdateAccountAdmin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaTaiKhoan: this.refs.MaKhachHang.value,
                TenHienThi: this.refs.TenHienThi.value,
                DiaChi: this.refs.DiaChi.value,
            })
            })
            .then(
               (result)=>{
                  this.setState({
                      redirect: true
                  })
                  
               },
               (error)=>{
                    console.log(error);
               }
            )
    }
      handleSubmit=(event)=> {
        fetch(`https://backend-newaaaaa.herokuapp.com//api/admin/UpdateOrderBill/${this.state.items[0].MaDonDatHang}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                NgayLap: this.refs.NgayLap.value,
                MaTaiKhoan: this.refs.MaKhachHang.value,
                TenHienThi: this.refs.TenHienThi.value,
                DiaChi: this.refs.DiaChi.value,
                TongThanhTien: this.refs.TongThanhTien.value,
                MaTinhTrang: this.refs.TinhTrang.value
            })
            })
            .then(
               (result)=>{
                  this.setState({
                      redirect: true
                  })
                  
               },
               (error)=>{
                    console.log(error);
               }
            )
            this.updateAccount()
      }
      pad = (number)=>{
        if (number < 10) {
            return '0' + number;
        }
        return number;
      }
      formatdate = ()=>{
        var date = new Date(this.state.items[0].NgayLap);
        return  date.getFullYear() +
        '-' + this.pad(date.getMonth() + 1) +
        '-' + this.pad(date.getDate()) +
        'T' + this.pad(date.getHours()) +
        ':' + this.pad(date.getMinutes()) +
        ':' + this.pad(date.getSeconds());
      }
    render() {
        if(this.state.redirect)
        {
            return <Redirect to = '/admin' />
        }
        const options = this.state.status.map((value, index) => {
            const id = value.MaTinhTrang;
            const tentinhtrang = value.TenTinhTrang;
			return (
                <option  value={id}    key={"key_"+id} >
                    {tentinhtrang}
                </option>
			);
        });
        
        return (
            <div>
                <div className="panel">
                    <h2 className="page-header text-center">Sửa đơn đặt hàng #{this.state.items[0].MaDonDatHang}</h2>
                    <div className="panel-body">

                        <div className="frmEdit w40p center-block">
                            Ngày tạo: 
                            <input  type="datetime-local" name="NgayLap" onChange={this.handleInput} ref="NgayLap" className="form-control" value={this.formatdate()}></input>
                            Mã khách hàng: 
                            <input type="text" className="form-control" onChange={this.handleInput} name="MaTaiKhoan" ref="MaKhachHang" value={this.state.loadSuccess?this.state.items[0].MaTaiKhoan:""}></input>
                            Họ tên: 
                            <input type="text" className="form-control" onChange={this.handleInput} name="TenHienThi" ref="TenHienThi" value={this.state.loadSuccess?this.state.items[0].TenHienThi:""}></input>
                            Địa chỉ: 
                            <input type="text" className="form-control" onChange={this.handleInput} name="DiaChi" ref="DiaChi" value={this.state.loadSuccess?this.state.items[0].DiaChi:""}></input>
                            Tổng tiền: 
                            <input type="text" className="form-control" onChange={this.handleInput} name="TongThanhTien" ref="TongThanhTien" placeholder="Tổng tiền" name="TongThanhTien" value={this.state.loadSuccess?this.state.items[0].TongThanhTien:""}></input>
                            Trạng thái: 
                            <select className="form-control" name="MaTinhTrang" ref="TinhTrang" onChange={this.handleInput} value={this.state.loadSuccess?this.state.items[0].MaTinhTrang:""} >
                                <option  value="" className="hidden">-- Chọn trạng thái --</option>  
                                 {options}
                            </select>
                            <br></br>
                            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary center-block">Sửa</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateOrderBill;