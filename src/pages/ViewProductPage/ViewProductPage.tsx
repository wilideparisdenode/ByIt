import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { Products, Product } from "../../components/types/types";
import { useSelector, useDispatch } from "react-redux";
import { addItem, updateQuantity } from "../../components/cartSlice";

export default function ViewProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useFetch<Products>("/data.json");
  const [product, setProduct] = useState<Product>();
  const dispatch = useDispatch();

  // Get cart items from Redux state
  const cartItems = useSelector((state: any) => state.cart.products);
  const cartItem = cartItems.find((item: Product) => item.id === product?.id);
  const productQ = cartItem?.quantity || 0;

  useEffect(() => {
    if (data && id) {
      const numericId = parseInt(id);
      const found = getProductById(data, numericId);
      setProduct(found);
    }
  }, [id, data]);

  function getProductById(data: Products, id: number): Product | undefined {
    const categories = Object.keys(data) as (keyof Products)[];
    for (const category of categories) {
      const found = data[category].find((product) => product.id === id);
      if (found) return found;
    }
    return undefined;
  }

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product)); // Dispatch addItem action
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

  return (
    <div className="product-overview">
      <div className="product-img">
        <img src={product?.withBg} alt="Product" />
      </div>
      <div className="over-view">
        <p>{product?.description}</p>
        <h1>{product?.name}</h1>
        <div>
          <i className="bi bi-star"></i>
          <i className="bi bi-star"></i>
          <i className="bi bi-star"></i>
          <i className="bi bi-star"></i>
          <i className="bi bi-star"></i>
        </div>
        <span>0 review</span>
        <span className="price">{product?.price}</span>
        <div>
          <h5>{product?.category}</h5>
          <p>{product?.description}</p>
        </div>
      </div>

      <div className="set-price">
        <p>
          <span>Price:</span>
          <span>{product?.price}</span>
        </p>
        {productQ > 0 ? (
          <div>
            <button onClick={handleIncrement}>+</button>
            <p>{productQ}</p>
            <button onClick={handleDecrement}>-</button>
          </div>
        ) : (
          <button className="addToC" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}