import React from "react";
import ListCards from "./ListCards";

class BookByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsByCategory: [{}]
    }
  }

  fetchAPI = (id) => {
    fetch(`https://backend-newaaaaa.herokuapp.com//api/product/category/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            itemsByCategory: result
          });
        },

        (error) => {
          this.setState({
            error
          });
        }
      );
  }

  componentDidMount() {
    this.fetchAPI(this.props.match.params.id);
  }

  componentWillReceiveProps(newprops) {
    this.fetchAPI(newprops.match.params.id);
  }

  render() {
    return (
      <ListCards items={this.state.itemsByCategory} nameHeader='Sách Theo Thể Loại' />
    )
  }
}

export default BookByCategory;