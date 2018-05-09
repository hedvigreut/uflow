import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import { modelInstance } from '../data/model';
import firebase from 'firebase';

class FlowVertical extends Component {

  constructor(props) {
    super(props);
    this.state = {
      FlowVertical_pic: null,
      FlowVertical_videos: ['https://www.youtube.com/embed/sjyghgaE3wY', 'https://www.youtube.com/embed/zlgtkA6cORk', 'https://www.youtube.com/embed/c2NmyoXBXmE'],
      texts: ['Den här videon var rolig och därför ville jag dela den.', 'Zara Larsson <3333', 'Pluggtips!']
    };
}

  componentDidMount() {

    /*this.props.model.getVideos().then(video => {
      this.setState({
        status: 'LOADED',
        resultyt: video,

      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })*/
    modelInstance.createApp()
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
        this.setState({currentUser: snapshot.val()})
      })
      var flow_videos = [];
      firebase.database().ref('/shares/' + user.uid).once('value', snapshot => {
        var key = Object.keys(snapshot.val());
        if (key !== undefined) {
          key.map((key) =>
            firebase.database().ref('/shares/' + user.uid + '/' + key).once('value', videos => {
              flow_videos.push(videos.val());
              this.setState({FlowVertical_videos: flow_videos});
            })
          );
        }
      })
    })

  }

  shareVideo(video) {
    if (this.state.currentUser !== null) {
      modelInstance.shareVideo(video, this.props.currentUser.uid);
    }
  }

  render() {
    var currentUser = this.state.currentUser;

    if (currentUser !== undefined) {
      console.log(currentUser)
      var FlowVertical_pic = currentUser.FlowVertical_pic;
      var username = currentUser.email;
      username = username.substring(0,username.indexOf("@"));
      username = username.replace(/[^a-z0-9]+|\s+/gmi, "");
      var ID = currentUser.id;
      var videos = currentUser.shares;
    }


    return (
      <div className="FlowVertical">
        <NavBar />

        <div className="col-md-1">
        </div>

        <div className="col-md-10">

          <div id="FlowVerticalFlow">
            {
              this.state.FlowVertical_videos.map((link, i) => {

                var frame =
                <div>
                  <br></br>
                <div className="youtubePost">
                <div className="friendFlowArea">
                  <div className="youtubePostHead row">
                    <img id="FlowVerticalPictureSmall" className="col-md-6" src={FlowVertical_pic} alt="FlowVerticalPictureSmall" />
                    <h2 className="col-md-6">{username}<p></p><p className="postText">{this.state.texts[i]}</p></h2>
                  </div>

                  <div className="col-md-1"></div>
                  <div className="col-md-10 youtubePostVideo">
                    <iframe className='FlowVerticalVideo col-md-12' width= "840" height="472.5" key={'video' + i} src={link} frameBorder="0" allowFullScreen >
                    </iframe>
                    <div className="col-md-12">
                    <button className="shareButton" id="test" onClick={ () => {this.shareVideo(link)}}>Share on uflow</button>
                    </div>
                  </div>
                </div>
                <br></br>
                </div>
                </div>
                return frame;
              })
            }
          </div>
        </div>
    </div>
  );
}
}

export default FlowVertical;
