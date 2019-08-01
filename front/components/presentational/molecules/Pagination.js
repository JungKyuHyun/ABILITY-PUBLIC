import React from "react";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css

class PaginationUI extends React.Component {
  state = {
    currentPage: 1
  };
  changeCurrentPage = numPage => {
    this.setState({ currentPage: numPage });
  };
  render() {
    return (
      <div>
        <Pagination
          currentPage={this.state.currentPage}
          totalPages={100}
          changeCurrentPage={this.changeCurrentPage}
          theme="square-fill"
        />
        <h2>current Page:{this.state.currentPage}</h2>
      </div>
    );
  }
}
export default PaginationUI;