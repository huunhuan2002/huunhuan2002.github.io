import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Card extends Component {

	constructor(props) {
		super(props);

		this.state = {
			maSach: "",
			tenSach: "",
			tenTacGia: "",
			giaBan: 0,
			thongTin: "",
			hinhAnh: ""
		}
	}
	editBookName = () => {
		var str = new String(this.props.tenSach);
		str = str.substr(0, 15) + "...";
		return str;
	}
	render() {
		const tmpGia = this.props.giaBan ? (this.props.giaBan).toLocaleString('en') : null;

		return (
			<div className="w12e pull-left" title={this.props.tenSach}>
				<div className="thumbnail productThumb">
					<Link to={`/product/${this.props.maSach}`}>
						<img src={this.props.hinhAnh} alt="image" />
						<h4>{this.editBookName()}</h4>
						<h4 className="small">{this.props.tenTacGia}</h4>
						<h4 className="price">{tmpGia} VNĐ</h4>
					</Link>
				</div>
			</div>
		);
	}

}

export default Card;