/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Counter from '../Counter'
import ReactContext from '../../ReactContext/CartContext'
import './index.css'

class RestaurantDetailsCard extends Component {
  state = {quantity: 1, showAddQuantity: false}

  renderRestaurantDetailsCard = () => {
    let {quantity} = this.state
    const {showAddQuantity} = this.state
    const {eachItem} = this.props
    const {id, imageUrl, rating, name, cost} = eachItem

    return (
      <ReactContext.Consumer>
        {value => {
          const {
            addCartItem,
            cartList,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value

          const cartItem = cartList.find(item => item.id === id)
          quantity = cartItem ? cartItem.quantity : 1

          const onIncrement = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            incrementCartItemQuantity(id)
          }

          const onDecrement = () => {
            if (quantity > 1) {
              this.setState(prevState => ({quantity: prevState.quantity - 1}))
              decrementCartItemQuantity(id)
            } else {
              this.setState({showAddQuantity: false})
            }
          }

          const onAddItem = () => {
            this.setState({showAddQuantity: true})
            addCartItem({...eachItem, quantity})
          }

          return (
            <li testid="foodItem">
              <div className="details-card">
                <img src={imageUrl} alt="restaurant" className="card-image" />
                <div className="sub-container">
                  <h1 className="card-heading">{name}</h1>
                  <div className="card-container">
                    <BiRupee color="#334155" />
                    <p className="rupees">{cost}</p>
                  </div>
                  <div className="card-container">
                    <AiFillStar color="#FFCC00" />
                    <p className="star-rate">{rating}</p>
                  </div>
                  {showAddQuantity ? (
                    <Counter
                      activeTestId="active-count"
                      incrementTestId="increment-count"
                      decrementTestId="decrement-count"
                      quantity={quantity}
                      onIncrement={onIncrement}
                      onDecrement={onDecrement}
                    />
                  ) : (
                    <button
                      type="button"
                      className="add-button"
                      onClick={onAddItem}
                    >
                      ADD
                    </button>
                  )}
                </div>
              </div>
            </li>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  render() {
    return <>{this.renderRestaurantDetailsCard()}</>
  }
}

export default RestaurantDetailsCard
