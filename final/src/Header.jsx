import { useState } from 'react';
import './Header.css';
import { UI } from './constants';
import cartIcon from './assets/cart.png';

function Header({ username, isAdmin, onLogout, cartItemCount, setCurrentPage, currentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const renderCartIcon = () => {
    return (
      <div 
        className={`restaurant-header-cart-icon ${isAdmin ? 'restaurant-header-cart-icon-disabled' : 'restaurant-header-cart-icon-enabled'}`}
        onClick={() => !isAdmin && setCurrentPage('cart')}
        title={isAdmin ? 'Cart not available for admin' : 'View cart'}
      >
        <img 
          src={cartIcon} 
          alt="Shopping Cart" 
          style={{ width: '24px', height: '24px' }} 
        />
        {!isAdmin && cartItemCount > 0 && (
          <p className="restaurant-header-cart-count">{cartItemCount}</p>
        )}
      </div>
    );
  };

  return (
    <header className="restaurant-header">
      <div className="restaurant-header-container">
        <div 
          className="restaurant-header-logo" 
          onClick={() => handleNavigation(isAdmin ? UI.PAGES.ADMIN : UI.PAGES.MENU)}
        >
          <div className="restaurant-header-logo-text">Spice Delight</div>
        </div>

        <button 
          className="restaurant-header-mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className="restaurant-header-bar"></div>
          <div className="restaurant-header-bar"></div>
          <div className="restaurant-header-bar"></div>
        </button>

        <nav className={`restaurant-header-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="restaurant-header-nav-list">
            {isAdmin ? (
              <>
                <li className="restaurant-header-auth-item">
                  <div className="restaurant-header-user-controls">
                    <p className="restaurant-header-username restaurant-header-admin-username">Admin</p>
                  </div>
                </li>
                <li className="restaurant-header-nav-item">
                  <button 
                    onClick={() => handleNavigation(UI.PAGES.ADMIN)} 
                    className={`restaurant-header-nav-button ${currentPage === UI.PAGES.ADMIN ? 'restaurant-header-nav-button-active' : ''}`}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="restaurant-header-nav-item">
                  <button onClick={onLogout} className="restaurant-header-logout-button">Logout</button>
                </li>
              </>
            ) : (
              <>
                {username && (
                  <li className="restaurant-header-auth-item">
                    <div className="restaurant-header-user-controls">
                      <p className="restaurant-header-username">Hello, {username}</p>
                    </div>
                  </li>
                )}
                
                {username && (
                  <li className="restaurant-header-nav-item">
                    <button 
                      onClick={() => handleNavigation(UI.PAGES.MENU)} 
                      className={`restaurant-header-nav-button ${currentPage === UI.PAGES.MENU ? 'restaurant-header-nav-button-active' : ''}`}
                    >
                      Menu
                    </button>
                  </li>
                )}
                
                {username && (
                  <li className="restaurant-header-nav-item">
                    <button 
                      onClick={() => handleNavigation(UI.PAGES.ORDERS)} 
                      className={`restaurant-header-nav-button ${currentPage === UI.PAGES.ORDERS ? 'restaurant-header-nav-button-active' : ''}`}
                    >
                      My Orders
                    </button>
                  </li>
                )}
                
                {username ? (
                  <li className="restaurant-header-nav-item">
                    <button onClick={onLogout} className="restaurant-header-logout-button">Logout</button>
                  </li>
                ) : (
                  <li className="restaurant-header-nav-item">
                    <button 
                      onClick={() => handleNavigation('login')} 
                      className="restaurant-header-login-button"
                    >
                      Login / Register
                    </button>
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>

        {!isAdmin && cartItemCount > 0 && (
          <div onClick={() => handleNavigation(UI.PAGES.CART)}>
            {renderCartIcon()}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;