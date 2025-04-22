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

Licensing for images and icons used in this project (also mentioned separately in license.txt:
samosa.jpg - Photo by <a href="https://unsplash.com/@kabircheema?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">kabir cheema</a> on <a href="https://unsplash.com/photos/sliced-tomato-on-white-ceramic-plate-8T9AVksyt7s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
chilli-paneer.jpg - Photo by <a href="https://unsplash.com/@pixelsnap_visualz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Pixelsnap Visualz</a> on <a href="https://unsplash.com/photos/a-white-bowl-filled-with-stew-next-to-a-leafy-branch-jmp5ztWNPnU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
paneer-tikka.jpg - Photo by <a href="https://unsplash.com/@suchandravarma?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Suchandra varma</a> on <a href="https://unsplash.com/photos/a-white-plate-topped-with-food-next-to-a-fork-5fn0mTdDkGY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
butter-chicken.jpg - Photo by <a href="https://unsplash.com/@potofgold07?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Raman</a> on <a href="https://unsplash.com/photos/brown-and-green-dish-on-brown-wooden-bowl-sqcH2q7lkvo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
dosa.jpg - Photo by <a href="https://unsplash.com/@zoshuacolah?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Zoshua Colah</a> on <a href="https://unsplash.com/photos/a-plate-of-food-on-a-wooden-plate-VIqcVqZ1uxM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
palak-paneer.jpg - Photo by <a href="https://unsplash.com/@kavar05?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Kanwardeep Kaur</a> on <a href="https://unsplash.com/photos/sliced-cucumber-in-white-ceramic-bowl-jTv_cWxEtFs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
chana-masala.jpg - Photo by <a href="https://unsplash.com/@anil_sharma_india?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anil Sharma</a> on <a href="https://unsplash.com/photos/a-bowl-of-food-sitting-on-top-of-a-red-cloth-T40rbu-mQe0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
naan.jpg - Photo by <a href="https://unsplash.com/@ajeetpanesarphotography?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ajeet Panesar</a> on <a href="https://unsplash.com/photos/a-plate-of-food-WrE3ruckrwI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
garlic-naan.jpg - Photo by <a href="https://unsplash.com/@fusewiews?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">fuseviews</a> on <a href="https://unsplash.com/photos/a-person-putting-food-on-top-of-a-metal-pan-s2-IT1_deyo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
roti.jpg - Photo by <a href="https://unsplash.com/@contarcos?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sergio Contreras</a> on <a href="https://unsplash.com/photos/brown-bread-on-white-wicker-basket-7iB1Pa_OBL4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
basmati.jpg - Photo by <a href="https://unsplash.com/@pillepriske?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Pille R. Priske</a> on <a href="https://unsplash.com/photos/rice-in-bowl-xmuIgjuQG0M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
veg-biryani.jpg - Photo by <a href="https://unsplash.com/@chefmariii?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mario Raj</a> on <a href="https://unsplash.com/photos/pasta-dish-on-white-ceramic-plate-n1z3gc9gJ8I?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
chicken-biryani.jpg - Photo by <a href="https://unsplash.com/@chefmariii?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mario Raj</a> on <a href="https://unsplash.com/photos/a-white-bowl-filled-with-rice-and-meat-ysmeQt1dzcw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
gulab-jamun.jpg - Photo by <a href="https://unsplash.com/@magictype?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">jaikishan patel</a> on <a href="https://unsplash.com/photos/red-round-fruits-in-black-cooking-pan-uwu2ZLDmX8k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
jalebi.jpg - Photo by <a href="https://unsplash.com/@countingframez?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Gaurav Kumar</a> on <a href="https://unsplash.com/photos/a-metal-bowl-filled-with-food-on-top-of-a-table-nfDfOrX678A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
mango-lassi.jpg - Photo by <a href="https://unsplash.com/@foyu?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Julia Zyablova</a> on <a href="https://unsplash.com/photos/a-glass-filled-with-a-smoothie-next-to-a-mango-KlVIYmGVRQ8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
chai.jpg - Photo by <a href="https://unsplash.com/@shubham_dangi?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Shubham Dangi</a> on <a href="https://unsplash.com/photos/brown-round-container-on-brown-wooden-table-ynnYEs3NyaY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
sweet-lassi.jpg - Photo by <a href="https://unsplash.com/@chefmariii?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mario Raj</a> on <a href="https://unsplash.com/photos/milk-in-clear-drinking-glass-with-green-leaves-and-white-cream-0sz-sfC_ekc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
cart.png - icon from https://fonts.google.com/icons


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
