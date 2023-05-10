/* eslint-disable react/no-unknown-property */
import {BiRupee} from 'react-icons/bi'
import {
  AiFillCloseCircle,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai'

import ReactContext from '../../ReactContext/CartContext'

import './index.css'

const CartItem = props => {
  const {eachFood} = props
  const {id, cost, imageUrl, name, quantity} = eachFood

  return (
    <ReactContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const onIncrement = () => {
          incrementCartItemQuantity(id)
        }

        const onDecrement = () => {
          decrementCartItemQuantity(id)
        }

        const removeCartItemInCart = () => {
          removeCartItem(id)
        }

        return (
          <>
            <li className="desk-top-cart-item-container" testid="cartItem">
              <div className="cart-item-image-container">
                <img
                  alt="restaurant"
                  src={imageUrl}
                  className="cart-item-image"
                />
                <h1 className="cart-item-heading">{name}</h1>
              </div>
              <div>
                <div className="button-container">
                  <button
                    type="button"
                    onClick={onDecrement}
                    className="button"
                    testid="decrement-quantity"
                  >
                    <AiOutlineMinusSquare
                      className="button-icon"
                      color="#3E4C59"
                    />
                  </button>
                  <div className="quantity" testid="item-quantity">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={onIncrement}
                    className="button"
                    testid="increment-quantity"
                  >
                    <AiOutlinePlusSquare
                      className="button-icon"
                      color="#3E4C59"
                    />
                  </button>
                </div>
              </div>
              <div className="cart-item-rupee-container">
                <BiRupee color="#ffa412" className="rupee-icon" />
                <p className="cart-item-cost">{quantity * cost}</p>
              </div>
              <div>
                <button
                  type="button"
                  className="remove-card-item"
                  onClick={removeCartItemInCart}
                >
                  <AiFillCloseCircle className="remove-icon" />
                </button>
              </div>
            </li>
            <li className="mobile-cart-item-container">
              <div className="cart-item-image-container">
                <img
                  src={imageUrl}
                  alt="restaurant"
                  className="cart-item-image"
                />
              </div>
              <div className="mobile-cart-container">
                <div>
                  <h1 className="cart-item-heading">{name}</h1>
                </div>
                <div>
                  <div className="button-container">
                    <button
                      type="button"
                      onClick={onDecrement}
                      className="button"
                      testid="decrement-quantity"
                    >
                      <AiOutlineMinusSquare
                        className="button-icon"
                        color="#3E4C59"
                      />
                    </button>
                    <div className="quantity" testid="item-quantity">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      onClick={onIncrement}
                      className="button"
                      testid="increment-quantity"
                    >
                      <AiOutlinePlusSquare
                        className="button-icon"
                        color="#3E4C59"
                      />
                    </button>
                  </div>
                </div>
                <div className="cart-item-rupee-container">
                  <BiRupee color="#ffa412" className="rupee-icon" />
                  <p className="cart-item-cost">{quantity * cost}</p>
                </div>
                <div>
                  <button
                    type="button"
                    className="remove-card-item"
                    onClick={removeCartItemInCart}
                  >
                    <AiFillCloseCircle className="remove-icon" />
                  </button>
                </div>
              </div>
            </li>
          </>
        )
      }}
    </ReactContext.Consumer>
  )
}

export default CartItem
