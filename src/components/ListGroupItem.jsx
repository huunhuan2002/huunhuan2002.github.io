import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class ListGroupItem extends Component {

	render() {
		return(
			<li >
				<Link to={`${this.props.url}/${this.props.id}`} className="list-group-item">{this.props.tenTacGia}</Link>
			</li>
		);
	}

}

export default ListGroupItem;