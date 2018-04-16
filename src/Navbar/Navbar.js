import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
class Navbar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Navbar">

      <div className="row" id="profileNamePictureArea">

      <nav className="navbar">
      <div className="container-fluid">
      <div className="navbar-header">
      <a className="navbar-brand" href="#"><img src={logo} id="logo" alt="logo"/></a>
      </div>
      {/*<ul className="nav navbar-nav">
      <li className="active"><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
      </ul>*/}
      <form className="navbar-form navbar-left" action="/action_page.php">
      <div className="input-group">
      <input type="text" className="form-control" placeholder="Search" name="search"/>

      <div className="input-group-btn">
      <button className="btn btn-default" type="submit">
      <i className="glyphicon glyphicon-search"></i>
      </button>
      </div>
      </div>
      </form>

      </div>
      </nav>



      </div>

      </div>
      );
  }
}

export default Navbar;
