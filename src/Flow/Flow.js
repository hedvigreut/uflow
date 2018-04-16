import React, {Component} from 'react';
import { Slide } from 'react-slideshow-image';

const images = [
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
        resultyt: video
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  render(){
    // console.log(finalURL);
    //console.log(this.state.resultyt);

    return(
      <div>
        <div className="carouselArea col-md-10">
          {/*{
            this.state.resultyt.map((link, i) => {
            console.log(link);
            var frame =
            <div key={i} className="col-md-2 youtube">
            <img   id="carouselThumbnail" width="840" height="472.5" src={"hej"} alt="video" frameBorder="0" allowFullScreen/>
            </div>
            return frame;
            })
            }*/}


            <Slide
              duration = {5000}
              transitionDuration={1000}
              images= {images}
              />
          </div>

          {
            this.state.resultyt.map((link, i) => {
              console.log(link);
              var frame =
              <div>
                <div className="youtubeArea">
                  <div key={i} className="col-md-2 youtube">
                    <iframe width="280" height="157.5" src={link} frameBorder="0" allowFullScreen>
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
