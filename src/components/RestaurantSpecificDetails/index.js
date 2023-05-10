/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantDetailsCard from '../RestaurantDetailsCard'
import './index.css'

class RestaurantSpecificDetails extends Component {
  state = {detailsList: [], foodItemsList: [], isLoading: true}

  componentDidMount() {
    this.getRestaurantSpecificDetails()
  }

  getRestaurantSpecificDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const restrauntId = id
    const RestaurantDetailsUrl = `https://apis.ccbp.in/restaurants-list/${restrauntId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(RestaurantDetailsUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updateData = {
        restrauntId: data.id,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        location: data.location,
        name: data.name,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items,
      }

      const {foodItems} = updateData
      const updateFoodItems = foodItems.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        rating: eachItem.rating,
        name: eachItem.name,
        cost: eachItem.cost,
      }))

      this.setState({
        detailsList: updateData,
        foodItemsList: updateFoodItems,
        isLoading: false,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantDetailsView = () => {
    const {detailsList, foodItemsList} = this.state
    const {
      name,
      cuisine,
      rating,
      costForTwo,
      imageUrl,
      location,
      reviewsCount,
    } = detailsList

    return (
      <div>
        <div className="details-main-container">
          <div className="specific-details-container">
            <div>
              <img
                src={imageUrl}
                alt="restaurant_card"
                className="specific-details-image"
              />
            </div>
            <div className="details-container">
              <h1 className="specific-detail-heading">{name}</h1>
              <p className="cuisine">{cuisine}</p>
              <p className="location">{location}</p>
              <div className="price-rating-container">
                <div className="specific-rating-container">
                  <div className="container">
                    <AiFillStar color="#FFCC00" />
                    <p className="rate">{rating}</p>
                  </div>
                  <p className="ratings">{reviewsCount} + Ratings</p>
                </div>
                <div>
                  <hr className="line" />
                </div>
                <div className="price-container">
                  <div className="container">
                    <BiRupee color="#ffffff" />
                    <p className="rupee">{costForTwo}</p>
                  </div>
                  <p className="cost">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="details-un-order-list">
          {foodItemsList.map(eachItem => (
            <RestaurantDetailsCard eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading
          ? this.renderLoadingView()
          : this.renderRestaurantDetailsView()}
      </>
    )
  }
}

export default RestaurantSpecificDetails
