import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavLogo from '../images/navLogo.jpg';
import { modelInstance } from '../data/model';
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
    modelInstance.createApp();
    var firebase = require("firebase");
    var allUsers = [];
    firebase.database().ref('/users/').once('value', snapshot => {
      var key = Object.keys(snapshot.val());
      //console.log(key);
      key.map((key) =>
      firebase.database().ref('/users/' + key + '/username').once('value', username => {
        allUsers.push(username.val());
        //console.log(allUsers);
        this.setState({
          users: allUsers});
        })
      )
    })
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
    var position = document.getElementById("exploreHeadline");
    position.innerHTML = "Results found for <b>videos</b>";
  }

  handleFilter = (event) => {
    this.setState({filter: event.target.value});
  }

  handleLocation() {
    if (window.location.pathname !== "/explore") {
      window.location = "explore";
    }
  }

  render() {
    return (
      <div className="Navbar">

        <div className="row" id="navbarLogoSearchIcons">

        <nav className="navbar navbar-inverse navbar-static-top navbar-fixed-top">
  <div className="container-fluid">
    <div className="navbar-header">

      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="/explore"><img src="https://uflow-b640f.firebaseapp.com/static/media/navLogo.f5d48d60.jpg" id="logo" alt="logo"/></a>
    </div>

    <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav">
      <form className="navbar-form navbar-left" id="form_search" onSubmit={this.handleSearch}>
                <div className="input-group" id="input-group_search" onClick={this.handleLocation}>
                  <input type="text" className="form-control" placeholder="Search for a video or a user" onChange={this.handleFilter} name="search" />
                  <div className="input-group-btn">
                    <button className="btn btn-default" type="submit" value="Submit">
                      <i className="glyphicon glyphicon-search"></i>
                    </button>
                  </div>
                </div>
              </form>
        <li><a id="dropdownElements" href="/explore"><span className="material-icons">explore</span>Explore</a></li>
        <li><a id="dropdownElements" href="/friendflow"><span className="material-icons">people</span>Friendflow</a></li>
        <li><a id="dropdownElements" href="/chatroom"><span className="material-icons">chat_bubble</span>Chatt</a></li>
        <li><a id="dropdownElements" href="/profile"><span className="material-icons">people</span>Profile</a></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/"><span className="material-icons" onClick={() => modelInstance.googleLogout()}>settings_power</span> Log out</Link></li>
      </ul>
    </div>
  </div>
</nav>

        </div>
      </div>
    );
  }
}

export default Navbar;
