import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import axios from "axios";
import { BrowserRouter, Route, Link,Redirect } from 'react-router-dom';
class addBook extends Component {
    constructor(props){
        super(props)
        this.state={
            items: [{}],
            types: [{}],
            publisher: [{}],
            imageSelect: null,
            imagePreviewURL: ''
            
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleUploadImage = this.handleUploadImage.bind(this)
        this.handleUploadImage = this.handleUploadImage.bind(this)
    }
    getType = ()=>{
        fetch(`https://backend-newaaaaa.herokuapp.com/api/admin/getType`)
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
        fetch(`https://backend-newaaaaa.herokuapp.com/api/admin/getPublisher`)
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
    handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        const temp= this.state.items.slice()
        temp[0][name] = value
        this.setState({
            items: temp
        })
    }
    fectSubmit = ()=>{
        fetch(`https://backend-newaaaaa.herokuapp.com/api/admin/addBook`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TenSanPham: this.refs.TenSanPham.value,
                TenTacGia: this.refs.TenTacGia.value,
                MaLoaiSanPham: this.refs.MaLoaiSanPham.value,
                MaHangSanXuat: this.refs.MaHangSanXuat.value,
                GiaSanPham: this.refs.GiaSanPham.value,
                MoTa: this.refs.MoTa.value,
                SoLuongTon: this.refs.SoLuongTon.value,
                HinhURL: this.state.imageSelect !=  null?this.state.imageSelect.name:""
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
    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.state.imageSelect != null)
        {
            this.handleUploadImage()
        }
            this.fectSubmit()
        
    }
    handleUploadImage = ()=>{
        var check = 0
        const formData = new FormData()
        formData.append('file', this.state.imageSelect, this.state.imageSelect.name)
        axios.post("https://backend-newaaaaa.herokuapp.com/api/admin/uploadImage",formData)
    }
    handleImageChange = (e)=>{
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                imageSelect: file,
                imagePreviewURL: reader.result
            });
        }
        if(file != null)
        {
            reader.readAsDataURL(file)
        }
    }
    componentDidMount() {
        this.getType();
        this.getPubliser();
    }
    render() {
        if(this.state.redirect)
        {
            return <Redirect to = '/admin/ListBook' />
        }
        const type = this.state.types.map((value,index)=>{
            return (                
                <option  value={value.MaLoaiSanPham}    key={"key_"+value.MaLoaiSanPham} >
                    {value.TenLoaiSanPham}
                </option>
			);
        })
        const publisher = this.state.publisher.map((value,index)=>{
            return (                
                <option  value={value.MaHangSanXuat}    key={"key_"+value.TenHangSanXuat} >
                    {value.TenHangSanXuat}
                </option>
			);
        })
        return(
            <div className="panel">
            <h2 className="page-header text-center">Thêm Sách</h2>
            <div className="panel-body">
                        <div className="w40p thumbnail pull-left" id="productImg">
                             <img src={this.state.imagePreviewURL} alt="vui lòng chọn hình" />
                        </div>
                        <div className="w40p pull-right" id="productInfo">
                            <form method="post" onSubmit={this.handleSubmit}>
                                Tên: 
                                <input type="text" ref="TenSanPham" onChange={this.handleInput} className="form-control" name="TenSanPham" ></input>
                                Tác giả: 
                                <input type="text" ref="TenTacGia" onChange={this.handleInput} className="form-control" name="TenTacGia" ></input>
                                Thể loại: 
                                <select ref="MaLoaiSanPham" className="form-control" onChange={this.handleInput} name="MaLoaiSanPham" >
                                        {type}
                                </select>
                                Nhà xuất bản: 
                                <select ref="MaHangSanXuat" className="form-control" onChange={this.handleInput} name="MaHangSanXuat">
                                    {publisher}
                                </select>
                                Giá: 
                                <input ref="GiaSanPham" type="text" onChange={this.handleInput} className="form-control" name="GiaSanPham" ></input>
                                Mô tả: 
                                <textarea ref="MoTa" name="MoTa" onChange={this.handleInput} rows="3" className="form-control" ></textarea>
                                Số lượng:
                                <input ref="SoLuongTon" type="text" onChange={this.handleInput} className="form-control" name="SoLuongTon"></input>
                                Hình ảnh: 
                                <input ref="HinhURL"
                                        type="file" 
                                        onChange={this.handleImageChange} 
                                        accept="image/*" 
                                        className="form-control" 
                                        name="HinhURL">
                                </input>
                                <br></br>
                                <button type="submit" className="btn btn-primary center-block">Thêm</button>
                            </form>
                        </div>
                    </div>
            </div>
        )
    }
}

export default addBook;