import React, { Component } from 'react';
import Profile from '../Profile/Profile';
{/*import Dishes from '../Dishes/Dishes';*/}

class SelectProfile extends Component {
  render() {
    return (
      <div className="SelectProfile">
        <h2>This is the Select Profile screen</h2>

        {/* We pass the model as property to the Sidebar component */}
        <Profile model={this.props.model}/>
      </div>
    );
  }
}

export default SelectProfile;
