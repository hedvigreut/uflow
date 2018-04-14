import React, {Component} from 'react';
import './Overview.css';
import TopOverview from '../TopOverview/TopOverview.js';
import { Link } from 'react-router-dom';

class Overview extends Component {
  constructor(props){
    super(props)
    this.state = {
      Menu: this.props.model.getFullMenu(),
      numberOfGuests: this.props.model.getNumberOfGuests(),
    }
  }

  update() {
    this.setState ({
      Menu: this.props.model.getFullMenu(),
      numberOfGuests: this.props.model.getNumberOfGuests(),
    })
  }
  render() {
      let list = this.state.Menu.map((dish) => (
        <div className="col-md-4 col-xs-12" id = "overview">
          <img className="img-responsive" src={dish.image} alt={dish.name} />
          <div className="caption">
            <h5>{dish.title}</h5>
          </div>
          <p className='text-center justify-content-center'>{dish.extendedIngredients.length * this.state.numberOfGuests} SEK</p>
        </div>
      ));

    return (
    	<div className="row h-100">
          <div className="dinnerOverview col-md-12 boxborder">
    		      <TopOverview model={this.props.model}/>
    		      <hr/>
    		      <div className="finalMenu">
                <div className="row row-margin text-center justify-content-center">
                  {list}
    	          </div>
    	        </div>
              <div className="row row-margin justify-content-center">
    	           <h4>Total price: {this.props.model.getTotalMenuPrice()} SEK</h4>
    	        </div>
    	        <hr/>
    	        <div className="row row-margin justify-content-center">
            		<Link to="/printout">
                    <button id="printRecipe" className="btn-lg btn-warning">Print</button>
                </Link>
              </div>
          </div>
      </div>
    )
  }
}

  export default Overview;
