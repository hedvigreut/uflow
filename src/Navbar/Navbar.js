import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavLogo from '../images/navLogo.jpg';
class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      resultyt: [],
      filter: []
    }

    this.handleFilter = this.handleFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount = () => {
    //this.props.model.addObserver(this);
  }

  componentWillUnmount() {
    //this.props.model.removeObserver(this);
  }

  update() {
    this.setState({
      filter: this.props.model.getFilter()
    })
  }

  handleSearch(event) {
    event.preventDefault();
     this.props.model.setFilter(this.state.filter);
     //alert("Vi har nu sparat: " + this.props.model.getFilter() + " i modellen");

  }

  handleFilter = (event) => {
    //alert("Vi sparar: " + event.target.value + " i statet");
    this.state.filter = event.target.value;
  }

  render() {
    return (
      <div className="Navbar">

        <div className="row" id="navbarLogoSearchIcons">

          <nav className="navbar navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">

              </div>

              <form className="navbar-form navbar-left" onSubmit={this.handleSearch}>
                <a className="navbar-brand" href="/explore"><img src={NavLogo} id="logo" alt="logo"/></a>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search for a video or a user" onChange={this.handleFilter} name="search" />
                  <div className="input-group-btn">
                    <button className="btn btn-default" type="submit" value="Submit">
                      <i className="glyphicon glyphicon-search"></i>
                    </button>
                  </div>
                </div>
              </form>

              <div className="navbarIcons">
                <a href="/explore"><i className="material-icons">explore</i></a>
                <i className="material-icons">people</i>
                <a href="/profile"><i className="material-icons">person</i></a>
              </div>
            </div>
          </nav>

        </div>
      </div>
    );
  }
}

export default Navbar;
