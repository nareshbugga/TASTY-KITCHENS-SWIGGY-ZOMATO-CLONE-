import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  onLogOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  onMenuItems = () => {
    this.setState({showMenu: true})
  }

  onCloseMenu = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showMenu} = this.state
    const {location} = this.props
    const isHomeActive =
      location.pathname === '/' ? 'active-link' : 'non-active-link'
    const isCartActive =
      location.pathname === '/cart' ? 'active-link' : 'non-active-link'
    return (
      <>
        <div className="desk-top-header-container">
          <div className="header-image-container">
            <button
              type="button"
              onClick={this.onHome}
              className="desk-top-logo"
            >
              <img
                src="https://res.cloudinary.com/dqrp5aeqy/image/upload/v1681378031/VectorKitchenHat_iuxzjd.svg"
                alt="website logo"
              />
            </button>
            <h1 className="header-heading">Tasty Kitchens</h1>
          </div>
          <div className="navigation-container">
            <ul className="un-order-list">
              <Link to="/" className="nav-link">
                <li className={`nav-item ${isHomeActive}`}>Home</li>
              </Link>
              <Link to="/cart" className="nav-link">
                <li className={`nav-item ${isCartActive}`}>Cart</li>
              </Link>
            </ul>
            <button
              type="button"
              className="logout-button"
              onClick={this.onLogOut}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mobile-header-container">
          <div className="header-image-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/dqrp5aeqy/image/upload/v1681378031/VectorKitchenHat_iuxzjd.svg"
                alt="website logo"
                className="header-logo"
              />
            </Link>
            <h1 className="header-heading">Tasty Kitchens</h1>
          </div>
          <div className="navigation-container">
            <button
              type="button"
              className="menu-button"
              onClick={this.onMenuItems}
            >
              <GiHamburgerMenu className="menu" />
            </button>
          </div>
        </div>
        {showMenu && (
          <div className="menu-container">
            <div className="navigation-container">
              <ul className="un-order-list">
                <Link to="/" className="nav-link">
                  <li className="nav-item">Home</li>
                </Link>
                <Link to="/cart" className="nav-link">
                  <li className="nav-item">Cart</li>
                </Link>
              </ul>
              <button
                type="button"
                className="logout-button"
                onClick={this.onLogOut}
              >
                Logout
              </button>
            </div>
            <div>
              <button
                type="button"
                className="close-button"
                onClick={this.onCloseMenu}
              >
                <AiFillCloseCircle className="menu" />
              </button>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
