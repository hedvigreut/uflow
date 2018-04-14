import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Profile extends Component {

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
      <div className="Profile">

      <div className="row" id="profileNamePictureArea">

       <div className="col-md-3">
       </div>

      <div className="col-md-3">
      <h3 id="profileName"> - Sabina von Essen <Link to="/edit"><span className="glyphicon glyphicon-cog"></span></Link></h3>
      </div>

       <div className="col-md-3">
      <img id="profilePicture" src="https://scontent.farn2-1.fna.fbcdn.net/v/t1.0-9/27867080_10215445099425634_5129961030307661455_n.jpg?_nc_cat=0&oh=a3ba5a28308030d0194c0056085ef359&oe=5B6AB599" alt="profilePicture" />
      </div>

      </div>

      <div className="row" id="profileVideosAreaLeft">
      <div className="col-md-2" id="profileVideosAreaLeft">
      </div>

      <img className="col-md-2 profileThumbnail" id="leftVideo1" src="https://78.media.tumblr.com/cd5d7bb32855c96b3372d47d66f93f24/tumblr_p70g2nSFoY1qzd0p8o1_1280.jpg" alt="leftVideo1" />
      <img className="col-md-2 profileThumbnail" id="leftVideo2" src="https://78.media.tumblr.com/747c6db68cf14d45eacf1c54d958bf4d/tumblr_p72xovrMDq1qeluflo1_1280.jpg" alt="leftVideo2" />
      <div className="col-md-1" id="">
      </div>
      <img className="col-md-2 profileThumbnail" id="rightVideo1" src="https://78.media.tumblr.com/8dc1fd1e525e0e53b06e767f57784291/tumblr_p709z7P91V1qzd0p8o1_1280.gif" alt="rightVideo1" />
      <img className="col-md-2 profileThumbnail" id="rightVideo2" src="https://78.media.tumblr.com/4d17c37edd9412526710464582fe5b84/tumblr_p72tekDhPv1qeb24eo1_1280.jpg" alt="rightVideo2" />

      </div>
      <div className="row" id="profileVideosAreaRight">
      <div className="col-md-3">
      </div>
      <img className="col-md-2 profileThumbnail" id="leftVideo3" src="https://78.media.tumblr.com/b8097c1c1e06270f91abb315e3a166a3/tumblr_p70fnmyMXL1qzd0p8o3_540.jpg" alt="leftVideo3" />
      <img className="col-md-2 profileThumbnail" id="leftVideo4" src="https://78.media.tumblr.com/ec671a96350ab39ee511fc8c6e186865/tumblr_ouzw2ehN271qzwmsso1_1280.jpg" alt="leftVideo4" />
      <div className="col-md-1" id="profileVideosAreaLeftTop">
      </div>
      <img className="col-md-2 profileThumbnail" id="rightVideo7" src="https://78.media.tumblr.com/166d90b17e314b876d1a8f9a259aafa6/tumblr_p70fhgKz8T1qzd0p8o1_1280.jpg" alt="rightVideo7" />
      <img className="col-md-2 profileThumbnail" id="rightVideo8" src="https://78.media.tumblr.com/00952a18f21c02c56101629228e52de3/tumblr_p70f6yyq7x1qzd0p8o1_1280.jpg" alt="rightVideo8" />

      </div>



      </div>
      );
  }
}

export default Profile;
