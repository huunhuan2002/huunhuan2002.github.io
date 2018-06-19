import React from "react";
import AccountRegister from "./AccountRegister";
import {Route} from 'react-router-dom'
import ListCards from "./ListCards";

class Content extends React.Component{

  constructor(props) {
    super(props);

    this.render = this.render.bind(this);

    this.state = {
      newItems: [{}],
      mostPopularItems: [{}],
      numberOfMostPopularPages: 20,
      numberOfNewPages: 10,
      currentNewPageIndex: 1,
      currentMostPopularPageIndex: 11
    }
  }

  // hướng dẫn sửa dụng  ;))     
  // thêm code fetch lại newItems và mostPopularItems vào 2 methods ở dưới, thêm code set lại <numberOf...Pages> và <current...PageIndex> ở componenDidMount

  // mostPopularNextClick() {
  //   // gọi api đổi lại mostPopularItems theo index currentMostPopularPageIndex + 1
  //   alert("mostPopularNextClick")
  //   // đổi lại phần paging của ListCards MostPopular
  //   this.setState({currentMostPopularPageIndex: this.state.currentMostPopularPageIndex + 1});
  // }
    
  mostPopularIndexClick(i) {
    alert("mostPopularIndexClick: "+ i);
    this.setState({currentMostPopularPageIndex: i});
  }

  // newNextClick() {
  //   // gọi api đổi lại newItems theo index currentNewPageIndex + 1
  //   alert("newNextClick");
  //   // đổi lại phần paging của ListCards new
  //   this.setState({currentNewPageIndex: this.state.currentNewPageIndex + 1});
  // }

  newIndexClick(i) {
    alert("newIndexClick: "+ i);
    this.setState({currentNewPageIndex: i});
  }

  componentDidMount() {
	fetch("https://backend-newaaaaa.herokuapp.com//api/product/new")
	//fetch("https://bookstore-express-backend.herokuapp.com/api/product/new")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          newItems: result
        });
      },

      (error) => {
        this.setState({
          error
        });
      }
    );
		fetch("https://backend-newaaaaa.herokuapp.com//api/product/best-seller")
		//fetch("https://bookstore-express-backend.herokuapp.com/api/product/best-seller")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          mostPopularItems: result
        });
      },

      (error) => {
        this.setState({
          error
        });
      }
    );
	}

  render()
  {
      return(
          <div>  

              <ListCards items={this.state.newItems} 
              numberOfPages={this.state.numberOfNewPages} 
              indexClick={i => this.newIndexClick(i)} 
              currentPageIndex={this.state.currentNewPageIndex} 
              nameHeader='Sách Mới'/>

              <ListCards items={this.state.mostPopularItems} 
              numberOfPages={this.state.numberOfMostPopularPages} 
              indexClick={i => this.mostPopularIndexClick(i)}
              currentPageIndex={this.state.currentMostPopularPageIndex} 
              nameHeader='Sách Được Mua Nhiều'/>

          </div>
      )
  }
}
export default Content;