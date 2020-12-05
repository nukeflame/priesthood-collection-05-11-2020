import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import classNames from "classnames";
import { isEmpty } from "lodash";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
    fetchSearchItems: PropTypes.func,
  };

  static defaultProps = {
    suggestions: [],
    fetchSearchItems: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      searchQuery: "",
    };
  }

  handleChangeSearch = (e) => {
    const { suggestions } = this.props;
    const userInput = e.target.value;

    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      searchQuery: userInput.substr(0, 60),
    });
  };

  searchEnter = (e) => {
    e.preventDefault();
    const { searchQuery } = this.state;
    this.props.history.push(
      `/shop-catalog/?${queryString.stringify(
        { q: searchQuery },
        { encode: false }
      )}`
    );

    const data = {
      searchQuery,
      searchType: "searchBar",
    };
    //
    this.props.fetchSearchItems(data);
  };

  handleKeydownSearch = (e) => {
    const { searchQuery, activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      const query = filteredSuggestions[activeSuggestion];
      const q = isEmpty(query) ? searchQuery : query;
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
      });

      let data = {};

      if (activeSuggestion > 0) {
        this.setState({ searchQuery: q });
        this.props.history.push(
          `/shop-catalog?${queryString.stringify({ q })}`
        );

        data = {
          searchQuery: q,
          searchType: "searchBar",
        };
      } else {
        this.setState({ searchQuery });
        this.props.history.push(
          `/shop-catalog?${queryString.stringify({ q: searchQuery })}`
        );

        data = {
          searchQuery,
          searchType: "searchBar",
        };
      }

      this.props.fetchSearchItems(data);
    } // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      const filterdList = filteredSuggestions.filter((s, i) => i < 9);
      if (activeSuggestion - 1 === filterdList.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  handleClickSearch = (e) => {
    e.preventDefault();
    const searchText = e.currentTarget.innerText;
    this.props.history.push(
      `/shop-catalog?${queryString.stringify({
        q: searchText,
      })}`
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      searchQuery: searchText,
    });

    // const data = {
    //   searchQuery: searchText,
    //   searchType: "searchBar",
    // };
  };

  handleClearSearch = (e) => {
    e.preventDefault();
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      searchQuery: "",
    });
  };

  componentDidMount() {
    //search category
    const search = this.props.location.search;
    if (!isEmpty(search)) {
      const params = queryString.parse(search);
      let data = {};
      if (params.sl && params.pid) {
        data = {
          slug: params.sl,
          pId: params.pid,
          searchType: "homeSearch",
        };
      } else {
        data = {
          searchQuery: params.q,
          searchType: "searchBar",
        };
      }

      this.props.fetchSearchItems(data);
    }
  }

  render() {
    const {
      searchQuery,
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
    } = this.state;

    const filterdList = filteredSuggestions.filter((s, i) => i < 9);

    let suggestionsListComponent;

    if (showSuggestions && searchQuery) {
      if (filterdList.length) {
        suggestionsListComponent = (
          <div className="sec ">
            {filterdList.map((suggestion, index) => {
              let className = "";
              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "active";
              }
              return (
                // eslint-disable-next-line
                <a
                  href="#"
                  onClick={this.handleClickSearch}
                  className={"itm " + className}
                  key={suggestion}
                >
                  {suggestion}
                </a>
              );
            })}
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <div className="search-bar">
          <div className="find">
            <div className="searchIcon">
              <i className="fa fa-search"></i>
            </div>
            <input
              type="text"
              className="search-boxbar"
              autoComplete="off"
              name="searchQuery"
              value={searchQuery}
              onKeyDown={(e) => this.handleKeydownSearch(e)}
              onChange={(e) => this.handleChangeSearch(e)}
            />

            <div
              className={
                "clearIcon " +
                classNames({ displayBlock: searchQuery && searchQuery.length })
              }
            >
              {/* eslint-disable-next-line */}
              <a href="#" onClick={this.handleClearSearch}>
                <i className="fa fa-close"></i>
              </a>
            </div>
          </div>
          {/* seach related container */}
          {suggestionsListComponent}
        </div>
        <div
          className="icon-header-item searchbar-icon"
          onClick={this.searchEnter}
        >
          <i className="zmdi zmdi-search"></i>
        </div>
      </React.Fragment>
    );
  }
}

export default Autocomplete;
