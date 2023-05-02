import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="desk-top-main-container">
          <div className="desk-top-container">
            <div className="form-container">
              <div className="logo-container">
                <img
                  src="https://res.cloudinary.com/dqrp5aeqy/image/upload/v1681378031/VectorKitchenHat_iuxzjd.svg"
                  alt="website logo"
                  className="kitchen-hat"
                />
                <h1 className="login-heading">Tasty Kitchens</h1>
              </div>
              <p className="login">Login</p>
              <form className="submit-form" onSubmit={this.onSubmitForm}>
                <div className="label-container">
                  <label htmlFor="UserName" className="label-heading">
                    USERNAME
                  </label>
                  <br />
                  <input
                    type="text"
                    id="UserName"
                    className="input-field"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="label-container">
                  <label htmlFor="PassWord" className="label-heading">
                    PASSWORD
                  </label>
                  <br />
                  <input
                    type="password"
                    id="PassWord"
                    className="input-field"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                {errorMsg.length === 0 ? null : (
                  <p className="error-msg">{errorMsg}</p>
                )}
                <div>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div>
              <img
                alt="website login"
                src="https://res.cloudinary.com/dqrp5aeqy/image/upload/v1681378240/Rectangle_1456_cmrg8z.svg"
                className="desk-top-image"
              />
            </div>
          </div>
        </div>
        <div className="mobile-main-container">
          <div className="mobile-container">
            <img
              alt="website login"
              src="https://res.cloudinary.com/dqrp5aeqy/image/upload/v1681459354/Mobile_erwxga.svg"
              className="mobile-image"
            />
            <h1 className="login">Login</h1>
            <form className="submit-form" onSubmit={this.onSubmitForm}>
              <div className="label-container">
                <label htmlFor="UserName" className="label-heading">
                  USERNAME
                </label>
                <br />
                <input
                  type="text"
                  id="UserName"
                  className="input-field"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="label-container">
                <label htmlFor="PassWord" className="label-heading">
                  PASSWORD
                </label>
                <br />
                <input
                  type="password"
                  id="PassWord"
                  className="input-field"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              {errorMsg.length === 0 ? null : (
                <p className="error-msg">{errorMsg}</p>
              )}
              <div>
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoginForm
