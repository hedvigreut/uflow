import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
class Navbar extends Component {

  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
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
