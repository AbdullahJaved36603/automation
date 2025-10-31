// Utility functions for the application
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const calculateTotal = (items) => {
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  
  return items.reduce((total, item) => {
    if (typeof item.price !== 'number' || item.price < 0) {
      throw new Error('Invalid price');
    }
    return total + item.price;
  }, 0);
};

module.exports = { validateEmail, calculateTotal };