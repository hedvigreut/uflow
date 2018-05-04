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

    this.props.model.getVideos().then(video => {
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

  onMouseEnterHandler() {
    console.log("hovvraaar");
  }

  render(){
    



    return(
      <div>
      <div className="col-md-1"></div>
      <div className="carouselArea col-md-10">
          <iframe width="840" height="472.5" src='https://www.youtube.com/embed/bm_zLDuF7LM' frameBorder="0" allowFullScreen></iframe>  
      </div>

          {
            this.state.resultyt.map((link, i) => {
              var frame =
              <div>
              <div className="youtubeArea">
              <div key={i} className="col-md-2 youtube">
              <iframe width="280" height="157.5" src={link} frameBorder="0"  onMouseOver={this.onMouseEnterHandler} onMouseEnter={this.onMouseEnterHandler} allowFullScreen >
              </iframe>
              </div>
              </div>
              </div>
              return frame;
            })
          }
          {this.frame}

          </div>
          );
  }
}

export default Flow;
