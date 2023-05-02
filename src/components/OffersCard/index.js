/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import './index.css'

class OfferCards extends Component {
  state = {offers: [], isLoading: true}

  componentDidMount() {
    this.getOffersData()
  }

  getOffersData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const offersUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(offersUrl, options)
    const data = await response.json()
    const updateData = data.offers.map(eachOffer => ({
      id: eachOffer.id,
      imageUrl: eachOffer.image_url,
    }))
    this.setState({offers: updateData, isLoading: false})
  }

  ReactSlick = () => {
    const {offers} = this.state
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
    }
    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {offers.map(eachOffer => (
            <div key={eachOffer.id}>
              <li>
                <img
                  src={eachOffer.imageUrl}
                  alt="offer"
                  className="offer-image"
                />
              </li>
            </div>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-offers-loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return <div>{isLoading ? this.renderLoadingView() : this.ReactSlick()}</div>
  }
}

export default OfferCards
