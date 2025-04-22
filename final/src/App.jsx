import { useState, useEffect, useReducer, useCallback } from 'react';
import LoginForm from './LoginForm';
import Menu from './Menu';
import Cart from './Cart';
import Checkout from './Checkout';
import Orders from './Orders';
import Admin from './Admin';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Loading from './Loading';
import { checkLoginStatus, logoutUser } from './utils';
import { fetchCart, updateCart } from './services';
import './App.css';
import { UI, ERROR_MESSAGES } from './constants';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action.payload;
      const existingItemIndex = state.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        return [...state, { ...item, quantity: 1 }];
      }
    }
    case 'REMOVE_ITEM': {
      const { itemId } = action.payload;
      return state.filter(item => item.id !== itemId);
    }
    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(item => item.id !== itemId);
      }
      
      return state.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
    }
    case 'SET_CART': {
      return action.payload.items;
    }
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

function App() {
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(UI.PAGES.MENU);
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  const loadUserCart = useCallback((user) => {
    if (user === 'admin') {
      setIsCartLoaded(true);
      return;
    }
    
    fetchCart()
      .then(response => {
        if (!response.ok) {
          throw new Error(ERROR_MESSAGES.CART.FETCH_FAILED);
        }
        return response.json();
      })
      .then(userCartItems => {
        dispatch({ type: 'SET_CART', payload: { items: userCartItems } });
      })
      .catch(err => {
        showError('Error loading cart: ' + (err.message || 'Unknown error'));
        dispatch({ type: 'SET_CART', payload: { items: [] } });
      })
      .finally(() => {
        setIsCartLoaded(true);
      });
  }, []);
  
  const showError = useCallback((message) => {
    setErrorMessage(message);
    setShowErrorModal(true);
    setTimeout(() => setShowErrorModal(false), 3000);
  }, []);
  
  useEffect(() => {
    setIsCheckingAuth(true);
    
    checkLoginStatus()
      .then(loginStatusData => {
        if (loginStatusData.username) {
          setUsername(loginStatusData.username);
          setIsAdmin(loginStatusData.username === 'admin');
          
          setCurrentPage(loginStatusData.username === 'admin' ? UI.PAGES.ADMIN : UI.PAGES.MENU);
          
          loadUserCart(loginStatusData.username);
        }
      })
      .catch(err => {
        showError('Error checking login status: ' + (err.message || 'Unknown error'));
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, [loadUserCart, showError]);
  
  useEffect(() => {
    if (username && !isAdmin && isCartLoaded) {
      updateCart(cartItems)
        .catch(err => {
          showError('Error saving cart: ' + (err.message || 'Unknown error'));
        });
    }
  }, [cartItems, username, isAdmin, isCartLoaded, showError]);
  
  const handleLogin = (username) => {
    setUsername(username);
    
    const admin = username === 'admin';
    setIsAdmin(admin);
    
    if (!admin) {
      loadUserCart(username);
    } else {
      setIsCartLoaded(true);
    }
    
    setCurrentPage(admin ? UI.PAGES.ADMIN : UI.PAGES.MENU);
  };
  
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setUsername(null);
        setIsAdmin(false);
        setCurrentPage(UI.PAGES.MENU);
        setIsCartLoaded(false);
        dispatch({ type: 'CLEAR_CART' });
      })
      .catch(err => {
        showError('Logout error: ' + (err.message || 'Unknown error'));
      });
  };
  
  const addItemToCart = (item) => {
    if (!username) {
      showError(ERROR_MESSAGES.AUTH.LOGIN_REQUIRED);
      return;
    }
    
    if (isAdmin) {
      showError(ERROR_MESSAGES.AUTH.ADMIN_CART_RESTRICTION);
      return;
    }
    
    if (item.available === false) {
      showError(ERROR_MESSAGES.MENU.ITEM_NOT_AVAILABLE);
      return;
    }
    
    dispatch({ type: 'ADD_ITEM', payload: { item } });
  };
  
  const removeItemFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };
  
  const updateCartItemQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    
    if (username && !isAdmin) {
      updateCart([])
        .catch(err => {
          showError('Error clearing cart on server: ' + (err.message || 'Unknown error'));
        });
    }
  };
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const renderContent = () => {
    if (!username) {
      return <LoginForm onLoginSuccess={handleLogin} />;
    }
    
    if (isAdmin) {
      return <Admin />;
    }
    
    switch (currentPage) {
      case UI.PAGES.MENU:
        return <Menu addItemToCart={addItemToCart} />;
      case UI.PAGES.CART:
        return (
          <Cart 
            cartItems={cartItems}
            removeItem={removeItemFromCart}
            updateQuantity={updateCartItemQuantity}
            setCurrentPage={setCurrentPage}
          />
        );
      case UI.PAGES.CHECKOUT:
        return (
          <Checkout 
            cartItems={cartItems}
            clearCart={clearCart}
            setCurrentPage={setCurrentPage}
          />
        );
      case UI.PAGES.ORDERS:
        return (
          <Orders 
            username={username}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return <Menu addItemToCart={addItemToCart} />;
    }
  };
  
  if (isCheckingAuth) {
    return (
      <div className="restaurant-app-loading">
        <Loading message={UI.LOADING.AUTH} />
      </div>
    );
  }
  
  return (
    <div className="restaurant-app">
      {showErrorModal && (
        <div className="restaurant-error-modal">
          <div className="restaurant-error-content">
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
      
      <Header 
        username={username}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        cartItemCount={cartItemCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <main className="restaurant-main-content">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;