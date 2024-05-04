import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import Cart from './Cart'; // Import the Cart component
import { Link } from 'react-router-dom';

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);

  const productCollectionRef = collection(db, 'product');

  useEffect(() => {
    const getProductList = async () => {
      try {
        const data = await getDocs(productCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getProductList();
  }, []);

  const addToCart = (productId) => {
    const productToAdd = productList.find((product) => product.id === productId);
    if (productToAdd) {
      setCart([...cart, productToAdd]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <h1>Product List</h1>
        <Cart className='cart' cart={cart} removeFromCart={removeFromCart} />
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {productList.map((product) => (
          <li key={product.id} style={{ listStyleType: 'none', width: '300px' }}>
            <div className='container'>
              <h3>{product.product_name}</h3>
              <p className='description'>{product.product_description}</p>
              <p className='price'>Price: ${product.price}</p>
              <img className='img' src={product.image_url} alt={product.product_name} />
              <p>
                <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
              </p>
              <Link to={`/product/${product.id}`}>View Details</Link>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default ProductList;
