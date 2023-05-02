import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-image-container">
        <img
          src="https://res.cloudinary.com/dqrp5aeqy/image/upload/v1681630134/white_hat_y7ztor.svg"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div>
        <FaPinterestSquare
          className="icons-style"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="icons-style" testid="instagram-social-icon" />
        <FaTwitter className="icons-style" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="icons-style"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
