import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/DinnerModel';
class Sidebar extends Component {

  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      dishMenu: this.props.model.getFullMenu(),
      totalPrice: this.props.model.getTotalMenuPrice(),
      activeDish: this.props.model.getActiveDish(),
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      dishMenu: this.props.model.getFullMenu(),
      totalPrice: this.props.model.getTotalMenuPrice(),
      activeDish: this.props.model.getActiveDish(),
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  removeDishFromMenu (dishTitle, e) {
    console.log(dishTitle);
    modelInstance.removeDishFromMenu(dishTitle);
  }

  render() {


    function plusNumberOfGuests () {
      this.props.model.setNumberOfGuests(parseInt(this.state.numberOfGuests) +1);
    }

    function minusNumberOfGuests () {
      this.props.model.setNumberOfGuests(this.state.numberOfGuests -1);
    }

    return (
      <div className="Sidebar col-md-3 col-xs-12" id="sidebar">
        <div className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button type="button" className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="navbar-brand">
              <h3>My Dinner</h3>
            </div>
            <p>
              People: {this.state.numberOfGuests}
              <button id='plusButton' onClick={plusNumberOfGuests.bind(this)}> +
              </button>
              <button id='minusButton' onClick={minusNumberOfGuests.bind(this)}> -
              </button>
              <br/>
            </p>
            <div className="collapse show navbar-collapse" id="navbarNavDropdown">
              <table className="table">
      					<thead>
      						<tr>
      							<th>Dish name</th>
      							<th>Cost</th>
      						</tr>
      					</thead>
      					<tbody id="sidebar-dishMenu">
                  {this.state.dishMenu.map((dish) =>

                    <tr key={dish.title}>
                      <td>{dish.title}</td>
                      <td>{dish.extendedIngredients.length * this.state.numberOfGuests} SEK
                        <button onClick={this.removeDishFromMenu.bind(this, dish.title)} className='remove'>X</button>
                      </td>
                    </tr>)}
                  <tr key='totalPrice'>
                    <td>Total price: </td>
                    <td>{this.state.totalPrice} SEK</td>
                </tr>
      					</tbody>
      				</table>
              <Link to="/overview">
              <button className="confirmButton btn-md btn-warning">Confirm dinner</button>
              </Link>
            </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
