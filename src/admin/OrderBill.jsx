import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
export default class OrderBill extends React.Component{
    formatDate()
    {
        var date = new Date(this.props.ngaylap);
        return date.toLocaleDateString() +' '+ date.toLocaleTimeString();
    }
    render()
    {
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.makhachhang}</td>
                <td>{this.props.hoten}</td>
                <td>{this.props.diachi}</td>
                <td>{this.props.tongtien}</td>
                <td>{this.formatDate()}</td>
                <td>{this.props.tentinhtrang}</td>
                <td><Link to={`/admin/UpdateOrderBill/${this.props.id}`}><span className="glyphicon glyphicon-pencil"></span></Link></td>
                <td><Link to={`/admin/OrderbillDetail/${this.props.id}`} ><span className="glyphicon glyphicon-th-list"></span></Link></td>
            </tr>
            
        )
    }
}