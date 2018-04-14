import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

class SelectDish extends Component {

  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      type: this.props.model.getType(),
      filter: this.props.model.getFilter(),
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    this.props.model.addObserver(this)
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  update() {
    this.setState({
      type: this.props.model.getType(),
      filter: this.props.model.getFilter(),
    })
  }

  handleNewType = (e) => {
    this.props.model.setType(e.target.value);
  }

  handleNewFilter = (e) => {
    this.props.model.setFilter(e.target.value);
  }


  render() {
    return (
      <div className="SelectDish">

        {/* We pass the model as property to the Sidebar component */}
        <div className="row">
          <Sidebar model={this.props.model}/>
          <div className="col-md-9">
              <div className="searchView col-xs-12 col-md-8" id="searchView">
               <div className="row">
                 <h4>FIND A DISH</h4>
               </div>
               <div id="search">
                 <input id="words" type="search" placeholder="Enter name of dish or ingredient" onChange={this.handleNewFilter}/>
                 <select name="dishType" id="dishType" onChange={this.handleNewType}>
                  <option value="all" id='all'>All</option>
                   <option value="breakfast" id='breakfast'>Breakfast</option>
                   <option value="main course" id='main course'>Main Course</option>
                   <option value="side dish" id='side dish'>Side Dish</option>
                   <option value="dessert" id='dessert'>Dessert</option>
                   <option value="appetizer" id='appetizer'>Appetizer</option>
                   <option value="salad" id='salad'>Salad</option>
                   <option value="bread" id='bread'>Bread</option>
                   <option value="soup" id='soup'>Soup</option>
                   <option value="drink" id='drink'>Drink</option>
                   <option value="beverage" id='beverage'>Beverage</option>
                   <option value="sauce" id='sauce'>Sauce</option>
                 </select>
               </div>
             </div>
            <Dishes/>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectDish;
