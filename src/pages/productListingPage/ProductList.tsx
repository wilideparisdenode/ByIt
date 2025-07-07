import { useSelector, useDispatch } from "react-redux";
import { addItem, updateQuantity } from "../../components/cartSlice";
import "./procductList.css";

export default function ProductList() {
  const dispatch = useDispatch();

  // Access global state for products and cart
  // const products = useSelector((state: any) => state.products); // Assuming products are stored globally
  const cartItems = useSelector((state: any) => state.cart.products);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

  const handleIncrement = (product: any) => {
    const cartItem = cartItems.find((item: any) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity + 1 : 1;
    dispatch(updateQuantity({ id: product.id, quantity }));
  };

  const handleDecrement = (product: any) => {
    const cartItem = cartItems.find((item: any) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch(updateQuantity({ id: product.id, quantity: cartItem.quantity - 1 }));
    }
  };

  const handleAddToCart = (product: any) => {
    dispatch(addItem(product));
  };

  return (
    <div>
      {/* Product List Section */}
      <div className="ProductsCart">
        {cartItems.map((product: any) => {
          const cartItem = cartItems.find((item: any) => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div className="item" key={product.id}>
              <div className="one">
                <img src={product.withBg} alt={product.name} />
                <div className="Pinfor">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="Pprice">
                <p>{product.price} FCFA</p>
                <div>
                  {quantity > 0 ? (
                    <p>
                      <span className="btn add" onClick={() => handleIncrement(product)}>+</span>
                      <span>{quantity}</span>
                      <span className="btn minus" onClick={() => handleDecrement(product)}>-</span>
                    </p>
                  ) : (
                    <button className="btn addToCart" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Section */}
      <div className="checkout">
        <div>
          <p className="text">Subtotal</p>
          <p>{subtotal.toFixed(2)} FCFA</p>
        </div>
        <button className="btn warning">Checkout</button>
      </div>
    </div>
  );
}