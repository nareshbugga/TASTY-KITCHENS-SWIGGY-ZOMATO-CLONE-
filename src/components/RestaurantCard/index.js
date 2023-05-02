/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantCard = props => {
  const {eachList} = props
  const {restrauntId, name, imageUrl, cuisine, rating, totalReviews} = eachList
  return (
    <Link to={`/restaurant/${restrauntId}`} className="nav-link">
      <li className="list-card" testid="restaurant-item">
        <img
          src={imageUrl}
          alt="restaurant"
          className="restaurant-card-image "
        />
        <div className="description-container">
          <h1 className="restaurant-card-name">{name}</h1>
          <p className="restaurant-card-heading">{cuisine}</p>
          <div className="rating-container">
            <AiFillStar color="#FFCC00" />
            <p className="rating">
              {rating} <span className="reviews">({totalReviews} ratings)</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
