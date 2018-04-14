import React, {Component} from 'react';
import './Dishes.css';
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';
import Dish from '../Dish/Dish';

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      type: modelInstance.getType(),
      filter: modelInstance.getFilter(),
      status: 'INITIAL'
    }
  }

  loadData(){
    modelInstance.getAllDishes(modelInstance.getType(), modelInstance.getFilter()).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results, dishesBaseUri: dishes.baseUri,
        type: modelInstance.getType(),
        filter: modelInstance.getFilter(),
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    modelInstance.addObserver(this)
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.loadData()
  }



  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  update() {
    this.setState({
      type: modelInstance.getType(),
      filter: modelInstance.getFilter(),
    })
    this.loadData();
  }

  render() {
    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <em>Loading...</em>
        break;
      case 'LOADED':
        dishesList = this.state.dishes.map((dish) =>
          <Dish key={dish.id} baseUri ={this.state.dishesBaseUri} dish = {dish} />
        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes">
        <div className='row row-margin text-center justify-content-center justify-content-lg-start no-gutters' id="DishView">
          {dishesList}
        </div>
      </div>
    );
  }
}

export default Dishes;
