import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import { modelInstance } from '../data/model';
import NavBar from "../Navbar/Navbar";


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
          <div className="Signup container">
            <NavBar />
            <div className="col-md-2">
            </div>
            <div className="col-md-8 jumbotron" id="signup">
              <img className="img-responsive welcomeLogo" src={logo} alt="logo"/>

              <h3>Full name: <input type="text" placeholder={name}/></h3>
              <br></br>

              <h3>Email: <input type="text" placeholder={email}/></h3>
              <br></br>

              {/*}<h3>Password: <input type="text" placeholder="Ex hello123"/></h3>
            <br></br>*/}

              <Link to="/profile">
                <button className="actionButton"> Continue </button>
              </Link>
            </div>
          </div>
      );
    }
}

export default Signup;
