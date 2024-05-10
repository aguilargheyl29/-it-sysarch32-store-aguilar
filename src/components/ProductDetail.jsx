
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productDocRef = doc(db, 'product', id);
        const productData = await getDoc(productDocRef);
        if (productData.exists()) {
          setProduct({ ...productData.data(), id: productData.id });
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.error('Error getting product:', error);
      }
    };

    getProduct();
  }, [id]);

  return (
    <div>
      {product ? (
        <div>
        <h1 className='productlist'>Product Detail</h1>
          <h2 className='name'>{product.product_name}</h2>
          <p className='size'>Description: {product.product_description}</p>
          <p className='size'>Price: ${product.price}</p>
          <img src={product.image_url} alt={product.product_name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
