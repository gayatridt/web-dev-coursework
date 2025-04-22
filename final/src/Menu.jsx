import { useState, useEffect } from 'react';
import MenuCategory from './MenuCategory';
import Loading from './Loading';
import { getMenuItems } from './utils';
import './Menu.css';
import { UI, CONFIG, ERROR_MESSAGES, DEFAULTS } from './constants';

function Menu({ addItemToCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    getMenuItems()
      .then(items => {
        setMenuItems(items);
        
        const uniqueCategories = [];
        items.forEach(item => {
          if (item.category && !uniqueCategories.includes(item.category)) {
            uniqueCategories.push(item.category);
          }
        });
        
        setCategories(uniqueCategories);
        
        if (uniqueCategories.length > 0 && !activeCategory) {
          setActiveCategory(uniqueCategories[0]);
        }
      })
      .catch(err => {
        setError(err.message || ERROR_MESSAGES.MENU.FETCH_FAILED);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  if (isLoading) {
    return <Loading message={UI.LOADING.MENU} />;
  }
  
  if (error) {
    return <div className="restaurant-menu-error-message">{error}</div>;
  }
  
  const categoryItems = menuItems.filter(item => item.category === activeCategory);
  
  return (
    <div className="restaurant-menu-container">
      <div className="restaurant-menu-title">{UI.MESSAGES.MENU_TITLE}</div>
      <p className="restaurant-menu-instructions">
        {UI.MESSAGES.MENU_INSTRUCTIONS}
      </p>
      <div className="restaurant-category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`restaurant-category-tab ${activeCategory === category ? 'restaurant-category-tab-active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {activeCategory && categoryItems.length > 0 ? (
        <MenuCategory 
          category={activeCategory} 
          items={categoryItems}
          addItemToCart={addItemToCart}
        />
      ) : (
        <div className="restaurant-menu-no-items">{UI.MESSAGES.NO_ITEMS}</div>
      )}
    </div>
  );
}

export default Menu;