import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import CartItem from '../CartItem'
import Header from '../Header'
import Footer from '../Footer'
import CartPriceSummary from '../CartPriceSummary'
import ReactContext from '../../ReactContext/CartContext'
import './index.css'

class Cart extends Component {
  state = {showPaymentView: false}

  renderCartIsEmpty = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dqrp5aeqy/image/upload/v1681378761/cooking_1_ijfuke.svg"
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1 className="empty-card-heading">No Order Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="order-now-button">
          Order Now
        </button>
      </Link>
    </div>
  )

  placeOrder = () => {
    this.setState({showPaymentView: true})
  }

  renderCartView = () => (
    <ReactContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value

        const onRemoveAllCartItems = () => {
          removeAllCartItems()
        }

        return (
          <div>
            {cartList.length === 0 ? (
              this.renderCartIsEmpty()
            ) : (
              <div className="cart-main-container">
                <ul className="cart-un-order-list">
                  <li className="card-header">
                    <div className="cart-header-container">
                      <p className="cart-header-item-heading">Item</p>
                      <p className="cart-quantity-heading">Quantity</p>
                      <p className="cart-price-heading">Price</p>
                      <button
                        type="button"
                        className="remove-all-button"
                        onClick={onRemoveAllCartItems}
                      >
                        Remove All
                      </button>
                    </div>
                  </li>
                  {cartList.map(eachFood => (
                    <CartItem eachFood={eachFood} key={eachFood.id} />
                  ))}
                </ul>
                <hr className="hr-cart" />
                <CartPriceSummary placeOrder={this.placeOrder} />
              </div>
            )}
          </div>
        )
      }}
    </ReactContext.Consumer>
  )

  renderPaymentView = () => (
    <div className="payment-container">
      <BsFillCheckCircleFill className="payment-icon" />
      <h1 className="payment-heading">Payment Successful</h1>
      <p className="payment-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="go-home-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  render() {
    const {showPaymentView} = this.state
    return (
      <>
        <Header />
        {showPaymentView ? this.renderPaymentView() : this.renderCartView()}
        <Footer />
      </>
    )
  }
}

export default withRouter(Cart)
