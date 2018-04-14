import React, {Component} from 'react';
import './Dish.css';
import { Link } from 'react-router-dom';


class Dish extends Component {

  dishDetails() {

  }

  render() {
    return (


      <div id={this.props.dish.id} className="Dish col-8 col-lg-2">
        <Link to={"/dishdetails/"+this.props.dish.id}>
          <div className="thumbnail boxborder">
            <img className="img-responsive" src={this.props.baseUri + this.props.dish.image} alt={this.props.dish.title}/>
            <div className="caption">
              <h5>{this.props.dish.title}</h5>
            </div>
          </div>
        </Link>
      </div>


    );
  }
}

export default Dish;
