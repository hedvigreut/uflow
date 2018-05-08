import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import { modelInstance } from '../data/model';
import firebase from 'firebase';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile_pic: null,
      profile_videos: ['https://www.youtube.com/embed/sjyghgaE3wY', 'https://www.youtube.com/embed/zlgtkA6cORk', 'https://www.youtube.com/embed/c2NmyoXBXmE'],
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
        key.map((key) =>
          firebase.database().ref('/shares/' + user.uid + '/' + key).once('value', videos => {
            flow_videos.push(videos.val());
            this.setState({profile_videos: flow_videos});
          })
        );
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
      var profile_pic = currentUser.profile_pic;
      var username = currentUser.email;
      username = username.substring(0,username.indexOf("@"));
      username = username.replace(/[^a-z0-9]+|\s+/gmi, "");
      var ID = currentUser.id;
      var videos = currentUser.shares;
    }


    return (
      <div className="Profile">
        <NavBar />

        <div className="col-md-1">
        </div>

        <div className="col-md-10 jumbotron">
          <div className="row" id="profileNamePictureArea">
            <div className="col-md-7">
              <h3 id="profileName"> {username} <Link to="/edit"><span className="glyphicon glyphicon-cog"></span></Link></h3>
            </div>

            <div className="col-md-5">
              <img id="profilePicture" src={profile_pic} alt="profilePicture" />
            </div>
          </div>

          <div id="profileFlow">
            {
              this.state.profile_videos.map((link, i) => {

                var frame =
                <div>
                  <br></br>
                <div className="youtubePost">
                  <div className="youtubePostHead row">
                    <img id="profilePictureSmall" className="col-md-6" src={profile_pic} alt="profilePictureSmall" />
                    <h2 className="col-md-6">{username}<p></p><p className="postText">{this.state.texts[i]}</p></h2>
                  </div>

                  <div className="col-md-1"></div>
                  <div className="col-md-10">
                    <iframe className='profileVideo col-md-12' height="472.5" key={'video' + i} src={link} frameBorder="0" allowFullScreen >
                    </iframe>
                    <div className="col-md-12">
                    <button className="shareButton" onClick={ () => {this.shareVideo(link)}}>Share on uflow</button>
                    </div>
                  </div>
                </div>
                <br></br>
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

export default Profile;
