export const ERROR_MESSAGES = {
    AUTH: {
        EMPTY_USERNAME: 'Username is required',
        INVALID_USERNAME: 'Username can only contain letters and numbers',
        USERNAME_EXISTS: 'Username already exists',
        NOT_REGISTERED: 'Username not registered. Please register first!',
        BANNED_USER: 'This user is banned',
        SHORT_USERNAME: 'Username must be at least 3 characters',
        AUTH_MISSING: 'You must be logged in to perform this action',
        ADMIN_ONLY: 'This action is restricted to admin users',
        LOGIN_REQUIRED: 'Please log in to add items to your cart',
        ADMIN_CART_RESTRICTION: 'Admin users cannot add items to cart',
    },

    API: {
        FETCH_FAILED: 'Failed to fetch data from server',
        GENERAL_ERROR: 'An error occurred. Please try again later.',
        NETWORK_ERROR: 'Network error. Please check your connection.',
        SERVER_ERROR: 'Server error. Please try again later.',
    },

    MENU: {
        FETCH_FAILED: 'Failed to load menu items',
        ITEM_NOT_FOUND: 'Menu item not found',
        MISSING_REQUIRED_FIELDS: 'Please fill in all required fields',
        INVALID_PRICE: 'Price must be a positive number',
        ITEM_NOT_AVAILABLE: 'This item is currently unavailable',
        UPDATE_FAILED: 'Failed to update menu item',
        DELETE_FAILED: 'Failed to delete menu item',
        CREATE_FAILED: 'Failed to create menu item',
        FEATURED_FETCH_FAILED: 'Failed to fetch featured items',
    },

    ORDERS: {
        FETCH_FAILED: 'Failed to load orders',
        CREATE_FAILED: 'Failed to create order',
        EMPTY_CART: 'Your cart is empty',
        INVALID_ITEMS: 'Invalid order items',
        ORDER_NOT_FOUND: 'Order not found',
        INVALID_STATUS: 'Invalid order status',
        FETCH_ERROR: 'Failed to load orders. Please try again later.',
    },

    CART: {
        FETCH_FAILED: 'Failed to load cart',
        UPDATE_FAILED: 'Failed to update cart',
        INVALID_ITEMS: 'Invalid cart data',
    },
};

export const ORDER_STATUS = {
    PENDING: 'pending',
    PREPARING: 'preparing',
    READY: 'ready',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
};

export const UI = {
    PAGES: {
        MENU: 'menu',
        CART: 'cart',
        CHECKOUT: 'checkout',
        ORDERS: 'orders',
        ADMIN: 'admin',
    },

    CATEGORIES: {
        ALL: 'all',
    },

    MESSAGES: {
        CART_CLEARED: 'Cart cleared',
        ORDER_PLACED: 'Order placed successfully',
        ADMIN_ITEM_UPDATE: 'Item updated successfully',
        ADMIN_ITEM_DELETE: 'Item deleted successfully',
        ADMIN_ITEM_CREATE: 'Item created successfully',
        ORDER_STATUS_UPDATED: 'Order status updated',
        CART_EMPTY: 'Your cart is empty',
        ORDER_PLACED_SUCCESS: 'Order Placed Successfully!',
        ORDER_PREPARING: 'We\'ll start preparing your food right away.',
        HOME_WELCOME: 'Welcome to Spice Delight',
        HOME_TAGLINE: 'Experience authentic Indian cuisine delivered straight to your door',
        MENU_TITLE: 'Our Menu',
        MENU_INSTRUCTIONS: 'Click on any dish to view details and add it to your cart',
        NO_ITEMS: 'No items available in this category',
        ADDED_TO_CART: 'Added!',
        ADD_TO_CART: 'Add to Cart',
        MY_ORDERS: 'My Orders',
        NO_ORDERS: 'You haven\'t placed any orders yet.',
        ORDER_PREPARING: 'Your order is being prepared. It will be ready soon!',
        ORDER_READY: 'Your order is ready for pickup or delivery!',
        ITEM_NOT_AVAILABLE: 'This item is currently unavailable',
    },

    LOADING: {
        MENU: 'Loading menu...',
        ORDERS: 'Loading orders...',
        AUTH: 'Checking authentication...',
        FEATURED: 'Loading featured items...',
        DEFAULT: 'Loading...',
    }
};

export const CONFIG = {
    IMAGE_PATH: '../src/assets/',
    DEFAULT_IMAGE: 'default.jpg',
    SESSION_EXPIRY: 3600000, 
};

export const DEFAULTS = {
    CURRENCY: 'USD',
    MIN_USERNAME_LENGTH: 3,
};

export const REGEX = {
    USERNAME: /^[a-zA-Z0-9]+$/,
    PRICE: /^\d+(\.\d{1,2})?$/,
};

export default {
    ERROR_MESSAGES,
    ORDER_STATUS,
    UI,
    CONFIG,
    DEFAULTS,
    REGEX
};