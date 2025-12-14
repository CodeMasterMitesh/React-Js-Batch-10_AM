import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'COD'
  });

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className={styles.container}>
        <p>Cart is empty. <a href="/shop">Go back to shopping</a></p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to proceed');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const shippingAddress = {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country
      };

      const { data } = await api.post('/checkout', {
        shippingAddress,
        paymentMethod: formData.paymentMethod,
        notes: ''
      });

      if (data.success) {
        if (formData.paymentMethod === 'COD') {
          // Direct order for COD
          await api.post('/checkout/payment-success', {
            orderId: data.order._id,
            paymentId: null,
            transactionId: null
          });
          
          alert('Order placed successfully!');
          await clearCart();
          navigate(`/order-confirmation/${data.order._id}`);
        } else {
          // Redirect to payment gateway (integrate your payment gateway here)
          alert('Redirecting to payment gateway...');
          // window.location.href = paymentGatewayURL;
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.totalPrice || 0;
  const tax = subtotal * 0.05;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Shipping Address</h3>

          <div className={styles.formRow}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
          />

          <div className={styles.formRow}>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formRow}>
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <h3>Payment Method</h3>
          <div className={styles.paymentOptions}>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === 'COD'}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={formData.paymentMethod === 'Card'}
                onChange={handleChange}
              />
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={formData.paymentMethod === 'UPI'}
                onChange={handleChange}
              />
              UPI
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>

        <div className={styles.summary}>
          <h3>Order Summary</h3>
          <div className={styles.items}>
            {cart.items.map(item => (
              <div key={item.product?._id} className={styles.item}>
                <span>{item.product?.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity)?.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className={styles.calculations}>
            <div className={styles.row}>
              <span>Subtotal:</span>
              <span>₹{subtotal?.toFixed(2)}</span>
            </div>
            <div className={styles.row}>
              <span>Tax (5%):</span>
              <span>₹{tax?.toFixed(2)}</span>
            </div>
            <div className={styles.row}>
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className={styles.total}>
              <span>Total:</span>
              <span>₹{total?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
