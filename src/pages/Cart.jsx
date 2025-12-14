import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cart, loading, removeFromCart, updateQuantity, clearCart } = useCart();

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your Cart is Empty</h2>
        <p>Start shopping to add items to your cart</p>
        <Link to="/shop" className={styles.button}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>

      <div className={styles.cartLayout}>
        <div className={styles.items}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.product?._id}>
                  <td>
                    <div className={styles.productInfo}>
                      {item.product?.images?.[0] && (
                        <img src={item.product.images[0]} alt={item.product.name} />
                      )}
                      <span>{item.product?.name}</span>
                    </div>
                  </td>
                  <td>₹{item.price?.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                      className={styles.quantity}
                    />
                  </td>
                  <td>₹{(item.price * item.quantity)?.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className={styles.removeBtn}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.summary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>₹{cart.totalPrice?.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax (5%):</span>
            <span>₹{(cart.totalPrice * 0.05)?.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span>{cart.totalPrice > 500 ? 'Free' : '₹50'}</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total:</span>
            <span>₹{(cart.totalPrice * 1.05 + (cart.totalPrice > 500 ? 0 : 50))?.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>

          <button
            onClick={clearCart}
            className={styles.clearBtn}
          >
            Clear Cart
          </button>

          <Link to="/shop" className={styles.continueBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
