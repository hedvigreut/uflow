import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import { modelInstance } from '../data/DinnerModel';


class Signup extends Component {

  constructor(props) {
    super(props)
    }

    render() {

      var currentUser = this.props.currentUser;

      if (currentUser !== null) {
        var name = currentUser.displayName;
      }


      return (
        <div className="Signup">
          <img src={logo} id="logo" alt="logo"/>
          <br></br>
          <p>Full name: {name}</p>
          <br></br>
          <p>Email: </p>
          <br></br>
          <p>Password: </p>
          <Link to="/profile">
            <button> Continue </button>
          </Link>
        </div>
      );
    }
}

export default Signup;
