import React from 'react';

function Cart({ cart, removeFromCart }) {
  // Calculate the total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2 className='cart'>Cart</h2>
      <ul className='uline'>
        {cart.map((item) => (
          <li key={item.id}>
            {item.product_name} - ${item.price}
            <button className='remove' onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p className='total'>Total: ${totalPrice.toFixed(2)}</p>
    </div>
  );
}

export default Cart;
