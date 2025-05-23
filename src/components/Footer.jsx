const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/images/mekong-logo.png" alt="Tonle Mekong Logo" />
            <p>Exquisite dining experience since 2010</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3>Explore</h3>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#menu">Our Menu</a>
                </li>
                <li>
                  <a href="#gallery">Gallery</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Contact</h3>
              <ul>
                <li>Tonle Mekong</li>
                <li>#110, Street No. 6, Phum Krous</li>
                <li>Sangkat Svay Dangkum, Siem Reap, Cambodia</li>
                <li>Tel: 063 964 667 | Fax: 063 965 035</li>
                <li>tonlemekong@cambodiarestaurants.com</li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Hours</h3>
              <ul>
                <li>Monday - Friday: 11am - 10pm</li>
                <li>Saturday: 10am - 11pm</li>
                <li>Sunday: 10am - 9pm</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>

          <div className="copyright">
            <p>&copy; {currentYear} Tonle Mekong Restaurant. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
