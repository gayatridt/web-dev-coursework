# Indian Restaurant Ordering System

A full-stack web application for an Indian cuisine restaurant with menu browsing, cart functionality, order placement, and admin dashboard.

## Features

- **Customer Features**:
  - Browse menu by categories (appetizers, mains, breads, rice, etc.)
  - Add items to cart and adjust quantities
  - Place orders and view order history
  - User registration and login

- **Admin Features**:
  - Manage menu items (add, update, delete)
  - Toggle item availability
  - View all orders

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js with Express
- **Authentication**: Session-based with cookies (no passwords required for demo)

## Project Structure

```
/
├── src/                  # React components and frontend code
│   ├── assets/           # Images and static resources
│   ├── App.jsx           # Main app component
│   ├── Admin.jsx         # Admin dashboard
│   ├── Menu.jsx          # Menu display
│   ├── Cart.jsx          # Shopping cart
│   ├── Checkout.jsx      # Checkout process
│   ├── Orders.jsx        # Order history
│   ├── LoginForm.jsx     # User authentication
│   ├── constants.js      # App constants
│   └── services.js       # API service functions
├── server.js             # Express server
├── menu-items.js         # Menu data model
├── users.js              # User data model
├── orders.js             # Orders data model
├── carts.js              # Cart data model
├── sessions.js           # Session management
└── package.json          # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation & Running

1. Clone the repository
2. Run these commands:

```bash
npm install
npm run build
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage Guide

### Customer Experience

1. **Registration/Login**: Create a new account or log in with an existing username
2. **Browsing Menu**: View food items by category
3. **Ordering**: Add items to cart, adjust quantities, and proceed to checkout
4. **Order Tracking**: View status and details of past orders

### Admin Access

1. Log in with username: `admin`
2. Access the admin dashboard to manage menu items
3. Add new items, update prices, toggle availability, or delete items

## Notes

- This is a demo application with simplified authentication (no passwords)
- The user `dog` is always denied access to demonstrate authorization denial
- Data is stored in memory and will reset when the server restarts

## Implemented Bonus Requirements

### Extra Service Interaction Complexity
* Additional HTTP methods × 3: `server.js` (GET, POST, PUT, PATCH, DELETE)
* Services with pagination × 1: `Orders.jsx` (client-side pagination for orders)
* Services with filtered data × 3: `server.js` (filtering menu by category via /api/menu/:category endpoint, filtering orders by username), Menu.jsx (category filtering), Admin.jsx (category filter dropdown for menu items)

### Extra State Complexity
* Different levels of authorization × 1: `server.js` (logged-in users, admin user)
* Different "pages" managed through state × 1: `App.jsx` (conditional rendering of different "pages")
* Complex form validation × 1: `Admin.jsx` (validation with multiple conditions and visual feedback)
* Excellent architecture and separation of concerns × 1: Project-wide (clean separation of models, components, and utilities)
* Good use of useReducer × 1: `App.jsx` (cart state management with actions)