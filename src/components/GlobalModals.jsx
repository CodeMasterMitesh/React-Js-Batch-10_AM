import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./GlobalModals.module.css";
import {
  X,
  ShoppingCart,
  Check,
  Star,
  User,
  Mail,
  Lock,
  Package,
  MapPin,
  Settings,
  Truck,
} from "lucide-react";
import { useModal } from "./ModalContext";
import { useNavigate } from "react-router-dom";

const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  size = "md",
  ariaLabel = "Modal",
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousActive = document.activeElement;
    const dialog = dialogRef.current;
    const focusables = dialog?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables?.[0];
    first?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    dialog?.addEventListener("keydown", handleKeyDown);
    return () => {
      dialog?.removeEventListener("keydown", handleKeyDown);
      if (previousActive && previousActive.focus) {
        previousActive.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        className={`${styles.modal} ${styles[size]}`}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export const GlobalModals = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQty,
    removeFromCart,
    totals,
    quickViewProduct,
    closeQuickView,
    addToCart,
    isAccountOpen,
    closeAccount,
    authTab,
    setAuthTab,
  } = useModal();
  const navigate = useNavigate();

  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < Math.round(rating) ? "#FFC107" : "none"}
        color="#FFC107"
      />
    ));
  };

  return (
    <>
      {/* Cart Modal */}
      <ModalWrapper
        isOpen={isCartOpen}
        onClose={closeCart}
        size="lg"
        ariaLabel="Shopping cart dialog"
      >
        <div className={styles.modalHeader}>
          <div className={styles.titleGroup}>
            <ShoppingCart size={24} />
            <div>
              <h3>Shopping Cart</h3>
              <p>{cartItems.length} item(s) in your cart</p>
            </div>
          </div>
        </div>

        <div className={styles.cartBody}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyState}>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className={styles.cartDetails}>
                  <h4>{item.name}</h4>
                  <p className={styles.price}>${item.price.toFixed(2)}</p>
                  <div className={styles.qtyRow}>
                    <label htmlFor={`qty-${item.id}`}>Qty</label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item.id, Number(e.target.value))
                      }
                    />
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.lineTotal}>
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.cartFooter}>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>${totals.shipping.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax</span>
            <span>${totals.tax.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRowTotal}>
            <span>Total</span>
            <span>${totals.total.toFixed(2)}</span>
          </div>
          <div className={styles.cartActions}>
            <button className={styles.secondaryBtn} onClick={closeCart}>
              Continue Shopping
            </button>
            <button className={styles.primaryBtn}>Checkout</button>
          </div>
        </div>
      </ModalWrapper>

      {/* Quick View Modal */}
      <ModalWrapper
        isOpen={Boolean(quickViewProduct)}
        onClose={closeQuickView}
        size="lg"
        ariaLabel="Product quick view dialog"
      >
        {quickViewProduct && (
          <div className={styles.quickViewLayout}>
            <div className={styles.quickImageWrapper}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                loading="lazy"
              />
            </div>
            <div className={styles.quickInfo}>
              <div className={styles.quickHeader}>
                <h3>{quickViewProduct.name}</h3>
                {quickViewProduct.category && (
                  <span className={styles.badge}>
                    {quickViewProduct.category}
                  </span>
                )}
              </div>
              <div className={styles.ratingRow}>
                <div className={styles.stars}>
                  {renderStars(quickViewProduct.rating)}
                </div>
                {quickViewProduct.reviews && (
                  <span className={styles.muted}>
                    ({quickViewProduct.reviews} reviews)
                  </span>
                )}
              </div>
              <p className={styles.quickDesc}>
                {quickViewProduct.description ||
                  "A closer look at this product with key highlights and features."}
              </p>
              <div className={styles.priceRow}>
                <span className={styles.price}>
                  ${quickViewProduct.price?.toFixed(2)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className={styles.originalPrice}>
                    ${quickViewProduct.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>
              <div className={styles.quickActionsRow}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => {
                    addToCart(quickViewProduct);
                    closeQuickView();
                  }}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button
                  className={styles.secondaryBtn}
                  onClick={closeQuickView}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </ModalWrapper>

      {/* Account Modal */}
      <ModalWrapper
        isOpen={isAccountOpen}
        onClose={closeAccount}
        size="md"
        ariaLabel="Account authentication dialog"
      >
        <div className={styles.authTabs}>
          <button
            className={`${styles.tabBtn} ${authTab === "login" ? styles.activeTab : ""}`}
            onClick={() => setAuthTab("login")}
          >
            Login
          </button>
          <button
            className={`${styles.tabBtn} ${authTab === "register" ? styles.activeTab : ""}`}
            onClick={() => setAuthTab("register")}
          >
            Register
          </button>
        </div>

        {authTab === "login" ? (
          <form className={styles.authForm}>
            <div className={styles.inputGroup}>
              <Mail size={18} />
              <input type="email" placeholder="Email" required />
            </div>
            <div className={styles.inputGroup}>
              <Lock size={18} />
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className={styles.primaryBtn}>
              Login
            </button>
          </form>
        ) : (
          <form className={styles.authForm}>
            <div className={styles.inputGroup}>
              <User size={18} />
              <input type="text" placeholder="Full Name" required />
            </div>
            <div className={styles.inputGroup}>
              <Mail size={18} />
              <input type="email" placeholder="Email" required />
            </div>
            <div className={styles.inputGroup}>
              <Lock size={18} />
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className={styles.primaryBtn}>
              Create Account
            </button>
          </form>
        )}

        <div className={styles.authFooter}>
          <button
            className={styles.linkBtn}
            onClick={() => {
              closeAccount();
              navigate("/account");
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </ModalWrapper>
    </>
  );
};
