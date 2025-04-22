import './Footer.css';

function Footer() {
  return (
    <footer className="restaurant-footer">
      <div className="restaurant-footer-container">
        <div className="restaurant-footer-section">
          <div className="restaurant-footer-heading">Spice Delight</div>
          <p>Authentic flavors from India to your table</p>
        </div>
        
        <div className="restaurant-footer-section">
          <div className="restaurant-footer-subheading">Hours</div>
          <p>Monday - Friday: 11am - 10pm</p>
          <p>Saturday - Sunday: 12pm - 11pm</p>
        </div>
        
        <div className="restaurant-footer-section">
          <div className="restaurant-footer-subheading">Contact</div>
          <p>123 Main Street</p>
          <p>City, State 12345</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      
      <div className="restaurant-footer-bottom">
        <p>&copy; {new Date().getFullYear()} Spice Delight. All rights reserved.</p>
        <p>This is a demo application for project purposes.</p>
      </div>
    </footer>
  );
}

export default Footer;