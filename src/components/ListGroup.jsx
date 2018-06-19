import React, { Component } from "react";
import ListGroupItem from "./ListGroupItem.jsx";

class ListGroup extends Component {

	constructor(props) {
		super(props);

		this.render = this.render.bind(this);

		this.state = {
			groupItems: [{}],
		}
	}

	componentDidMount() {
		fetch("https://backend-newaaaaa.herokuapp.com/api/product/publisher")
			//fetch("https://bookstore-express-backend.herokuapp.com/api/product/new")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						groupItems: result
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
		const groups = this.state.groupItems.map((value, index) => {
			const ten = value.TenHangSanXuat;
			const id = value.MaHangSanXuat;

			return (
				<ListGroupItem key={"key_"+id} id={id} tenTacGia={ten} url='/publisher'/>
			);
		});
		return (
			<div className="panel panel-default">
				<div className="panel-heading">NHÀ XUẤT BẢN</div>
				<ul className="list-group">
					{groups}
				</ul>
			</div>
		);
	}

}

export default ListGroup;