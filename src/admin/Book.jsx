import  React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
class Book extends Component {
    constructor(props){
        super(props)
    }
    render() {
        var icon = new String("glyphicon glyphicon-")
        if(this.props.bixoa == 1)
        {
            icon = icon+"ok";
        }
        else
            icon = icon +"remove"
        return (
           <tr>
                <td>{this.props.tensach}</td>
                <td>{this.props.tentacgia}</td>
                <td>{this.props.tenloaisanpham}</td>
                <td>{this.tennxb}</td>
                <td>{this.props.gia}</td>
                <td>{this.props.soluong}</td>
                <td>
                    <Link to={`/admin/UpdateBook/${this.props.id}`}><span className="glyphicon glyphicon-pencil"></span> </Link>
                </td>
                <td>
                    <a href="" onClick={this.props.handleDelete} ><span className={icon}></span></a>
                </td>
            </tr>
        );
    }
}

export default Book;