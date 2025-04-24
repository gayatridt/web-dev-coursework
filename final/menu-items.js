const menuItems = [
  {
    id: 'app1',
    name: 'Vegetable Samosas',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 6.99,
    image: 'samosa.jpg',
    category: 'appetizers'
  },
  {
    id: 'app2',
    name: 'Chilli Paneer',
    description: 'Fried cottage cheese cubes tossed in a spicy sauce',
    price: 5.99,
    image: 'chilli-paneer.jpg',
    category: 'appetizers'
  },
  {
    id: 'app3',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese cubes marinated in spiced yogurt',
    price: 8.99,
    image: 'paneer-tikka.jpg',
    category: 'appetizers'
  },
  
  {
    id: 'main1',
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich tomato and butter sauce',
    price: 14.99,
    image: 'butter-chicken.jpg',
    category: 'mains'
  },
  {
    id: 'main2',
    name: 'Dosa',
    description: 'Savoury crepe made from a fermented batter of ground black gram and rice. Served with chutney and lentil-based vegetable spiced curry.',
    price: 16.99,
    image: 'dosa.jpg',
    category: 'mains'
  },
  {
    id: 'main3',
    name: 'Palak Paneer',
    description: 'Cottage cheese cubes in a creamy spinach sauce',
    price: 13.99,
    image: 'palak-paneer.jpg',
    category: 'mains'
  },
  {
    id: 'main4',
    name: 'Chana Masala',
    description: 'Spicy chickpea curry with tomatoes and onions',
    price: 12.99,
    image: 'chana-masala.jpg',
    category: 'mains'
  },
  
  {
    id: 'bread1',
    name: 'Naan',
    description: 'Traditional leavened flatbread baked in tandoor',
    price: 2.99,
    image: 'naan.jpg',
    category: 'breads'
  },
  {
    id: 'bread2',
    name: 'Garlic Naan',
    description: 'Naan bread topped with garlic and butter',
    price: 3.99,
    image: 'garlic-naan.jpg',
    category: 'breads'
  },
  {
    id: 'bread3',
    name: 'Roti',
    description: 'Whole wheat unleavened flatbread',
    price: 2.49,
    image: 'roti.jpg',
    category: 'breads'
  },
  
  {
    id: 'rice1',
    name: 'Steamed Basmati Rice',
    description: 'Fragrant long-grain basmati rice',
    price: 3.99,
    image: 'basmati.jpg',
    category: 'rice'
  },
  {
    id: 'rice2',
    name: 'Vegetable Biryani',
    description: 'Aromatic rice dish with mixed vegetables and spices',
    price: 12.99,
    image: 'veg-biryani.jpg',
    category: 'rice'
  },
  {
    id: 'rice3',
    name: 'Chicken Biryani',
    description: 'Fragrant rice cooked with spiced chicken and herbs',
    price: 14.99,
    image: 'chicken-biryani.jpg',
    category: 'rice'
  },
  
  {
    id: 'dessert1',
    name: 'Gulab Jamun',
    description: 'Sweet milk dumplings soaked in rose-flavored syrup',
    price: 4.99,
    image: 'gulab-jamun.jpg',
    category: 'desserts'
  },
  {
    id: 'dessert2',
    name: 'Jalebi',
    description: 'A funnel-cake-like treat consisting of spirals of batter that are deep-fried and soaked in sugar syrup',
    price: 4.99,
    image: 'jalebi.jpg',
    category: 'desserts'
  },
  
  {
    id: 'bev1',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink with mango puree',
    price: 3.99,
    image: 'mango-lassi.jpg',
    category: 'beverages'
  },
  {
    id: 'bev2',
    name: 'Masala Chai',
    description: 'Spiced Indian tea with milk',
    price: 2.99,
    image: 'chai.jpg',
    category: 'beverages'
  },
  {
    id: 'bev3',
    name: 'Sweet Lassi',
    description: 'Sweetened yogurt drink with cardamom',
    price: 3.49,
    image: 'sweet-lassi.jpg',
    category: 'beverages'
  }
];

export function getAllItems() {
  return menuItems;
}

export function getItemsByCategory(category) {
  const normalizedCategory = category.toLowerCase();
  return menuItems.filter(item => item.category === normalizedCategory);
}

export function getItemById(id) {
  return menuItems.find(item => item.id === id);
}

export function getAllCategories() {
  const uniqueCategories = [];
  menuItems.forEach(item => {
    if (!uniqueCategories.includes(item.category)) {
      uniqueCategories.push(item.category);
    }
  });
  return uniqueCategories;
}

export function addMenuItem(menuItem) {
  const id = `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const newItem = { 
    id, 
    name: menuItem.name,
    description: menuItem.description || '',
    price: parseFloat(menuItem.price),
    category: menuItem.category.toLowerCase(),
    image: menuItem.image || 'default.jpg',
    available: menuItem.available !== false 
  };

  menuItems.push(newItem);
  return newItem;
}

export function updateMenuItem(itemId, updates) {
  const index = menuItems.findIndex(item => item.id === itemId);
  if (index === -1) return null;

  const updatedItem = {
    ...menuItems[index],  
    ...updates            
  };

  if (updates.price !== undefined) {
    updatedItem.price = parseFloat(updates.price);
  }

  menuItems[index] = updatedItem;
  return updatedItem;
}

export function deleteMenuItem(itemId) {
  const index = menuItems.findIndex(item => item.id === itemId);
  if (index === -1) return false;

  menuItems.splice(index, 1);
  return true;
}