import React, { Component } from "react"; 
import util from '../util';
import { connect } from "react-redux";
import {fetchProducts} from '../actions/productActions'

 class Products extends Component {

  componentWillMount(){
    this.props.fetchProducts()
  }

  render() {
      const productsItems = this.props.products.map( product => (
          <div key={ product.id } className="col-md-4">
            <div className="thumbnail text-center">
                <a href={`#${product.id}`} onClick={(e) => this.props.handleAddToCart(e, product)}>
                    <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />
                    <p>
                        { product.title }
                    </p>
                </a>
                <b> { util.formatCurrency(product.price) } </b>
                <button className="btn btn-primary" onClick={ (e) => this.props.handleAddToCart(e, product) } >Add To Cart</button>
            </div>
          </div>
      ));
    return (
     <div className="row">
       { productsItems }
     </div>
    );
  }
}
const mapStateToProps = state => ({products: state.products.items})
export default connect(mapStateToProps, {fetchProducts})(Products);