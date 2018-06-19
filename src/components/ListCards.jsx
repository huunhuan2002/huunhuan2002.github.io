import React from"react";
import Card from "./Card.jsx";
import {Pager, Pagination} from "react-bootstrap";

class ListCards extends React.Component{

    render()
    {
    	const cards = this.props.items.map((sach, index) => {
			const ten = sach.TenSanPham;
			const url = sach.HinhURL;
			const ma = sach.MaSanPham;
			const tacGia = sach.TenTacGia;
			const gia = sach.GiaSanPham;

			return (
				<Card key={"key_"+ma} tenSach={ten} tenTacGia={tacGia} giaBan={gia} maSach={ma} hinhAnh={"https://backend-newaaaaa.herokuapp.com//images/Product/"+url}/>
			);
		});

        const pagination =()=> {

            var paginationItems = [];
            const current = this.props.currentPageIndex;
            const max = this.props.numberOfPages;

            if (max < 11) {
                for (var i = 1; i <= max; i++) {
                    if (i === current) {
                        paginationItems.push(<Pagination.Item key={i} active>{i}</Pagination.Item>);
                    } else {
                        const index = i;
                        paginationItems.push(<Pagination.Item key={i} onClick={()=>this.props.indexClick(index)}>{index}</Pagination.Item>);
                    }
                }
            } else {
                var tempIndex = 1;
                if (current > 5) {
                    paginationItems.push(<Pagination.Item key={tempIndex} onClick={()=>this.props.indexClick(1)}>{1}</Pagination.Item>);
                    paginationItems.push(<Pagination.Ellipsis key={"E"+tempIndex}/>);
                    tempIndex = current - 4;
                }
                for (var i = tempIndex; i < current; i++) {
                    const index = i;
                    paginationItems.push(<Pagination.Item key={i} onClick={()=>this.props.indexClick(index)}>{index}</Pagination.Item>);
                }

                paginationItems.push(<Pagination.Item key={"key"+tempIndex} active>{current}</Pagination.Item>);

                for (var i = current + 1; i < current + 4 && i < max + 1; i++) {
                    const index = i;
                    paginationItems.push(<Pagination.Item  key={i} onClick={()=>this.props.indexClick(index)}>{index}</Pagination.Item>);
                }
                if (current < max - 5) {
                    paginationItems.push(<Pagination.Ellipsis key={"E"+current} />);
                    const index = max;
                    paginationItems.push(<Pagination.Item key={index} onClick={()=>this.props.indexClick(index)}>{index}</Pagination.Item>);
                }
            }

            return paginationItems;
        };
        

        return(
            <div className="clearfix">
                <h2 className="page-header">{this.props.nameHeader}</h2>
                {cards}
                <Pagination>{pagination()}</Pagination>
            </div>
        );
    }
}
export default ListCards;