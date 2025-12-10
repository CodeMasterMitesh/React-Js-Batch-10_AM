import React, { useState } from "react";
import style from "./Nav.module.css";
import { ShoppingCart, User, Search, Heart, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useModal } from "./ModalContext";

function Nav({ logoName = "ShopHub" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { openCart, openAccount, cartItems } = useModal();

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header className={style.header}>
      {/* Top Banner */}
      <div className={style.topBanner}>
        <p>✨ Free Shipping on Orders Over $50 | 30-Day Returns | Shop Now!</p>
      </div>

      {/* Main Navbar */}
      <nav className={style.navbar}>
        <div className={style.navContainer}>
          {/* Mobile Menu Button */}
          <button
            className={style.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className={style.logo}>
            <div className={style.logoIcon}>🛍️</div>
            <h1>{logoName}</h1>
          </Link>

          {/* Navigation Links */}
          <div className={style.navLinks}>
            {navLinks.map((link) => (
              // console.log(link.path),
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `${style.navLink} ${isActive ? style.activeLink : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Search Bar */}
          <form className={style.searchForm} onSubmit={handleSearch}>
            <div className={style.searchContainer}>
              <Search size={18} className={style.searchIcon} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={style.searchInput}
              />
            </div>
          </form>

          {/* User Actions */}
          <div className={style.userActions}>
            {/* Account */}
            <button
              type="button"
              className={style.actionBtn}
              onClick={() => openAccount("login")}
            >
              <User size={22} />
              <span className={style.actionLabel}>Account</span>
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className={style.actionBtn}>
              <Heart size={22} />
              <span className={style.actionLabel}>Wishlist</span>
            </Link>

            {/* Cart */}
            <button type="button" className={style.cartBtn} onClick={openCart}>
              <ShoppingCart size={22} />
              <span className={style.cartBadge}>{cartCount}</span>
              <span className={style.actionLabel}>Cart</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={style.mobileMenu}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${style.mobileNavLink} ${isActive ? style.activeMobileLink : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default Nav;
