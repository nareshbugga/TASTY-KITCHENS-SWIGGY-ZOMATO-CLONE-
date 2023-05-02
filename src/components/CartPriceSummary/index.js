/* eslint-disable react/no-unknown-property */
import {BiRupee} from 'react-icons/bi'
import ReactContext from '../../ReactContext/CartContext'
import './index.css'

const CartPriceSummary = props => {
  const {placeOrder} = props

  const placeOrderItems = () => {
    placeOrder()
  }

  return (
    <ReactContext.Consumer>
      {value => {
        const {cartList} = value
        let totalPrice = 0
        cartList.forEach(each => {
          totalPrice += each.cost * each.quantity
        })
        return (
          <div className="summary-container">
            <h1 className="summary-heading">Order Total:</h1>
            <div>
              <p className="price-summary" testid="total-price">
                <BiRupee className="summary-rupee" />
                {totalPrice}
              </p>
              <button
                type="button"
                className="place-order-button"
                onClick={placeOrderItems}
              >
                Place Order
              </button>
            </div>
          </div>
        )
      }}
    </ReactContext.Consumer>
  )
}

export default CartPriceSummary
