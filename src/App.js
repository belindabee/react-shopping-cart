import React, { Component } from 'react';
import './App.css';
import Products from './components/Products'
import Filter from './components/Filter';
import Basket from './components/Basket';
import { Provider } from 'react-redux';
import store from './store';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state= {
      products: [],
      filteredProducts: [],
      cartItems: []
    }
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  componentWillMount() {

    if (localStorage.getItem('cartItems')) {
      this.setState({cartItems: JSON.parse(localStorage.getItem('cartItems'))})
    }
  }

  handleChangeSort = (e) => {
    this.setState({sort: e.targetValue});
    this.listProducts();
  }

  handleChangeSize = (e) => {
    this.setState({size: e.target.value});
    this.listProducts();

  }

  handleAddToCart(e, product) {
    this.setState(state=> {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(item => {
        if (item.id === product.id) {
          productAlreadyInCart = true;
          item.count++;
        }
      })
      if (!productAlreadyInCart) {
        cartItems.push({...product, count:1});
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return cartItems;
    })
  }

  handleRemoveFromCart(e, item) {
    this.setState(state => {
      const cartItems = state.cartItems.filter(elm => elm.id !== item.id);
      localStorage.setItem('cartItems', cartItems)
      return {cartItems};
    });
  }

  listProducts() {
    this.setState(state => {
      if (state.sort !== '') {
        state.products.sort((a,b) => (state.sort === 'lowest' ? (a.price < b.price?1:-1) : (a.price > b.price?1:1)))
      } else {
        state.products.sort((a,b) => (a.id<b.id?1:-1));
      }
      
      if (state.size !== '') {
        return { filteredProducts:state.products.filter( a => 
          a.availableSizes.indexOf(state.size.toUpperCase())>=0
          )
        };
      }

      return {filteredProducts: state.products};
    });
  }

  render () {
    return (
      <Provider store={store}>
        <div className="container">
          <h1>Ecommerce Shopping Cart Application</h1>
          <hr />
    
          <div className="row">
            <div className="col-md-8">
              <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize} handleChangeSort={this.handleChangeSort} count={this.state.filteredProducts.length}/>
              <Products products={ this.state.filteredProducts } handleAddToCart= { this.handleAddToCart } />
            </div>
            <div className="col-md-4">
              <Basket cartItems={ this.state.cartItems } handleRemoveFromCart = { this.handleRemoveFromCart }/>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}