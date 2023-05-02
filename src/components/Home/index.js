/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import {BsFilterLeft} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import OffersCard from '../OffersCard'
import RestaurantCard from '../RestaurantCard'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    activePage: 1,
    LIMIT: 9,
    restaurantsList: [],
    searchValue: '',
    searchInput: '',
    selectedSortByValue: sortByOptions[1].value,
    isLoading: true,
    resultView: apiView.initial,
  }

  componentDidMount() {
    this.getRestaurantsData()
  }

  getRestaurantsData = async () => {
    this.setState({resultView: apiView.inProgress})
    const {activePage, LIMIT, selectedSortByValue, searchInput} = this.state
    const offset = (activePage - 1) * LIMIT
    const jwtToken = Cookies.get('jwt_token')
    const RestaurantsListUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortByValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(RestaurantsListUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const {restaurants} = data
      const updateData = restaurants.map(eachList => ({
        restrauntId: eachList.id,
        name: eachList.name,
        cuisine: eachList.cuisine,
        imageUrl: eachList.image_url,
        rating: eachList.user_rating.rating,
        totalReviews: eachList.user_rating.total_reviews,
      }))
      this.setState({
        restaurantsList: updateData,
        isLoading: false,
        resultView: apiView.success,
      })
    }
  }

  onNextPage = () => {
    const {activePage, LIMIT} = this.state
    const value = Math.ceil(30 / LIMIT)
    if (activePage < value) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurantsData,
      )
    }
  }

  onPreviousPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurantsData,
      )
    }
  }

  onSelectOption = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getRestaurantsData,
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  onChangeSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  onSearch = () => {
    const {searchValue} = this.state
    this.setState({searchInput: searchValue}, this.getRestaurantsData)
  }

  renderRestaurantCard = () => {
    const {restaurantsList, activePage} = this.state

    return (
      <>
        <ul className="un-order-restaurant-list">
          {restaurantsList.map(eachList => (
            <RestaurantCard eachList={eachList} key={eachList.restrauntId} />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            testid="pagination-left-button"
            type="button"
            className="pagination-button"
            onClick={this.onPreviousPage}
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <p className="pagination-num">
            <span testid="active-page-number">{activePage}</span> of 4
          </p>
          <button
            testid="pagination-right-button"
            type="button"
            className="pagination-button"
            onClick={this.onNextPage}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </>
    )
  }

  renderResultView = () => {
    const {resultView} = this.state
    switch (resultView) {
      case apiView.inProgress:
        return this.renderLoadingView()
      case apiView.success:
        return this.renderRestaurantCard()
      default:
        return null
    }
  }

  renderHomeView = () => {
    const {selectedSortByValue, searchValue} = this.state
    return (
      <div>
        <div>
          <OffersCard />
        </div>
        <div className="header-container">
          <div className="home-header-container">
            <h1 className="home-header">Popular Restaurants</h1>
            <p className="home-description">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div>
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearch}
                value={searchValue}
              />

              <button
                type="button"
                className="search-button"
                onClick={this.onSearch}
              >
                <BiSearch />
              </button>
            </div>
            <div className="sort-container">
              <div className="sort-contain">
                <BsFilterLeft className="filter-icon" />
                <p className="sorting">Sort By</p>
              </div>
              <select
                className="select"
                value={selectedSortByValue}
                onChange={this.onSelectOption}
                placeholder="Price"
              >
                {sortByOptions.map(eachOption => (
                  <option
                    className="option-tag"
                    value={eachOption.value}
                    key={eachOption.id}
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr className="hr-home" />
        <div>{this.renderResultView()}</div>
        <Footer />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Header />
        {isLoading ? this.renderLoadingView() : this.renderHomeView()}
      </div>
    )
  }
}

export default Home
