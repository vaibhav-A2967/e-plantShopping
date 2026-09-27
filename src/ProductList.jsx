import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
  const dispatch = useDispatch();
  const plant = { name: "Snake Plant", image: "", cost: "$15" };
  return (
    <div>
      <h2>Product List</h2>
      <button onClick={() => dispatch(addItem(plant))}>Add to Cart</button>
    </div>
  );
}
export default ProductList;
