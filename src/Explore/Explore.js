import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Flow from '../Flow/Flow';

class Explore extends Component {
  render() {
    return (
      <div className="SelectProfile">
        {/* We pass the model as property to the Sidebar component */}
        <Navbar model={this.props.model}/>
        <Flow model={this.props.model}/>

        {/*<Dishes/>*/}
      </div>
    );
  }
}

export default Explore;
