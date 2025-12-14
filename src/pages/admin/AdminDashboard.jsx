import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { productAPI, categoryAPI, blogAPI, orderAPI } from '../../services/api';
import styles from './AdminDashboard.module.css';
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  FileText,
  ShoppingCart,
  Settings,
  LogOut,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    blogs: 0,
    orders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [products, categories, blogs, orders] = await Promise.all([
        productAPI.getAll(),
        categoryAPI.getAll(),
        blogAPI.getAll(),
        orderAPI.getAll()
      ]);

      setStats({
        products: products.data.pagination?.total || products.data.products.length,
        categories: categories.data.categories.length,
        blogs: blogs.data.pagination?.total || blogs.data.blogs.length,
        orders: orders.data.orders.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const statsCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: <Package size={32} />,
      color: '#667eea',
      link: '/admin/products'
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: <FolderOpen size={32} />,
      color: '#f59e0b',
      link: '/admin/categories'
    },
    {
      title: 'Blog Posts',
      value: stats.blogs,
      icon: <FileText size={32} />,
      color: '#10b981',
      link: '/admin/blogs'
    },
    {
      title: 'Orders',
      value: stats.orders,
      icon: <ShoppingCart size={32} />,
      color: '#ef4444',
      link: '/admin/orders'
    }
  ];

  const quickLinks = [
    { title: 'Products', icon: <Package />, link: '/admin/products', color: '#667eea' },
    { title: 'Categories', icon: <FolderOpen />, link: '/admin/categories', color: '#f59e0b' },
    { title: 'Blogs', icon: <FileText />, link: '/admin/blogs', color: '#10b981' },
    { title: 'Orders', icon: <ShoppingCart />, link: '/admin/orders', color: '#ef4444' },
    { title: 'Settings', icon: <Settings />, link: '/admin/settings', color: '#8b5cf6' }
  ];

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🛍️</span>
            <h2>ShopHub Admin</h2>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <Link to="/admin/dashboard" className={`${styles.navItem} ${styles.active}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/products" className={styles.navItem}>
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link to="/admin/categories" className={styles.navItem}>
            <FolderOpen size={20} />
            <span>Categories</span>
          </Link>
          <Link to="/admin/blogs" className={styles.navItem}>
            <FileText size={20} />
            <span>Blogs</span>
          </Link>
          <Link to="/admin/orders" className={styles.navItem}>
            <ShoppingCart size={20} />
            <span>Orders</span>
          </Link>
          <Link to="/admin/settings" className={styles.navItem}>
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>{user?.name?.charAt(0)}</div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>{user?.name}</p>
              <p className={styles.userRole}>{user?.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.name}!</p>
          </div>
          <Link to="/" className={styles.viewSiteBtn}>
            View Site
          </Link>
        </header>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          {statsCards.map((stat, index) => (
            <Link to={stat.link} key={index} className={styles.statCard} style={{ '--card-color': stat.color }}>
              <div className={styles.statIcon} style={{ background: `${stat.color}20` }}>
                {stat.icon}
              </div>
              <div className={styles.statInfo}>
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <section className={styles.quickLinksSection}>
          <h2>Quick Actions</h2>
          <div className={styles.quickLinks}>
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className={styles.quickLink}
                style={{ '--link-color': link.color }}
              >
                <div className={styles.quickLinkIcon}>{link.icon}</div>
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className={styles.activitySection}>
          <h2>System Information</h2>
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <h4>API Status</h4>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot}></span>
                Connected
              </div>
            </div>
            <div className={styles.infoCard}>
              <h4>Database</h4>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot}></span>
                MongoDB Connected
              </div>
            </div>
            <div className={styles.infoCard}>
              <h4>Last Login</h4>
              <p>{new Date().toLocaleString()}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
