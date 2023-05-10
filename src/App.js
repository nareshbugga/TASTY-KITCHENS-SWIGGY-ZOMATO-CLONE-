import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import LoginForm from './components/LoginForm'
import RestaurantSpecificDetails from './components/RestaurantSpecificDetails'
import ProtectedRoute from './components/ProtectedRoute'
import ReactContext from './ReactContext/CartContext'
import NotFound from './components/NotFound'
import './App.css'

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

class App extends Component {
  state = {cartList: getCartListFromLocalStorage()}

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const updateQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: updateQuantity}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const checkItem = cartList.find(eachItem => eachItem.id === id)

    const {quantity} = checkItem
    if (quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            const updateQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updateQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      localStorage.removeItem('cartData')
      this.setState({cartList: []})
    }
  }

  addCartItem = foodItem => {
    const {cartList} = this.state
    const checkItem = cartList.find(
      eachFoodItem => eachFoodItem.id === foodItem.id,
    )
    if (checkItem === undefined) {
      cartList.push(foodItem)
      localStorage.setItem('cartData', JSON.stringify(cartList))
      const stringifiedCartList = localStorage.getItem('cartData')
      const parsedCartList = JSON.parse(stringifiedCartList)
      if (parsedCartList === null) {
        this.setState({cartList: []})
      } else {
        this.setState({cartList: parsedCartList})
      }
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterItems = cartList.filter(eachItem => eachItem.id !== id)
    console.log(filterItems)
    this.setState({cartList: filterItems})
    localStorage.setItem('cartData', JSON.stringify(filterItems))
  }

  removeAllCartItems = () => {
    localStorage.removeItem('cartData')
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <ReactContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantSpecificDetails}
          />
          <Route exact path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
