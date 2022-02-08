import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import env from "react-dotenv";
import Pagination from "./components/pagination";
import SearchResult from "./components/searchResult";

class App extends Component {
  state = {
    data: [],
    isLoaded: false,
    searchWord: "",
    isSearchClicked: false,
    itemInPage: 20,
    num_charities: 0,
    currentPage: 1,
    totalPage: 0,
    pageCount: 10,
  };

  fetchData = async (name, page) => {
    const key = env.API_KEY;
    const url = `/api/charities/v2/search?name=${name}&fields=id,name,address,abstract&results=20&page=${page}`;
    const requestOption = {
      method: "GET",
      headers: {
        "X-API-Key": key,
      },
    };
    const response = await fetch(url, requestOption);
    const data = await response.json();
    const totalPage = Math.ceil(data.num_charities / this.state.itemInPage);

    this.setState({
      data: data.charities,
      num_charities: data.num_charities,
      totalPage,
      isLoaded: true,
    });
  };

  handleWord = (e) => {
    const searchWord = e.target.value;
    this.setState({
      searchWord,
    });
  };

  handleSearch = () => {
    const searchWord = this.state.searchWord;
    const currentPage = this.state.currentPage;
    this.setState({
      isSearchClicked: true,
    });
    this.fetchData(searchWord, currentPage);
  };

  pageClick = (page) => {
    const searchWord = this.state.searchWord;
    this.fetchData(searchWord, page);
    this.setState({
      currentPage: page,
    });
  };

  render() {
    const {
      data,
      isLoaded,
      currentPage,
      totalPage,
      pageCount,
      isSearchClicked,
    } = this.state;
    return (
      <div className="main">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search Here"
            aria-describedby="basic-addon2"
            onChange={(e) => this.handleWord(e)}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary"
              id="searchBtn"
              onClick={this.handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {isLoaded && <SearchResult data={data} />}
        {isSearchClicked && (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            pageCount={pageCount}
            pageClick={this.pageClick}
          />
        )}
      </div>
    );
  }
}

export default App;
