import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.name}>
          <span>{item.name} - {item.quantity}</span>
          <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default CartItem;
