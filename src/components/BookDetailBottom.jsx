import React from "react";
import ListCards from "./ListCards";

class BookDetailBottom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [{}]
        }
    }

    componentWillReceiveProps(newProps){
        fetch("https://backend-newaaaaa.herokuapp.com/api/product/related", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaSanPham: newProps.MaSanPham,
                MaLoaiSanPham: newProps.MaLoaiSanPham,
            })
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
        return (
            <div className="clearfix">
                <ListCards items={this.state.items} nameHeader="Sách Cùng Thể Loại"/>
            </div>
        );
    }
}

export default BookDetailBottom;