import React, { useMemo, useState } from "react";
import styles from "./Account.module.css";
import {
  Package,
  MapPin,
  Settings,
  Shield,
  Edit3,
  Plus,
  Truck,
  CreditCard,
  Bell,
  CheckCircle2,
  Clock3,
  Phone,
  Mail,
  User,
} from "lucide-react";

const initialAddresses = [
  {
    id: "addr-1",
    fullName: "Alex Johnson",
    line1: "123 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    phone: "(415) 555-0187",
    isDefault: true,
  },
  {
    id: "addr-2",
    fullName: "Alex Johnson",
    line1: "42 Sunset Blvd",
    city: "Los Angeles",
    state: "CA",
    zip: "90028",
    phone: "(213) 555-0142",
    isDefault: false,
  },
];

const orders = [
  {
    id: "ORD-10421",
    date: "Dec 05, 2025",
    items: 3,
    total: 289.5,
    status: "Shipped",
    eta: "Dec 12, 2025",
    progress: 70,
  },
  {
    id: "ORD-10387",
    date: "Nov 28, 2025",
    items: 2,
    total: 149.99,
    status: "Delivered",
    eta: "Nov 30, 2025",
    progress: 100,
  },
  {
    id: "ORD-10312",
    date: "Nov 10, 2025",
    items: 1,
    total: 79.0,
    status: "Processing",
    eta: "Dec 08, 2025",
    progress: 45,
  },
];

const statCards = [
  {
    label: "Active Orders",
    value: "03",
    icon: <Package size={20} />,
    tone: "primary",
  },
  {
    label: "Loyalty Points",
    value: "1,240",
    icon: <Shield size={20} />,
    tone: "neutral",
  },
  {
    label: "Saved Addresses",
    value: "02",
    icon: <MapPin size={20} />,
    tone: "success",
  },
  {
    label: "Vouchers",
    value: "05",
    icon: <CreditCard size={20} />,
    tone: "warning",
  },
];

