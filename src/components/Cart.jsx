import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe.js library with your publishable API key
const stripePromise = loadStripe('pk_test_51PF9CcFiCJGaVPsHmT5EuZdrahNAyNuGhsOn1MT6jpTrwIhdlZISLshGWrYvrATbUgy09eTz0onfkBdIZW3E5CTM00ajp2jVL8'); // Replace with your publishable key

function Cart({ cart, removeFromCart }) {
  // State variables to store the error message
  const [error, setError] = useState(null);

  // Function to handle checkout process
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }), // Send the entire cart to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
  };

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
      <button className='checkout' onClick={handleCheckout}>Checkout</button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default Cart;
