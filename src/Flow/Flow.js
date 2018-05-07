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

    alert("Vi har att filter är: " + this.props.model.getFilter());

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
              <iframe className="exploreSmallYoutube col-md-2" id={"exploreSmallYoutube" + i} width="280" height="157.5" src={link} frameBorder="0" onMouseOver={this.hoverAnimate} allowFullScreen >
              </iframe>
              return frame;
            })
          }
           <div>
              <div className="youtube col-md-8">
          {this.frame}
          </div>
              </div>

          </div>
          );
  }
}

export default Flow;
