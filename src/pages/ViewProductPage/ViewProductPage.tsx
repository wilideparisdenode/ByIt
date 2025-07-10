import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.ts";
import type { Product } from "../../components/types/types";
import { useSelector, useDispatch } from "react-redux";
import { addItem, updateQuantity } from "../../components/cartSlice";

export default function ViewProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useFetch<Product[]>("http://localhost:9000/api/products");
  const [product, setProduct] = useState<Product>();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const dispatch = useDispatch();

  // Get cart items from Redux state
  const cartItems = useSelector((state: any) => state.cart.products);
  const cartItem = cartItems.find((item: Product) => item.id === product?.id);
  const productQ = cartItem?.quantity || 0;

  useEffect(() => {
    if (data && id) {
      const numericId = parseInt(id);
      const found = data?.find((product:Product) => product.id === numericId);
      if (found) {
        setProduct(found);
        // Set initial rating from product data if available
        if (found.rating) setRating(found.rating);
      }
    }
  }, [id, data]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
    }
  };

  const handleIncrement = () => {
    if (product) {
      dispatch(updateQuantity({ id: product.id, quantity: productQ + 1 }));
    }
  };

  const handleDecrement = () => {
    if (product && productQ > 0) {
      dispatch(updateQuantity({ id: product.id, quantity: productQ - 1 }));
    }
  };

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
    // Here you would typically send the rating to your backend
    // Example: api.updateProductRating(product.id, selectedRating);
  };

  return (
    <div className="product-overview-container">
      <div className="product-overview">
        <div className="product-image-container">
          <img src={product?.image_url} alt={product?.name} className="product-image" />
        </div>
        
        <div className="product-details">
          <h1 className="product-title">{product?.name}</h1>
          <div className="product-category">{product?.category?.name}</div>
          
          <div className="product-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`bi bi-star${(hoverRating || rating) >= star ? '-fill' : ''}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRating(star)}
              />
            ))}
            <span className="rating-count">({product?.reviewCount || 0} reviews)</span>
          </div>
          
          <p className="product-description">{product?.description}</p>
          
          <div className="product-price">${product?.price}</div>
          
          <div className="product-stock">
            {product?.stock && product.stock > 0 
              ? `In Stock (${product.stock} available)` 
              : 'Out of Stock'}
          </div>
        </div>
        
        <div className="product-actions">
          <div className="price-display">
            <span>Price:</span>
            <span className="price">${product?.price}</span>
          </div>
          
          {productQ > 0 ? (
            <div className="quantity-control">
              <button onClick={handleDecrement}>-</button>
              <span>{productQ}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          ) : (
            <button 
              className="add-to-cart"
              onClick={handleAddToCart}
              disabled={!product?.stock || product.stock <= 0}
            >
              {product?.stock && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}