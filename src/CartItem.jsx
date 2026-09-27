import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNumber = parseFloat(item.cost.replace('$', ''));
      return total + costNumber * item.quantity;
    }, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.replace('$', ''));
    return (costNumber * item.quantity).toFixed(2);
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
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container" style={{ padding: '30px' }}>
      <h2>Total Shopping Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.name} style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px', alignItems: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
              <div className="cart-item-details" style={{ flexGrow: 1 }}>
                <div className="cart-item-name" style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.name}</div>
                <div className="cart-item-cost">Unit Price: {item.cost}</div>
                <div className="cart-item-total">Total Cost: ${calculateTotalCost(item)}</div>
                <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                  <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
                </div>
                <button className="delete-btn" onClick={() => handleRemove(item)} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
        <button className="get-started-button" onClick={onContinueShopping} style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Continue Shopping</button>
        <button className="get-started-button" onClick={handleCheckoutShopping} style={{ padding: '10px 20px', background: '#008CBA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
