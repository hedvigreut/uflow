import React, {Component} from 'react';
import { Slide } from 'react-slideshow-image';
import { modelInstance } from '../data/model';

import { Link } from 'react-router-dom';

class Flow extends Component {

  constructor(props){
    super(props);

    this.state = {
      resultyt: [],
      currentText: '',
    };

    this.modalVideo = this.modalVideo.bind(this);

    this.navigateToUser = this.navigateToUser.bind(this);

    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }

  handleChangeDescription(event) {
    this.setState({currentText: event.target.value});

  }

  componentDidMount() {

    this.props.model.addObserver(this);
    this.paint();
    modelInstance.createApp();
    var firebase = require("firebase");
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
        this.setState({currentUser: snapshot.val()})
      })
    })
  }


  componentWillUnmount() {
    this.props.model.removeObserver(this);

  }

  update() {
    //console.log("update: " + this.props.model.getFilter());
    this.setState({
      filter : this.props.model.getFilter()
    })
    this.paint();

  }

  paint() {

    this.props.model.getVideos(this.props.model.getFilter()).then(video => {
      this.setState({
        status: 'LOADED',
        resultyt: video,

      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }


  displayShare(event) {

    //var button = document.createElement("input");
    //button.type = "button";
    //button.id = "shareButton";
    //button.value="Share on Uflow";

    //var here = document.getElementById(event.target.id);
    //var parentDiv = document.getElementsByClassName("youtube col-md-8");
    //document.body.appendChild(button);
    //console.log(here);

    //document.body.insertBefore(here, div);


  }


  hideShare() {

  //var oldChild = node.removeChild(child);
  //var button = document.getElementById("shareButton");
  //console.log(document.getElementById("shareButton"));
  //document.body.removeChild(button);
  //console.log("hej");
}

modalVideo(event) {

  var position = document.getElementById("shareVideoArea");
  if(position.firstChild){
    position.firstChild.remove();
  }
  var inputField = document.getElementById("modalDescriptionBoxShare");
  if(inputField.value){
   inputField.value = [];
  }
  var video = document.createElement("iframe");
  var index = event.target.attributes.getNamedItem("index").value;
  var src = this.state.resultyt[index];
  video.src = src;
  this.setState({currentVideo: src})
  //video.className = "col-md-7";
  video.id = "modalVideo";
  position.appendChild(video);
}

navigateToUser(event) {
  this.props.model.setProfileUser(event.target.id);
}


    render() {

      return(
        <div>
          <div className="col-md-1"></div>
          <div className="promotedArea col-md-10">
            <iframe className="exploreChosenYoutube" id="promotedVideo" src={this.state.resultyt[0]} frameBorder="0" allowFullScreen></iframe>
            <input className="row exploreSmallYoutubeButton" type="button" id="sharePromotedVideo" index={0} value="Share on Uflow" data-toggle="modal" data-target="#shareModal" onClick={this.modalVideo}></input>
          </div>

<Link to="/otherProfile"><input id="EkdiCovIEuYypBUDm5guGHJ9PMn2" type="button" value="En annan profil" onClick={this.navigateToUser}></input></Link>

          {
            this.state.resultyt.map((link, i) => {
              var frame =
              <div key={i} className="exploreSmallYoutubeArea col-md-2">
                <iframe className="exploreSmallYoutube row" id= {"exploreSmallYoutube " + i} src={link} frameBorder="0" onMouseOver={this.displayShare} onMouseLeave={this.hideShare} allowFullScreen >
                </iframe>
                <input className="row exploreSmallYoutubeButton" type="button" id="shareSingleVideo" index={i} value="Share on U-flow" data-toggle="modal" data-target="#shareModal" onClick={this.modalVideo}></input>
              </div>
              return frame;
            })
          }
          <div>
            <div id="shareModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;  </button>
                    <h4 className="modal-title" id="myModalLabel">Share video</h4>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-1">
                    </div>
                    <div id="shareVideoArea">
                    </div>
                    <div className="col-md-1">
                    </div>
                    <h5 id="modalDescription">Description</h5>
                    <div className="col-md-1">
                    </div>
                    <textarea className="modalDescriptionBox" id="modalDescriptionBoxShare" placeholder="Write a description for this video" onChange={this.handleChangeDescription}></textarea>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => modelInstance.shareVideo(this.state.currentVideo, this.state.currentUser.id, this.state.currentText)}>Share this on Uflow</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
            </div>

            <div className="exploreYoutubeArea col-md-8">
              {this.frame}
            </div>
          </div>

        </div>
      );
    }
  }
    

export default Flow;
