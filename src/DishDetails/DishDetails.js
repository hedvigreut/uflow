import React, {Component} from 'react';
import './DishDetails.css';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';

class DishDetails extends Component {

  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      status: 'INITIAL',
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
    this.props.model.getDish(this.props.id).then(dish => {
      this.setState({
        status: 'LOADED',
        dish: dish,
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
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
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  render() {
      let title = null;
  	  let instructions = null;
  	  let image = null;
  	  let ingredients = null;
      let ingPrice = null;
      let price = null;

  	  switch (this.state.status) {
        case 'INITIAL':
          instructions = <em>Loading...</em>
          break;
        case 'LOADED':
          title = this.state.dish.title
  		    image = this.state.dish.image
  		    instructions = this.state.dish.instructions
          ingPrice = this.state.numberOfGuests
  		    ingredients = this.state.dish.extendedIngredients.map( (ingredient) =>
            <tr key={ingredient.name}>
    					<td>{this.state.numberOfGuests * ingredient.amount + " " + ingredient.unit}</td>
    					<td>{ingredient.name}</td>
              <td>{ingPrice} SEK</td>
  				  </tr>
          )
  		    price = <tr><td>Total price: </td><td>{this.state.dish.extendedIngredients.length * this.state.numberOfGuests} SEK</td></tr>
        break;
        default:
          instructions = <b>Failed to load data, please try again</b>
        break;
      }
      function addDishToMenu () {
        this.props.model.addDishToMenu(this.state.dish);
        this.props.model.setActiveDish(this.state.dish);
      }


      return (
      		<div className="row h-100">
           {/* sidebar view */}
      		   <Sidebar model={this.props.model}/>

             {/*details and ingredients*/}
        	   <div className="DishDetails col-md-8 col-xs-12">
                <div className="row">

                    {/*details view*/}
                    <div id="details" className="col-md-12 col-xs-12">
                      <div id="dishName">
                        <h4>{title}</h4>
                      </div>
        			        <img className="img col-md-12" src={image} alt={title}/>
                      <div id="instructions">
                        <h4>Preparation</h4>
                        <p>{instructions}</p>
                      </div>
            		      <Link to="/search">
                      <button className="backButton btn-md btn-warning">Back to search</button>
            		      </Link>
                    </div>

                    {/*ingredients view*/}
                    <div id="ingredients" className="col-md-12">
          			       <h4>Ingredients for {this.state.numberOfGuests}  people</h4>
          			       <table className="table">
          			         <tbody id="ingredientsList">
          		              {ingredients}
          		              {price}
                  			</tbody>
                    	</table>
          		      </div>
                    <Link to="/search">
                    <button onClick={addDishToMenu.bind(this)} id="addToMenu" className="btn-md btn-warning"> Add to menu </button>
                    </Link>
                  </div>
              </div>
          </div>
        );
    }
}

export default DishDetails;
