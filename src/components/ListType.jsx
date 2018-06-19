import React from "react";
import ListGroupItem from "./ListGroupItem";

class ListType extends React.Component {

    constructor(props) {
        super(props);

        this.render = this.render.bind(this);

        this.state = {
            typeItems: [{}],
        }
    }

    componentDidMount() {
        fetch("https://backend-newaaaaa.herokuapp.com/api/product/type")
            //fetch("https://bookstore-express-backend.herokuapp.com/api/product/new")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        typeItems: result
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
        const types = this.state.typeItems.map((value, index) => {
            const ten = value.TenLoaiSanPham;
            const id = value.MaLoaiSanPham;

            return (
                <ListGroupItem key={"key_"+id} id={id} tenTacGia={ten} url='/category'/>
            );
        });
        return (
            <div className="panel panel-default" id="cateMdl">
                <div className="panel-heading">CÁC THỂ LOẠI</div>
                <ul className="list-group">
                        {types}
                </ul>
            </div>
        )
    }
}
export default ListType;