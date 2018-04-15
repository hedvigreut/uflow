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
        var email = currentUser.email;
      }


      return (
        <div className="Signup">
          <div className="col-md-4">
          </div>
          <div className="col-md-3">
            <img src={logo} id="logo" alt="logo"/>
            <br></br>
            <p>Full name: </p>
            <input type="text" placeholder={name}/>
            <br></br>
            <p>Email: </p>
            <input type="text" placeholder={email}/>
            <br></br>
            <p>Password: </p>
            <Link to="/profile">
              <button> Continue </button>
            </Link>
          </div>
        </div>
      );
    }
}

export default Signup;
