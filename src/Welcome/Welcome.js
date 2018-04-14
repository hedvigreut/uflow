import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <p>
            Welcome to UFLOW!
        </p>

        <Link to="/explore">
            <button>Start exploring</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
