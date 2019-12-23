import React, { Component } from "react"; 
import util from '../util';

class Basket extends Component {
  render() {
      const { cartItems } = this.props;
    return (
     <div className="alert alert-info">
        {cartItems.length===0?"Basket is empty": <div> You have { cartItems.length } products in the basket</div>}
        {cartItems.length > 0 && 
            <div>
                <ul>
                    {cartItems.map(item => 
                        <li>
                            <b>{ item.title } </b>
                    <span> x { item.count } = {util.formatCurrency((item.price * item.count).toFixed(2))}</span>
                            <button className="btn btn-danger" onClick={(e) => this.props.handleRemoveFromCart(e, item)}>X</button>
                        </li>
                    )}
                </ul>
                Total: { util.formatCurrency(cartItems.reduce((a, c) => a + c.price*c.count, 0)) }
                <br />
                <button className="btn btn-primary">Checkout</button>
            </div>
        }

     </div>
    );
  }
}

export default Basket;