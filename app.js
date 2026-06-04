// ============================================================
// app.js — Core app logic
// Project: E-Commerce Product Catalogue (#298)
// ============================================================

let pageHistory = [];

// ── PAGE NAVIGATION ──────────────────────────────────────────

// ── ADMIN GUARD ───────────────────────────────────────────────
const ADMIN_EMAIL = 'admin@curate.com';
function isAdmin() { return localStorage.getItem('curateUserEmail') === ADMIN_EMAIL; }

function showPage(page, searchVal) {
  // Block non-admins from accessing admin page
  if (page === 'admin' && !isAdmin()) {
    showToast('Access denied — admins only');
    return;
  }
  currentPage = page;
  pageHistory.push(page);
  const c = document.getElementById('appContent');
  if (page === 'home')        c.innerHTML = renderHome();
  else if (page === 'collections') c.innerHTML = renderCollections(searchVal || currentSearchQuery);
  else if (page === 'orders') c.innerHTML = renderOrders();
  else if (page === 'cart')   c.innerHTML = renderCart();
  else if (page === 'wishlist') c.innerHTML = renderWishlist();
  else if (page === 'account') c.innerHTML = renderAccountSettings();
  else if (page === 'compare') c.innerHTML = renderComparePage();
  else if (page === 'history') c.innerHTML = renderHistoryPage();
  else if (page === 'admin')   c.innerHTML = renderAdminPanel();
  else if (page === 'checkout') c.innerHTML = renderCheckout();
  else if (page === 'orderDetail') c.innerHTML = renderOrderDetail(currentOrderId);
  lucide.createIcons();
  updateCounts();
  window.scrollTo(0, 0);
}

// ── PRODUCT DETAIL ────────────────────────────────────────────

function showProductDetail(id) {
  // Track browse history (max 10, no duplicates)
  browseHistory = [id, ...browseHistory.filter(h => h !== id)].slice(0, 10);
  pageHistory.push('product_' + id);
  const c = document.getElementById('appContent');
  c.innerHTML = renderProductDetail(id);
  lucide.createIcons();
  updateCounts();
  window.scrollTo(0, 0);
}

// ── BACK NAVIGATION ───────────────────────────────────────────

window.history.back = function() {
  pageHistory.pop();
  const prev = pageHistory[pageHistory.length - 1] || 'home';
  if (prev.startsWith('product_')) {
    const id = parseInt(prev.replace('product_', ''));
    pageHistory.pop();
    showProductDetail(id);
  } else {
    pageHistory.pop();
    showPage(prev || 'home');
  }
};

// ── COUNTS & BADGES ───────────────────────────────────────────

function updateCounts() {
  const cc = document.getElementById('cartCount');
  const wc = document.getElementById('wishCount');
  const cmp = document.getElementById('compareCount');
  if (cart.length)    { cc.classList.remove('hidden'); cc.textContent = cart.length; }    else cc.classList.add('hidden');
  if (wishlist.length){ wc.classList.remove('hidden'); wc.textContent = wishlist.length; } else wc.classList.add('hidden');
  if (cmp) {
    if (compareList.length) { cmp.classList.remove('hidden'); cmp.textContent = compareList.length; } else cmp.classList.add('hidden');
  }
  // Update compare bar
  const bar = document.getElementById('compareBar');
  if (bar) {
    if (compareList.length > 0) {
      bar.classList.remove('hidden');
      bar.innerHTML = renderCompareBar();
      lucide.createIcons();
    } else {
      bar.classList.add('hidden');
    }
  }
}

// ── CART ──────────────────────────────────────────────────────

function addToCart(id) {
  if (!cart.find(p => p.id === id)) {
    cart.push(products.find(p => p.id === id));
    updateCounts();
    showToast('Added to cart');
  }
}
function removeCart(id) { cart = cart.filter(p => p.id !== id); showPage('cart'); }

// ── WISHLIST ──────────────────────────────────────────────────

function addToWish(id) {
  if (!wishlist.find(p => p.id === id)) {
    wishlist.push(products.find(p => p.id === id));
    updateCounts();
    showToast('Added to wishlist');
  }
}
function removeWish(id) { wishlist = wishlist.filter(p => p.id !== id); showPage('wishlist'); }

// ── COMPARE ───────────────────────────────────────────────────

function toggleCompare(id) {
  if (compareList.includes(id)) {
    compareList = compareList.filter(c => c !== id);
    showToast('Removed from compare');
  } else {
    if (compareList.length >= 3) { showToast('Max 3 products to compare'); return; }
    compareList.push(id);
    showToast('Added to compare');
  }
  updateCounts();
}

// ── TOAST NOTIFICATION ────────────────────────────────────────

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-mblack text-white text-sm px-6 py-3 rounded-full z-[999] shadow-lg transition-all duration-300 opacity-0';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { t.style.opacity = '0'; }, 2000);
}

// ── SEARCH ────────────────────────────────────────────────────

function handleSearch(val) {
  currentSearchQuery = val;
  currentCat = 'All';
  showPage('collections', val);
}

