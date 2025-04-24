const initialState = {
    isLoggedIn: false,
    username: '',
    menuItems: [],
    cart: [],
    orders: []
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'LOG_IN':
        return {
          ...state,
          isLoggedIn: true,
          username: action.username
        };
      
      case 'LOG_OUT':
        return {
          ...state,
          isLoggedIn: false,
          username: '',
          orders: []
        };
      
      case 'SET_MENU_ITEMS':
        return {
          ...state,
          menuItems: action.menuItems
        };
      
      case 'SET_ORDERS':
        return {
          ...state,
          orders: action.orders
        };
      
      case 'ADD_TO_CART': {
        const existingItem = state.cart.find(item => item.id === action.item.id);
        
        if (existingItem) {
          return {
            ...state,
            cart: state.cart.map(item => 
              item.id === action.item.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          };
        } 
        else {
          return {
            ...state,
            cart: [...state.cart, { ...action.item, quantity: 1 }]
          };
        }
      }
      
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.itemId)
        };
      
      case 'UPDATE_CART_ITEM_QUANTITY': {
        if (action.quantity <= 0) {
          return {
            ...state,
            cart: state.cart.filter(item => item.id !== action.itemId)
          };
        } else {
          return {
            ...state,
            cart: state.cart.map(item => 
              item.id === action.itemId 
                ? { ...item, quantity: action.quantity } 
                : item
            )
          };
        }
      }
      
      case 'CLEAR_CART':
        return {
          ...state,
          cart: []
        };
      
      default:
        return state;
    }
  }
  
  export { initialState, reducer };