import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          cost: "$15",
          description: "Produces oxygen at night, improving air quality."
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          cost: "$12",
          description: "Filters formaldehyde and xylene from indoor air."
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2018/02/05/13/20/peace-lily-3132177_1280.jpg",
          cost: "$18",
          description: "Removes toxins and adds elegance to rooms."
        }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://cdn.pixabay.com/photo/2016/04/19/07/05/lavender-1338166_1280.jpg",
          cost: "$20",
          description: "Calming scent, widely used in aromatherapy."
        },
        {
          name: "Jasmine",
          image: "https://cdn.pixabay.com/photo/2020/05/17/19/23/jasmine-5183305_1280.jpg",
          cost: "$22",
          description: "Sweet fragrance that blooms mostly at night."
        },
        {
          name: "Rosemary",
          image: "https://cdn.pixabay.com/photo/2016/09/08/18/17/rosemary-1655610_1280.jpg",
          cost: "$14",
          description: "Fragrant herb with needle-like leaves."
        }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar" style={{ background: '#333', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="tag">
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>Paradise Nursery</a>
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <a href="#" onClick={handleContinueShopping} style={{ color: 'white', textDecoration: 'none' }}>Plants</a>
          <a href="#" onClick={handleCartClick} style={{ color: 'white', textDecoration: 'none' }}>
            🛒 Cart ({totalQuantity})
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px' }}>
          <h2>Featured House Plants</h2>
          {plantsArray.map((category, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h3>{category.category}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {category.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} style={{ border: '1px solid #ddd', padding: '15px', width: '250px', borderRadius: '8px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                    <h4>{plant.name}</h4>
                    <p>{plant.cost}</p>
                    <p style={{ fontSize: '12px', color: '#666' }}>{plant.description}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      style={{
                        background: addedToCart[plant.name] ? '#888' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        width: '100%'
                      }}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
