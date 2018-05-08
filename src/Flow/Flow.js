import React, {Component} from 'react';
import { Slide } from 'react-slideshow-image';

let images = [
'https://img.youtube.com/vi/g3zsMnNpgsA/maxresdefault.jpg',
'https://img.youtube.com/vi/2lx-RNW-JlE/maxresdefault.jpg',
'https://img.youtube.com/vi/2gfOO9c53Zs/maxresdefault.jpg',
'https://img.youtube.com/vi/ISSxMHsvvyw/maxresdefault.jpg'
]



class Flow extends Component {

  constructor(props){
    super(props);

    this.state = {
      resultyt: []
    };
  }

  componentDidMount() {

    this.props.model.addObserver(this);

    //alert("Vi har att filter är: " + this.props.model.getFilter());

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

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  update() {
    console.log("update: " + this.props.model.getFilter());
    this.setState({
      filter : this.props.model.getFilter()
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
  var video = document.createElement("iframe");
  var button = document.getElementById(event.target.id);
  var src = document.getElementById(event.target.id).previousSibling.src; 
  video.src = src;
  video.id = "modalVideo";
  var position = document.getElementById("shareVideoArea");
  //console.log(position);
  //console.log(video);
  position.appendChild(video);
}

render(){

  return(
    <div>

    <div className="col-md-1"></div>
    <div className="carouselArea col-md-10">
    <iframe className="exploreChosenYoutube"width="840" height="472.5" src='https://www.youtube.com/embed/bm_zLDuF7LM' frameBorder="0" allowFullScreen></iframe>
    </div>

    {
      this.state.resultyt.map((link, i) => {
        var frame =
        <div className="exploreSmallYoutubeArea col-md-2">
        <iframe className="exploreSmallYoutube row" id= {"exploreSmallYoutube" + i} src={link} frameBorder="0" onMouseOver={this.displayShare} onMouseLeave={this.hideShare} allowFullScreen >
        </iframe>
         <input className="row exploreSmallYoutubeButton" type="button" id="shareSingleVideo" value="Share on Uflow" data-toggle="modal" data-target="#shareModal" onClick={this.modalVideo}></input>
         </div>
        return frame;
      })
    }
    <div>
    <div id="shareModal" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
    <div className="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;  </button>
    <h4 className="modal-title" id="myModalLabel">Share video</h4>
    </div>
    <div className="modal-body">
    <div id="shareVideoArea">
    </div>
    <h5 id="modalDescription">Description</h5>
    <textarea className="modalDescriptionBox" placeholder="Write a description for this video"></textarea>
    </div>
    <div className="modal-footer">
    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
    <button type="button" className="btn btn-primary">Share this on Uflow</button>
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
