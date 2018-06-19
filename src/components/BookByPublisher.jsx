import React from "react";
import ListCards from "./ListCards";

class BookByPublisher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{}]
    }
  }

  fetchAPI = (id) => {
    fetch(`https://backend-newaaaaa.herokuapp.com//api/product/publisher/${id}`)
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

  componentDidMount() {
    this.fetchAPI(this.props.match.params.id);
  }

  componentWillReceiveProps(newprops) {
    this.fetchAPI(newprops.match.params.id);
  }

  render() {
    return (
      <ListCards items={this.state.items} nameHeader='Sách Theo Nhà Xuất Bản' />
    )
  }
}

export default BookByPublisher;