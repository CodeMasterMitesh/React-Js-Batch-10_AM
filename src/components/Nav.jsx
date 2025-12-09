import React, { useState } from "react";
import style from "./Nav.module.css";
import { ShoppingCart, MapPin, User, Search, Heart, Menu, X, Bell } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function Nav({ logoName }) {
  const [currency, setCurrency] = useState("INR");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const categories = [
    "Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports", 
    "Books", "Toys", "Automotive", "Grocery"
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Add your search logic here
    }
  };

  return (
    <header className={style.header}>
      {/* Top Banner */}
      <div className={style.topBanner}>
        <p>🎉 Free shipping on orders over $50! Shop now</p>
      </div>

      {/* Main Navbar */}
      <nav className={style.navbar}>

        {/* Right Section */}
        <div className={style.rightSection}>
          <div className={style.logo}>
            <div className={style.logoIcon}>🛍️</div>
            <h1>{logoName}</h1>
          </div>
          {/* Search Bar */}
          <form className={style.search} onSubmit={handleSearch}>
            <div className={style.searchContainer}>
              <Search size={18} className={style.searchIcon} />
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={style.searchInput}
              />
              <button type="submit" className={style.searchBtn}>
                Search
              </button>
            </div>
          </form>

          {/* User Actions */}
          <div className={style.actions}>
            {/* Location */}
            <div className={style.location}>
              <MapPin size={16} />
              <div className={style.locationText}>
                <span className={style.deliverTo}>Deliver to</span>
                <span className={style.locationName}>Ahmedabad</span>
              </div>
            </div>

            {/* Notifications */}
            <div className={style.notificationWrapper}>
              <button 
                className={style.actionBtn}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                <span className={style.notificationBadge}>3</span>
              </button>
            </div>

            {/* Wishlist */}
            <button className={style.actionBtn}>
              <Heart size={20} />
              <span>Wishlist</span>
            </button>

            {/* Account */}
            <div className={style.account}>
              <User size={18} />
              <div className={style.accountText}>
                <span className={style.greeting}>Hello,</span>
                <span className={style.signIn}>Sign in</span>
              </div>
            </div>

            {/* Currency */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={style.currencySelect}
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </select>

            {/* Cart */}
            <div className={style.cart}>
              <div className={style.cartIcon}>
                <ShoppingCart size={22} />
                <span className={style.cartCount}>5</span>
              </div>
              <div className={style.cartText}>
                <span className={style.cartLabel}>Cart</span>
                <span className={style.cartAmount}>₹2,499</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={style.mobileMenu}>
          <div className={style.mobileCategories}>
            {categories.map((category) => (
              <a key={category} href="/" className={style.mobileNavLink}>
                {category}
              </a>
            ))}
          </div>
          <div className={style.mobileActions}>
            <a href="/" className={style.mobileAction}>
              <User size={18} />
              <span>My Account</span>
            </a>
            <a href="/" className={style.mobileAction}>
              <Heart size={18} />
              <span>Wishlist</span>
            </a>
            <a href="/" className={style.mobileAction}>
              <Bell size={18} />
              <span>Notifications</span>
            </a>
          </div>
        </div>
      )}

      {/* Category Bar */}
      <div className={style.categoryBar}>
        <div className={style.categoryContainer}>
          {categories.map((category) => (
            <a key={category} href="/" className={style.categoryLink}>
              {category}
            </a>
          ))}
        </div>
      </div>
      <div>
        <Link to="/about">About</Link>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? style.active : "")}>
          Contact
        </NavLink>
      </div>
    </header>
  );
}

export default Nav;