export const Account = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [addresses, setAddresses] = useState(initialAddresses);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    line1: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [prefs, setPrefs] = useState({
    orderUpdates: true,
    promotions: true,
    sms: false,
  });
  const [trackingId, setTrackingId] = useState("");
  const [trackingStatus, setTrackingStatus] = useState(null);

  const defaultAddress = useMemo(
    () => addresses.find((a) => a.isDefault) || addresses[0],
    [addresses],
  );

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.line1 ||
      !formData.city ||
      !formData.state ||
      !formData.zip
    )
      return;

    if (editingId) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId ? { ...addr, ...formData } : addr,
        ),
      );
      setEditingId(null);
    } else {
      setAddresses((prev) => [
        ...prev,
        {
          ...formData,
          id: `addr-${Date.now()}`,
          isDefault: prev.length === 0,
        },
      ]);
    }

    setFormData({
      fullName: "",
      line1: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
  };

  const handleEdit = (addr) => {
    setEditingId(addr.id);
    setFormData({
      fullName: addr.fullName,
      line1: addr.line1,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      phone: addr.phone,
    });
  };

  const setDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const togglePref = (key) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setTrackingStatus({
      id: trackingId,
      status: "In Transit",
      eta: "3-5 business days",
      lastScan: "Departed distribution center",
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.breadcrumb}>Home / Account</p>
          <h1>Account Dashboard</h1>
          <p className={styles.subtitle}>
            Manage your profile, orders, addresses, and preferences from one
            place.
          </p>
          {defaultAddress && (
            <div className={styles.defaultAddress}>
              <MapPin size={18} />
              <div>
                <strong>Default Address:</strong> {defaultAddress.line1},{" "}
                {defaultAddress.city}, {defaultAddress.state}
              </div>
            </div>
          )}
        </div>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>AJ</div>
          <h3>Alex Johnson</h3>
          <p>alex.johnson@example.com</p>
          <div className={styles.profileBadges}>
            <span className={styles.badgePrimary}>Gold Member</span>
            <span className={styles.badgeMuted}>Since 2023</span>
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`${styles.statCard} ${styles[card.tone]}`}
          >
            <div className={styles.statIcon}>{card.icon}</div>
            <div>
              <p className={styles.statLabel}>{card.label}</p>
              <p className={styles.statValue}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tabBar}>
        {[
          { key: "dashboard", label: "Dashboard", icon: <User size={18} /> },
          { key: "orders", label: "Orders", icon: <Package size={18} /> },
          { key: "addresses", label: "Addresses", icon: <MapPin size={18} /> },
          { key: "settings", label: "Settings", icon: <Settings size={18} /> },
          {
            key: "tracking",
            label: "Order Tracking",
            icon: <Truck size={18} />,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tabBtn} ${activeTab === tab.key ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "dashboard" && (
        <div className={styles.gridTwo}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Recent Orders</div>
              <span className={styles.muted}>Last 3 orders</span>
            </div>
            <div className={styles.orderList}>
              {orders.map((order) => (
                <div key={order.id} className={styles.orderRow}>
                  <div>
                    <p className={styles.orderId}>{order.id}</p>
                    <p className={styles.muted}>
                      {order.date} · {order.items} item(s)
                    </p>
                  </div>
                  <div className={styles.statusBlock}>
                    <span className={styles.status}>{order.status}</span>
                    <div className={styles.progressBar}>
                      <div style={{ width: `${order.progress}%` }} />
                    </div>
                    <p className={styles.muted}>ETA {order.eta}</p>
                  </div>
                  <div className={styles.orderTotal}>
                    ${order.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Addresses</div>
              <span className={styles.muted}>{addresses.length} saved</span>
            </div>
            <div className={styles.addressList}>
              {addresses.map((addr) => (
                <div key={addr.id} className={styles.addressCard}>
                  <div>
                    <p className={styles.addressName}>{addr.fullName}</p>
                    <p className={styles.muted}>{addr.line1}</p>
                    <p className={styles.muted}>
                      {addr.city}, {addr.state} {addr.zip}
                    </p>
                    <p className={styles.muted}>
                      <Phone size={14} /> {addr.phone}
                    </p>
                  </div>
                  <div className={styles.addressActions}>
                    {addr.isDefault ? (
                      <span className={styles.badgePrimary}>Default</span>
                    ) : (
                      <button
                        className={styles.linkBtn}
                        onClick={() => setDefault(addr.id)}
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      className={styles.linkBtn}
                      onClick={() => handleEdit(addr)}
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>All Orders</div>
            <span className={styles.muted}>Track and manage your orders</span>
          </div>
          <div className={styles.orderList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderRow}>
                <div>
                  <p className={styles.orderId}>{order.id}</p>
                  <p className={styles.muted}>
                    {order.date} · {order.items} item(s)
                  </p>
                </div>
                <div className={styles.statusBlock}>
                  <span className={styles.status}>{order.status}</span>
                  <div className={styles.progressBar}>
                    <div style={{ width: `${order.progress}%` }} />
                  </div>
                  <p className={styles.muted}>ETA {order.eta}</p>
                </div>
                <div className={styles.orderTotal}>
                  ${order.total.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "addresses" && (
        <div className={styles.gridTwo}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                {editingId ? "Update Address" : "Add New Address"}
              </div>
              <span className={styles.muted}>Shipping & billing</span>
            </div>
            <form className={styles.form} onSubmit={handleAddressSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Address Line
                <input
                  type="text"
                  value={formData.line1}
                  onChange={(e) =>
                    setFormData({ ...formData, line1: e.target.value })
                  }
                  required
                />
              </label>
              <div className={styles.row2}>
                <label>
                  City
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  State
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    required
                  />
                </label>
              </div>
              <div className={styles.row2}>
                <label>
                  ZIP
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) =>
                      setFormData({ ...formData, zip: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Phone
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className={styles.formActions}>
                {editingId && (
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        fullName: "",
                        line1: "",
                        city: "",
                        state: "",
                        zip: "",
                        phone: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button type="submit" className={styles.primaryBtn}>
                  {editingId ? "Update Address" : "Add Address"}
                </button>
              </div>
            </form>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Saved Addresses</div>
              <span className={styles.muted}>{addresses.length} total</span>
            </div>
            <div className={styles.addressList}>
              {addresses.map((addr) => (
                <div key={addr.id} className={styles.addressCard}>
                  <div>
                    <p className={styles.addressName}>{addr.fullName}</p>
                    <p className={styles.muted}>{addr.line1}</p>
                    <p className={styles.muted}>
                      {addr.city}, {addr.state} {addr.zip}
                    </p>
                    <p className={styles.muted}>
                      <Phone size={14} /> {addr.phone}
                    </p>
                  </div>
                  <div className={styles.addressActions}>
                    {addr.isDefault ? (
                      <span className={styles.badgePrimary}>Default</span>
                    ) : (
                      <button
                        className={styles.linkBtn}
                        onClick={() => setDefault(addr.id)}
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      className={styles.linkBtn}
                      onClick={() => handleEdit(addr)}
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>Preferences</div>
            <span className={styles.muted}>Notifications & security</span>
          </div>
          <div className={styles.toggleList}>
            <label className={styles.toggleRow}>
              <div>
                <p className={styles.toggleTitle}>Order Updates</p>
                <p className={styles.muted}>
                  Shipping updates, delivery confirmations
                </p>
              </div>
              <input
                type="checkbox"
                checked={prefs.orderUpdates}
                onChange={() => togglePref("orderUpdates")}
              />
            </label>
            <label className={styles.toggleRow}>
              <div>
                <p className={styles.toggleTitle}>Promotions</p>
                <p className={styles.muted}>Personalized offers & vouchers</p>
              </div>
              <input
                type="checkbox"
                checked={prefs.promotions}
                onChange={() => togglePref("promotions")}
              />
            </label>
            <label className={styles.toggleRow}>
              <div>
                <p className={styles.toggleTitle}>SMS Alerts</p>
                <p className={styles.muted}>Delivery and security alerts</p>
              </div>
              <input
                type="checkbox"
                checked={prefs.sms}
                onChange={() => togglePref("sms")}
              />
            </label>
          </div>
        </div>
      )}

      {activeTab === "tracking" && (
        <div className={styles.gridTwo}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Track an Order</div>
              <span className={styles.muted}>Enter your order ID</span>
            </div>
            <form className={styles.form} onSubmit={handleTrack}>
              <label>
                Order ID
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="e.g., ORD-10421"
                  required
                />
              </label>
              <button type="submit" className={styles.primaryBtn}>
                Track Order
              </button>
            </form>
            {trackingStatus && (
              <div className={styles.trackingCard}>
                <div className={styles.trackingRow}>
                  <Truck size={18} />
                  <div>
                    <p className={styles.trackingTitle}>
                      Order {trackingStatus.id}
                    </p>
                    <p className={styles.muted}>{trackingStatus.status}</p>
                  </div>
                </div>
                <div className={styles.trackingRow}>
                  <Clock3 size={18} />
                  <p className={styles.muted}>ETA: {trackingStatus.eta}</p>
                </div>
                <div className={styles.trackingRow}>
                  <Package size={18} />
                  <p className={styles.muted}>
                    Last scan: {trackingStatus.lastScan}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Need Help?</div>
              <span className={styles.muted}>We are here for you</span>
            </div>
            <div className={styles.supportBox}>
              <div className={styles.supportRow}>
                <Phone size={18} />
                <div>
                  <p className={styles.toggleTitle}>Call Support</p>
                  <p className={styles.muted}>+1 (800) 555-2024</p>
                </div>
              </div>
              <div className={styles.supportRow}>
                <Mail size={18} />
                <div>
                  <p className={styles.toggleTitle}>Email</p>
                  <p className={styles.muted}>support@shophub.com</p>
                </div>
              </div>
              <div className={styles.supportRow}>
                <Shield size={18} />
                <div>
                  <p className={styles.toggleTitle}>Returns & Warranty</p>
                  <p className={styles.muted}>
                    30-day returns · 1-year warranty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
