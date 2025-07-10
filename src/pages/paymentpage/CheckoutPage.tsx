import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../../components/cartSlice";
import './payment.css'; // Create this CSS file

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.products);

  // Calculate totals
  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleIncrement = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrement = (id: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <h1>Checkout</h1>
      </header>

      <div className="checkout-grid">
        {/* Order Summary Section */}
        <section className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item: any) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price}</span>
                  </div>
                  
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleDecrement(item.id, item.quantity)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleIncrement(item.id, item.quantity)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="empty-cart-message">Your cart is empty</p>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="total-row">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </section>

        {/* Payment Section */}
        {cartItems.length > 0 && (
          <section className="payment-section">
            <form onSubmit={handleSubmit} className="payment-form">
              <h2>Payment Information</h2>
              
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input 
                  type="text" 
                  id="cardNumber" 
                  placeholder="1234 5678 9012 3456" 
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">Expiry Date</label>
                  <input 
                    type="text" 
                    id="expiry" 
                    placeholder="MM/YY" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input 
                    type="text" 
                    id="cvv" 
                    placeholder="123" 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="name">Name on Card</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                />
              </div>
              
              <button type="submit" className="place-order-btn">
                Place Order - ${total.toFixed(2)}
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}