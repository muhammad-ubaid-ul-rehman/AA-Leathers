/* ============================================================
   AA LEATHERS — SHARED DATA LAYER
   Seed catalog + localStorage helpers used across every page.
   Mirrors the entities in the SDD class diagram:
   Product, ProductVariant, Category, Order, Payment, Review...
   ============================================================ */

const AA = {
  KEYS: {
    PRODUCTS: 'aa_products',
    CATEGORIES: 'aa_categories',
    DELIVERY: 'aa_delivery_charges',
    CART: 'aa_cart',
    WISHLIST: 'aa_wishlist',
    USERS: 'aa_users',
    SESSION: 'aa_session',
    ADMINS: 'aa_admins',
    ADMIN_SESSION: 'aa_admin_session',
    ORDERS: 'aa_orders',
    REVIEWS: 'aa_reviews',
    SEEDED: 'aa_seeded_v1',
  },

  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : (fallback !== undefined ? fallback : null);
    } catch (e) { return fallback !== undefined ? fallback : null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage full/unavailable */ }
  },
  uid(prefix) {
    return (prefix || 'id') + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  },
  money(n) {
    n = Number(n) || 0;
    return 'Rs. ' + n.toLocaleString('en-PK');
  },
  todayISO() { return new Date().toISOString(); },
  fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }
    catch (e) { return iso; }
  },

  // ---------- Seed data (runs once) ----------
  seed() {
    if (AA.get(AA.KEYS.SEEDED)) return;

    const categories = [
      { categoryID: 'cat-bifold', name: 'Bifold Wallets' },
      { categoryID: 'cat-cardholder', name: 'Card Holders' },
      { categoryID: 'cat-travel', name: 'Travel Wallets' },
      { categoryID: 'cat-slim', name: 'Slim Wallets' },
    ];

    const products = [
      {
        productID: 'AA101', name: 'Classic Leather Wallet', articleNo: 'AA101',
        categoryID: 'cat-bifold', description: 'Genuine leather bifold wallet with multiple card slots and a coin pocket. Hand-finished edges and a timeless silhouette.',
        price: 2500,
        variants: [
          { variantID: 'v1', color: 'Black', size: 'Standard', stock: 12 },
          { variantID: 'v2', color: 'Brown', size: 'Standard', stock: 9 },
          { variantID: 'v3', color: 'Dark Brown', size: 'Standard', stock: 6 },
        ],
        active: true,
      },
      {
        productID: 'AA102', name: 'Black Bifold Wallet', articleNo: 'AA102',
        categoryID: 'cat-bifold', description: 'A sleek all-black bifold with a minimalist front pocket and six card slots.',
        price: 2800,
        variants: [
          { variantID: 'v1', color: 'Black', size: 'Standard', stock: 15 },
        ],
        active: true,
      },
      {
        productID: 'AA103', name: 'Dark Brown Cardholder', articleNo: 'AA103',
        categoryID: 'cat-cardholder', description: 'A slim cardholder for the essentials — four card slots and a central pull-tab.',
        price: 1800,
        variants: [
          { variantID: 'v1', color: 'Dark Brown', size: 'Standard', stock: 20 },
          { variantID: 'v2', color: 'Tan', size: 'Standard', stock: 11 },
        ],
        active: true,
      },
      {
        productID: 'AA104', name: 'Slim Travel Wallet', articleNo: 'AA104',
        categoryID: 'cat-travel', description: 'Built for travel — a passport sleeve, boarding-pass pocket, and RFID-safe card slots.',
        price: 3200,
        variants: [
          { variantID: 'v1', color: 'Brown', size: 'Standard', stock: 7 },
          { variantID: 'v2', color: 'Black', size: 'Standard', stock: 5 },
        ],
        active: true,
      },
      {
        productID: 'AA105', name: 'Slim Front-Pocket Wallet', articleNo: 'AA105',
        categoryID: 'cat-slim', description: 'A featherweight slim wallet designed to sit flat in a front pocket.',
        price: 2100,
        variants: [
          { variantID: 'v1', color: 'Black', size: 'Standard', stock: 14 },
          { variantID: 'v2', color: 'Brown', size: 'Standard', stock: 10 },
        ],
        active: true,
      },
      {
        productID: 'AA106', name: 'Tan Long Wallet', articleNo: 'AA106',
        categoryID: 'cat-bifold', description: 'A longline wallet with a zip coin pouch and eight card slots.',
        price: 3500,
        variants: [
          { variantID: 'v1', color: 'Tan', size: 'Standard', stock: 8 },
        ],
        active: true,
      },
    ];

    const deliveryCharges = [
      { chargeID: 'dc-1', region: 'Sahiwal City', amount: 150 },
      { chargeID: 'dc-2', region: 'Other Cities (Punjab)', amount: 250 },
      { chargeID: 'dc-3', region: 'Rest of Pakistan', amount: 350 },
    ];

    const reviews = [
      { reviewID: 'r1', productID: 'AA101', customerName: 'Ahmed R.', rating: 5, comment: 'Excellent quality wallet, fast delivery.', createdAt: AA.todayISO(), updatedAt: AA.todayISO() },
      { reviewID: 'r2', productID: 'AA101', customerName: 'Sara K.', rating: 4, comment: 'Good stitching, exactly as pictured.', createdAt: AA.todayISO(), updatedAt: AA.todayISO() },
      { reviewID: 'r3', productID: 'AA104', customerName: 'Bilal M.', rating: 5, comment: 'Perfect for travel, fits my passport well.', createdAt: AA.todayISO(), updatedAt: AA.todayISO() },
    ];

    AA.set(AA.KEYS.CATEGORIES, categories);
    AA.set(AA.KEYS.PRODUCTS, products);
    AA.set(AA.KEYS.DELIVERY, deliveryCharges);
    AA.set(AA.KEYS.REVIEWS, reviews);
    AA.set(AA.KEYS.ORDERS, []);
    AA.set(AA.KEYS.USERS, []);
    AA.set(AA.KEYS.ADMINS, []);
    AA.set(AA.KEYS.CART, []);
    AA.set(AA.KEYS.WISHLIST, []);
    AA.set(AA.KEYS.SEEDED, true);
  },

  // ---------- Accessors ----------
  products() { return AA.get(AA.KEYS.PRODUCTS, []); },
  saveProducts(list) { AA.set(AA.KEYS.PRODUCTS, list); },
  categories() { return AA.get(AA.KEYS.CATEGORIES, []); },
  saveCategories(list) { AA.set(AA.KEYS.CATEGORIES, list); },
  deliveryCharges() { return AA.get(AA.KEYS.DELIVERY, []); },
  saveDeliveryCharges(list) { AA.set(AA.KEYS.DELIVERY, list); },
  reviews() { return AA.get(AA.KEYS.REVIEWS, []); },
  saveReviews(list) { AA.set(AA.KEYS.REVIEWS, list); },

  productById(id) { return AA.products().find(p => p.productID === id); },
  categoryName(id) { const c = AA.categories().find(c => c.categoryID === id); return c ? c.name : 'Uncategorised'; },

  cart() { return AA.get(AA.KEYS.CART, []); },
  saveCart(list) { AA.set(AA.KEYS.CART, list); AA.updateCartBadge(); },
  cartCount() { return AA.cart().reduce((s, i) => s + i.quantity, 0); },
  updateCartBadge() {
    document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = AA.cartCount(); });
  },

  wishlist() { return AA.get(AA.KEYS.WISHLIST, []); },
  saveWishlist(list) { AA.set(AA.KEYS.WISHLIST, list); },

  users() { return AA.get(AA.KEYS.USERS, []); },
  saveUsers(list) { AA.set(AA.KEYS.USERS, list); },
  session() { return AA.get(AA.KEYS.SESSION, null); },
  setSession(user) { AA.set(AA.KEYS.SESSION, user); },
  logout() { localStorage.removeItem(AA.KEYS.SESSION); },

  admins() { return AA.get(AA.KEYS.ADMINS, []); },
  saveAdmins(list) { AA.set(AA.KEYS.ADMINS, list); },
  adminSession() { return AA.get(AA.KEYS.ADMIN_SESSION, null); },
  setAdminSession(admin) { AA.set(AA.KEYS.ADMIN_SESSION, admin); },
  adminLogout() { localStorage.removeItem(AA.KEYS.ADMIN_SESSION); },

  orders() { return AA.get(AA.KEYS.ORDERS, []); },
  saveOrders(list) { AA.set(AA.KEYS.ORDERS, list); },
  orderById(id) { return AA.orders().find(o => o.orderID === id); },

  deliveryChargeFor(region) {
    const d = AA.deliveryCharges().find(d => d.region === region);
    return d ? d.amount : (AA.deliveryCharges()[0] ? AA.deliveryCharges()[0].amount : 0);
  },

  // Returns inner HTML for a product's thumbnail: an uploaded photo if present,
  // else a minimalist gold wallet mark that matches the site's theme.
  WALLET_SVG: '<svg viewBox="0 0 64 64" class="wallet-icon-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="16" width="52" height="36" rx="4"/><path d="M6 27h52"/><rect x="38" y="30" width="16" height="11" rx="2"/><circle cx="46" cy="35.5" r="1.7" fill="currentColor" stroke="none"/></svg>',
  productThumb(p, cls) {
    cls = cls || 'wallet-icon';
    if (p.images && p.images.length && p.images[0]) {
      return `<img src="${p.images[0]}" alt="${esc ? esc(p.name) : p.name}" style="width:100%;height:100%;object-fit:cover">`;
    }
    return `<span class="${cls}">${AA.WALLET_SVG}</span>`;
  },

  // Compresses an image file to a small JPEG data URL (for localStorage-friendly storage).
  compressImage(file, maxDim, quality) {
    maxDim = maxDim || 500; quality = quality || 0.72;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          let { width, height } = img;
          if (width > height && width > maxDim) { height = Math.round(height * (maxDim / width)); width = maxDim; }
          else if (height > maxDim) { width = Math.round(width * (maxDim / height)); height = maxDim; }
          const canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },
};

AA.seed();