// liveSearch: updates only the product grid, never re-renders the whole page
function liveSearch(val) {
  currentSearchQuery = val;

  if (!document.getElementById('productGrid')) {
    showPage('collections', val);
    return;
  }

  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('productCount');

  let filtered = currentCat === 'All' ? [...products] : products.filter(p => p.cat === currentCat);
  if (val) filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(val.toLowerCase()) ||
    p.cat.toLowerCase().includes(val.toLowerCase())  ||
    (p.brand && p.brand.toLowerCase().includes(val.toLowerCase()))
  );
  if (currentMinPrice || currentMaxPrice) {
    const mn = parseFloat(currentMinPrice) || 0;
    const mx = parseFloat(currentMaxPrice) || Infinity;
    filtered = filtered.filter(p => p.price >= mn && p.price <= mx);
  }
  if (currentMinRating > 0)  filtered = filtered.filter(p => p.rating >= currentMinRating);
  if (currentBrands.length)  filtered = filtered.filter(p => currentBrands.includes(p.brand));
  if (currentColours.length) filtered = filtered.filter(p => p.colours && p.colours.some(c => currentColours.includes(c)));
  if (currentSizes.length)   filtered = filtered.filter(p => p.sizes && p.sizes.some(s => currentSizes.includes(s)));
  if (currentSort === 'Price: Low to High')  filtered.sort((a,b) => a.price - b.price);
  if (currentSort === 'Price: High to Low')  filtered.sort((a,b) => b.price - a.price);
  if (currentSort === 'Top Rated')           filtered.sort((a,b) => b.rating - a.rating);
  if (currentSort === 'Most Reviewed')       filtered.sort((a,b) => b.reviews - a.reviews);

  if (countEl) countEl.textContent = filtered.length + ' product' + (filtered.length !== 1 ? 's' : '') + ' found';

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full flex flex-col items-center py-24 bg-white rounded-2xl border border-beige/20">
      <p class="text-mblack/50 mb-2">No products match your search</p>
      <button onclick="currentSearchQuery='';document.getElementById('colSearch').value='';liveSearch('')" class="text-sm text-gold hover:underline">Clear search</button>
    </div>`;
  } else {
    grid.innerHTML = filtered.map(p => productCardWithCompare(p)).join('');
  }
  lucide.createIcons();
}

// ── CLOSE SEARCH SUGGESTIONS ON OUTSIDE CLICK ────────────────
document.addEventListener('click', (e) => {
  if (!e.target.closest('#colSearch') && !e.target.closest('#searchSuggestBox')) {
    const box = document.getElementById('searchSuggestBox');
    if (box) box.classList.add('hidden');
  }
});

// ── RESET ALL RICH FILTERS ────────────────────────────────────
function resetAllFilters() {
  currentMinPrice  = '';
  currentMaxPrice  = '';
  currentMinRating = 0;
  currentBrands    = [];
  currentColours   = [];
  currentSizes     = [];
  currentSort      = 'Default';
  currentCat       = 'All';
  currentSearchQuery = '';
  showPage('collections');
}

// ── ORDER DETAIL ─────────────────────────────────────────────

let currentOrderId = null;

function showOrderDetail(orderId) {
  currentOrderId = orderId;
  pageHistory.push('orderDetail');
  const c = document.getElementById('appContent');
  c.innerHTML = renderOrderDetail(orderId);
  lucide.createIcons();
  updateCounts();
  window.scrollTo(0, 0);
}

// ── CHECKOUT: PLACE ORDER ─────────────────────────────────────

function placeOrder() {
  const name    = document.getElementById('co_name').value.trim();
  const address = document.getElementById('co_address').value.trim();
  const city    = document.getElementById('co_city').value.trim();
  const pin     = document.getElementById('co_pin').value.trim();
  const card    = document.getElementById('co_card').value.trim();
  const expiry  = document.getElementById('co_expiry').value.trim();
  const cvv     = document.getElementById('co_cvv').value.trim();

  // Basic validation
  if (!name || !address || !city || !pin || !card || !expiry || !cvv) {
    showToast('Please fill in all fields');
    return;
  }
  if (card.replace(/\s/g,'').length < 16) {
    showToast('Enter a valid 16-digit card number');
    return;
  }
  if (cvv.length < 3) {
    showToast('Enter a valid CVV');
    return;
  }

  // Save each cart item as a new order in localStorage
  const email = localStorage.getItem('curateUserEmail') || '';
  const key   = 'curateOrders_' + email;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  const today = new Date().toISOString().split('T')[0];

  const last4 = card.replace(/\s/g,'').slice(-4);
  const newOrders = cart.map((p, i) => ({
    id:        Date.now() + i,
    productId: p.id,
    date:      today,
    status:    'Processing',
    badge:     'bg-beige text-mblack/70',
    name:      name,
    address:   address,
    city:      city,
    pin:       pin,
    last4:     last4,
    expiry:    expiry,
    total:     p.price
  }));

  localStorage.setItem(key, JSON.stringify([...existing, ...newOrders]));

  // Clear the cart
  cart = [];
  updateCounts();

  // Show success page
  const c = document.getElementById('appContent');
  c.innerHTML = `
    <div class="flex flex-col items-center justify-center py-24 slide-up text-center px-6">
      <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <i data-lucide="check" class="w-10 h-10 text-green-600"></i>
      </div>
      <h1 class="font-heading text-4xl mb-3">Order Placed!</h1>
      <p class="text-mblack/50 text-sm mb-2">Thank you, <span class="font-medium text-mblack">${name}</span>.</p>
      <p class="text-mblack/50 text-sm mb-8">Your order will be delivered to <span class="font-medium text-mblack">${address}, ${city} - ${pin}</span>.</p>
      <div class="flex gap-4">
        <button onclick="showPage('orders')" class="px-8 py-3 bg-mblack text-white rounded-full text-sm hover:bg-gold transition">View My Orders</button>
        <button onclick="showPage('collections')" class="px-8 py-3 border border-beige rounded-full text-sm hover:border-gold transition">Continue Shopping</button>
      </div>
    </div>`;
  lucide.createIcons();
  window.scrollTo(0, 0);
}