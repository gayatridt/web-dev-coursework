import { useState, useEffect } from 'react';
import { fetchMenuItems } from './services';
import './Home.css';
import { UI, ERROR_MESSAGES, CONFIG, DEFAULTS } from './constants';

function Home({ setCurrentPage }) {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesWithErrors, setImagesWithErrors] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchMenuItems()
      .then(response => {
        if (!response.ok) {
          throw new Error(ERROR_MESSAGES.MENU.FEATURED_FETCH_FAILED);
        }
        return response.json();
      })
      .then(allItems => {
        const shuffled = [...allItems].sort(() => 0.5 - Math.random());
        setFeaturedItems(shuffled.slice(0, 3));
        setLoading(false);
      })
      .catch(error => {
        setError(error.message || 'Error loading featured items');
        setLoading(false);
      });
  }, []);

  const handleImageError = (itemId) => {
    setImagesWithErrors(prev => ({
      ...prev,
      [itemId]: true
    }));
  };

  return (
    <div className="restaurant-home-container">
      <section className="restaurant-hero">
        <div className="restaurant-hero-content">
          <div className="restaurant-hero-title">{UI.MESSAGES.HOME_WELCOME}</div>
          <p className="restaurant-hero-text">{UI.MESSAGES.HOME_TAGLINE}</p>
          <button 
            className="restaurant-cta-button"
            onClick={() => setCurrentPage(UI.PAGES.MENU)}
          >
            Order Now
          </button>
        </div>
      </section>
      
      <section className="restaurant-featured-section">
        <div className="restaurant-section-title">Featured Items</div>
        
        {loading ? (
          <div className="restaurant-loading">{UI.LOADING.FEATURED}</div>
        ) : error ? (
          <div className="restaurant-error-message">{error}</div>
        ) : (
          <div className="restaurant-featured-items">
            {featuredItems.map(item => (
              <div className="restaurant-featured-item" key={item.id}>
                <img 
                  src={imagesWithErrors[item.id] 
                    ? `${CONFIG.IMAGE_PATH}${CONFIG.DEFAULT_IMAGE}` 
                    : `${CONFIG.IMAGE_PATH}${item.image}`}
                  alt={item.name}
                  className="restaurant-featured-image"
                  onError={() => handleImageError(item.id)}
                />
                <div className="restaurant-featured-item-title">{item.name}</div>
                <p className="restaurant-featured-item-description">{item.description}</p>
                <p className="restaurant-item-price">
                  {DEFAULTS.CURRENCY === 'USD' ? '$' : DEFAULTS.CURRENCY}
                  {parseFloat(item.price).toFixed(2)}
                </p>
                <button 
                  className="restaurant-view-item-btn"
                  onClick={() => setCurrentPage(UI.PAGES.MENU)}
                >
                  View Menu
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      
      <section className="restaurant-info-section">
        <div className="restaurant-info-card">
          <div className="restaurant-info-card-title">Quality Ingredients</div>
          <p className="restaurant-info-card-text">We use only the freshest ingredients and authentic spices to bring you the true taste of India.</p>
        </div>
        
        <div className="restaurant-info-card">
          <div className="restaurant-info-card-title">Fast Delivery</div>
          <p className="restaurant-info-card-text">Hot and fresh food delivered to your doorstep within 30 minutes of ordering.</p>
        </div>
        
        <div className="restaurant-info-card">
          <div className="restaurant-info-card-title">Special Offers</div>
          <p className="restaurant-info-card-text">Check out our menu for weekly specials and combo deals that will delight your taste buds.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;