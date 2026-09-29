import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.cost.replace('$', ''));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return (price * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Total Shopping Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <div>
              <h3>{item.name}</h3>
              <p>Unit Price: {item.cost}</p>
              <p>Subtotal: ${calculateTotalCost(item)}</p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button onClick={() => handleRemove(item)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <button onClick={onContinueShopping} style={{ padding: '10px 20px', cursor: 'pointer' }}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
