// ============================================================
// render.js — All HTML rendering functions
// Project: E-Commerce Product Catalogue (#298)
// ============================================================

// ── HELPERS ──────────────────────────────────────────────────

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let s = '';
  for (let i=0;i<full;i++)  s += '<span class="text-gold">★</span>';
  if (half)                  s += '<span class="text-gold" style="opacity:0.6">★</span>';
  for (let i=0;i<empty;i++) s += '<span class="text-mblack/20">★</span>';
  return s;
}

function stockBadge(stock) {
  if (stock === 0)  return '<span class="text-xs text-red-500 font-medium">Out of Stock</span>';
  if (stock <= 10)  return `<span class="text-xs text-orange-500 font-medium">Only ${stock} left</span>`;
  return '<span class="text-xs text-green-600 font-medium">In Stock</span>';
}

// ── PRODUCT CARD ─────────────────────────────────────────────

function productCard(p) {
  const inCart = cart.find(c=>c.id===p.id);
  const inWish = wishlist.find(w=>w.id===p.id);
  return `<div class="card-hover bg-white rounded-xl overflow-hidden border border-beige/20 cursor-pointer relative" onclick="showProductDetail(${p.id})">
    ${p.stock <= 10 && p.stock > 0 ? `<div class="absolute top-2 left-2 z-10 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">Low Stock</div>` : ''}
    ${p.stock === 0 ? `<div class="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">Sold Out</div>` : ''}
    <div class="aspect-square bg-lgrey overflow-hidden">
      <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onerror="this.style.background='#E8DCCF';">
    </div>
    <div class="p-4">
      <p class="text-xs text-mblack/50 uppercase tracking-wider">${p.cat}</p>
      <p class="font-medium text-sm mt-1 leading-tight">${p.name}</p>
      <div class="flex items-center gap-1 mt-1 text-xs">${renderStars(p.rating)}<span class="text-mblack/40 ml-1">(${p.reviews})</span></div>
      <div class="flex items-center justify-between mt-3">
        <span class="text-gold font-medium">$${p.price}</span>
        <div class="flex gap-2">
          <button onclick="event.stopPropagation();addToWish(${p.id})" class="w-7 h-7 rounded-full bg-lgrey flex items-center justify-center hover:bg-beige transition ${inWish?'text-red-400':''}">
            <i data-lucide="heart" class="w-3.5 h-3.5"></i>
          </button>
          <button onclick="event.stopPropagation();addToCart(${p.id})" class="w-7 h-7 rounded-full ${inCart?'bg-gold':'bg-mblack'} text-white flex items-center justify-center hover:bg-gold transition" ${p.stock===0?'disabled':''}>
            <i data-lucide="${inCart?'check':'plus'}" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

// ── PRODUCT DETAIL ────────────────────────────────────────────

function renderProductDetail(id) {
  const p = products.find(pr=>pr.id===id);
  if (!p) return '<div class="p-12 text-center text-mblack/40">Product not found.</div>';
  const related = products.filter(pr=>pr.cat===p.cat && pr.id!==p.id).slice(0,4);
  return `<div class="max-w-5xl mx-auto px-6 py-12 slide-up">
    <button onclick="history.back()" class="flex items-center gap-2 text-sm text-mblack/50 hover:text-mblack mb-8 transition">
      <i data-lucide="arrow-left" class="w-4 h-4"></i> Back
    </button>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="rounded-2xl overflow-hidden bg-lgrey aspect-square">
        <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-xs uppercase tracking-widest text-mblack/40 mb-2">${p.cat}</p>
        <h1 class="font-heading text-4xl font-medium mb-3">${p.name}</h1>
        <div class="flex items-center gap-2 mb-2">
          <div class="text-base">${renderStars(p.rating)}</div>
          <span class="text-sm font-medium">${p.rating}</span>
          <span class="text-sm text-mblack/40">(${p.reviews} reviews)</span>
        </div>
        <div class="mb-4">${stockBadge(p.stock)}</div>
        <p class="text-3xl text-gold font-heading font-medium mb-6">$${p.price}</p>
        <p class="text-sm text-mblack/70 leading-relaxed mb-6">${p.description}</p>

        ${p.sizes && p.sizes.length && p.sizes[0] !== 'One Size' ? `
        <div class="mb-6">
          <p class="text-xs uppercase tracking-widest text-mblack/50 mb-3">Select Size</p>
          <div class="flex flex-wrap gap-2" id="sizeSelector_${p.id}">
            ${p.sizes.map((s, i) => `
              <button
                onclick="document.querySelectorAll('#sizeSelector_${p.id} button').forEach(b=>{b.classList.remove('bg-mblack','text-white','border-mblack');b.classList.add('bg-white','text-mblack','border-beige');});this.classList.remove('bg-white','text-mblack','border-beige');this.classList.add('bg-mblack','text-white','border-mblack');"
                class="px-4 py-2 rounded-lg border text-sm font-medium hover:border-mblack transition ${i===0?'bg-mblack text-white border-mblack':'bg-white text-mblack border-beige'}">
                ${s}
              </button>
            `).join('')}
          </div>
        </div>` : ''}

        <div class="flex gap-3 mb-8">
          <button onclick="addToCart(${p.id})" ${p.stock===0?'disabled':''} class="btn-primary flex-1 py-3.5 bg-mblack text-white rounded-xl text-sm font-medium hover:bg-gold transition ${p.stock===0?'opacity-50 cursor-not-allowed':''}">
            ${p.stock===0?'Out of Stock':'Add to Cart'}
          </button>
          <button onclick="addToWish(${p.id})" class="w-12 h-12 rounded-xl border border-beige flex items-center justify-center hover:border-gold transition">
            <i data-lucide="heart" class="w-5 h-5"></i>
          </button>
        </div>
        <div class="grid grid-cols-3 gap-3 text-center">
          <div class="bg-lgrey rounded-xl p-3"><i data-lucide="truck" class="w-5 h-5 mx-auto mb-1 text-gold"></i><p class="text-xs text-mblack/60">Free Shipping</p></div>
          <div class="bg-lgrey rounded-xl p-3"><i data-lucide="refresh-cw" class="w-5 h-5 mx-auto mb-1 text-gold"></i><p class="text-xs text-mblack/60">30-Day Returns</p></div>
          <div class="bg-lgrey rounded-xl p-3"><i data-lucide="shield-check" class="w-5 h-5 mx-auto mb-1 text-gold"></i><p class="text-xs text-mblack/60">2-Year Warranty</p></div>
        </div>
      </div>
    </div>
    ${related.length ? `
    <div class="mt-16">
      <h2 class="font-heading text-2xl mb-6">More in ${p.cat}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">${related.map(r=>productCardWithCompare(r)).join('')}</div>
    </div>` : ''}
  </div>`;
}

// ── HOME ──────────────────────────────────────────────────────

function renderHome() {
  const trending = [...products].sort((a,b)=>b.reviews-a.reviews).slice(0,4);
  const newArrivals = products.slice(-4);
  return `<div class="slide-up">
    <div class="relative min-h-[480px] flex items-center justify-center overflow-hidden" style="background:linear-gradient(135deg,#1F1F1F,#2d2d2d);">
      <div class="absolute inset-0 opacity-30" style="background-image:url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400');background-size:cover;background-position:center;"></div>
      <div class="relative text-center text-white z-10 px-6">
        <p class="text-gold text-xs tracking-[0.3em] uppercase mb-4">New Season</p>
        <h1 class="font-heading text-5xl md:text-7xl font-light mb-6">The Art of<br>Curation</h1>
        <div class="flex gap-4 justify-center">
          <button onclick="showPage('collections')" class="btn-primary px-8 py-3 bg-gold text-white rounded-full text-sm tracking-wide">Shop Now</button>
          <button onclick="showPage('collections')" class="px-8 py-3 border border-white/40 text-white rounded-full text-sm tracking-wide hover:border-white transition">View All</button>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="bg-white border-b border-beige/20 py-6">
      <div class="max-w-2xl mx-auto px-6">
        <div class="relative">
          <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mblack/40"></i>
          <input id="homeSearch" type="text" placeholder="Search products…" oninput="handleSearch(this.value)"
            class="w-full pl-11 pr-4 py-3 rounded-xl bg-lgrey border border-beige/40 focus:outline-none focus:border-gold text-sm transition">
        </div>
      </div>
    </div>

    <!-- Stats bar -->
    <div class="bg-mblack text-white py-4">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-3 md:grid-cols-3 gap-4 text-center">
        <div><p class="font-heading text-2xl text-gold">${products.length}+</p><p class="text-xs text-white/60 mt-0.5">Products</p></div>
        <div><p class="font-heading text-2xl text-gold">4</p><p class="text-xs text-white/60 mt-0.5">Categories</p></div>
        <div><p class="font-heading text-2xl text-gold">Free</p><p class="text-xs text-white/60 mt-0.5">Shipping</p></div>
      </div>
    </div>

    <!-- Trending -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="flex items-center justify-between mb-10">
        <h2 class="font-heading text-3xl">Trending Now</h2>
        <button onclick="showPage('collections')" class="text-sm text-gold hover:underline">View all →</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        ${trending.map(p=>productCardWithCompare(p)).join('')}
      </div>
    </div>

    <!-- Categories -->
    <div class="bg-lgrey py-16">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="font-heading text-3xl text-center mb-12">Shop by Category</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${[
            {name:'Clothing',    icon:'shirt',       count: products.filter(p=>p.cat==='Clothing').length},
            {name:'Shoes',       icon:'footprints',  count: products.filter(p=>p.cat==='Shoes').length},
            {name:'Electronics', icon:'cpu',         count: products.filter(p=>p.cat==='Electronics').length},
            {name:'Accessories', icon:'watch',       count: products.filter(p=>p.cat==='Accessories').length},
          ].map(c=>`
            <button onclick="currentCat='${c.name}';showPage('collections')" class="card-hover bg-white rounded-xl p-8 text-center border border-beige/20">
              <i data-lucide="${c.icon}" class="w-8 h-8 mx-auto mb-3 text-gold"></i>
              <p class="font-medium text-sm">${c.name}</p>
              <p class="text-xs text-mblack/40 mt-1">${c.count} items</p>
            </button>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- New Arrivals -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="flex items-center justify-between mb-10">
        <h2 class="font-heading text-3xl">New Arrivals</h2>
        <button onclick="showPage('collections')" class="text-sm text-gold hover:underline">View all →</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        ${newArrivals.map(p=>productCardWithCompare(p)).join('')}
      </div>
    </div>

    <!-- Banner -->
    <div class="mx-6 mb-16 rounded-2xl overflow-hidden relative min-h-[200px] flex items-center" style="background:linear-gradient(135deg,#C8A97E,#a07d50);">
      <div class="p-10">
        <p class="text-white/80 text-xs uppercase tracking-widest mb-2">Limited Time</p>
        <h3 class="font-heading text-3xl text-white mb-4">Free Shipping on<br>Orders Over $150</h3>
        <button onclick="showPage('collections')" class="px-6 py-2.5 bg-white text-mblack rounded-full text-sm font-medium hover:bg-cream transition">Shop Now</button>
      </div>
    </div>
  </div>`;
}

// ── COLLECTIONS ───────────────────────────────────────────────

function toggleFilter(arr, val, rerender) {
  const idx = arr.indexOf(val);
  if (idx > -1) arr.splice(idx, 1); else arr.push(val);
  if (rerender) showPage('collections');
}

function buildSuggestions(val) {
  const box = document.getElementById('searchSuggestBox');
  if (!box) return;
  if (!val || val.length < 1) { box.classList.add('hidden'); return; }
  const q = val.toLowerCase();
  const matches = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.cat.toLowerCase().includes(q)  ||
    p.brand.toLowerCase().includes(q)
  ).slice(0, 6);
  if (!matches.length) { box.classList.add('hidden'); return; }
  box.innerHTML = matches.map(p => `
    <div class="flex items-center gap-3 px-4 py-2.5 hover:bg-lgrey cursor-pointer transition" onclick="currentSearchQuery='${p.name.replace(/'/,"\'")}';showPage('collections','${p.name.replace(/'/,"\'")}')" >
      <img src="${p.img}" class="w-8 h-8 rounded-lg object-cover flex-shrink-0">
      <div>
        <p class="text-sm font-medium">${p.name}</p>
        <p class="text-xs text-mblack/40">${p.cat} · ${p.brand}</p>
      </div>
      <span class="ml-auto text-xs text-gold">$${p.price}</span>
    </div>
  `).join('');
  box.classList.remove('hidden');
}

function renderCollections(searchQuery) {
  const cats  = ['All','Clothing','Shoes','Electronics','Accessories'];
  const sorts = ['Default','Price: Low to High','Price: High to Low','Top Rated','Most Reviewed'];

  const poolForFilters = currentCat === 'All' ? products : products.filter(p=>p.cat===currentCat);
  const allBrands  = [...new Set(poolForFilters.map(p=>p.brand))].sort();
  const allColours = [...new Set(poolForFilters.flatMap(p=>p.colours))].sort();
  const allSizes   = [...new Set(poolForFilters.flatMap(p=>p.sizes))];

  let filtered = [...poolForFilters];
  if (searchQuery) filtered = filtered.filter(p=>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.cat.toLowerCase().includes(searchQuery.toLowerCase())  ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (currentMinPrice || currentMaxPrice) {
    const mn = parseFloat(currentMinPrice)||0;
    const mx = parseFloat(currentMaxPrice)||Infinity;
    filtered = filtered.filter(p=>p.price>=mn && p.price<=mx);
  }
  if (currentMinRating > 0)        filtered = filtered.filter(p=>p.rating >= currentMinRating);
  if (currentBrands.length)        filtered = filtered.filter(p=>currentBrands.includes(p.brand));
  if (currentColours.length)       filtered = filtered.filter(p=>p.colours.some(c=>currentColours.includes(c)));
  if (currentSizes.length)         filtered = filtered.filter(p=>p.sizes.some(s=>currentSizes.includes(s)));
  if (currentSort === 'Price: Low to High')  filtered.sort((a,b)=>a.price-b.price);
  if (currentSort === 'Price: High to Low')  filtered.sort((a,b)=>b.price-a.price);
  if (currentSort === 'Top Rated')           filtered.sort((a,b)=>b.rating-a.rating);
  if (currentSort === 'Most Reviewed')       filtered.sort((a,b)=>b.reviews-a.reviews);

  const hasActiveFilters = currentMinPrice||currentMaxPrice||currentMinRating||currentBrands.length||currentColours.length||currentSizes.length;

  return `<div class="max-w-7xl mx-auto px-6 py-12 slide-up">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <h1 class="font-heading text-4xl">Collections</h1>
      <div class="relative w-full md:w-80">
        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mblack/40 z-10"></i>
        <input id="colSearch" type="text" placeholder="Search products, brands…" value="${searchQuery||''}"
          oninput="currentSearchQuery=this.value;buildSuggestions(this.value);liveSearch(this.value)"
          onfocus="buildSuggestions(this.value)"
          class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-lgrey border border-beige/40 focus:outline-none focus:border-gold text-sm transition">
        <div id="searchSuggestBox" class="hidden absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-beige/30 shadow-xl z-50 overflow-hidden max-h-72 overflow-y-auto"></div>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 mb-6">
      ${cats.map(c=>`<button onclick="currentCat='${c}';currentBrands=[];currentColours=[];currentSizes=[];showPage('collections')" class="px-4 py-1.5 rounded-full text-sm border transition ${currentCat===c?'bg-mblack text-white border-mblack':'border-beige hover:border-gold'}">${c}</button>`).join('')}
      <select onchange="currentSort=this.value;showPage('collections')" class="ml-auto text-sm border border-beige rounded-lg px-3 py-1.5 focus:outline-none focus:border-gold bg-white">
        ${sorts.map(s=>`<option ${currentSort===s?'selected':''}>${s}</option>`).join('')}
      </select>
    </div>

    <div class="flex gap-6">
      <aside class="hidden md:block w-56 flex-shrink-0">
        <div class="bg-white rounded-2xl border border-beige/20 p-5 sticky top-24 space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-sm">Filters</h3>
            ${hasActiveFilters ? `<button onclick="currentMinPrice='';currentMaxPrice='';currentMinRating=0;currentBrands=[];currentColours=[];currentSizes=[];showPage('collections')" class="text-xs text-red-400 hover:text-red-600 transition">Clear all</button>` : ''}
          </div>
          <div>
            <p class="text-xs uppercase tracking-wider text-mblack/50 mb-2">Price Range</p>
            <div class="flex gap-2">
              <input type="number" placeholder="Min" value="${currentMinPrice||''}" onchange="currentMinPrice=this.value;showPage('collections')"
                class="w-full px-2 py-1.5 text-xs rounded-lg border border-beige focus:border-gold focus:outline-none">
              <input type="number" placeholder="Max" value="${currentMaxPrice||''}" onchange="currentMaxPrice=this.value;showPage('collections')"
                class="w-full px-2 py-1.5 text-xs rounded-lg border border-beige focus:border-gold focus:outline-none">
            </div>
          </div>
          <div>
            <p class="text-xs uppercase tracking-wider text-mblack/50 mb-2">Min Rating</p>
            <div class="space-y-1">
              ${[4.5,4.0,3.5,0].map(r=>`
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="ratingFilter" ${currentMinRating==r?'checked':''} onchange="currentMinRating=${r};showPage('collections')" class="accent-gold">
                  <span class="text-xs">${r===0?'All ratings':'${r}★ & above'.replace('${r}',r)}</span>
                </label>
              `).join('')}
            </div>
          </div>
          ${allBrands.length ? `<div>
            <p class="text-xs uppercase tracking-wider text-mblack/50 mb-2">Brand</p>
            <div class="space-y-1 max-h-36 overflow-y-auto">
              ${allBrands.map(b=>`
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" ${currentBrands.includes(b)?'checked':''} onchange="toggleFilter(currentBrands,'${b.replace(/'/,"\'")}',true)" class="accent-gold w-3.5 h-3.5">
                  <span class="text-xs">${b}</span>
                </label>
              `).join('')}
            </div>
          </div>` : ''}
          ${allColours.length ? `<div>
            <p class="text-xs uppercase tracking-wider text-mblack/50 mb-2">Colour</p>
            <div class="flex flex-wrap gap-1.5">
              ${allColours.map(c=>{
                const colMap = {Black:'#1a1a1a',White:'#f5f5f5',Navy:'#1a2a4a',Grey:'#808080',Tan:'#d2b48c',Brown:'#8B6914',Beige:'#F5DEB3',Ivory:'#FFFFF0',Camel:'#C19A6B',Khaki:'#C3B091',Sand:'#F4D03F',Indigo:'#4B0082',Charcoal:'#36454F',Silver:'#C0C0C0',Gold:'#FFD700','Rose Gold':'#B76E79','Sky Blue':'#87CEEB','Light Blue':'#ADD8E6','Space Grey':'#717378',Forest:'#228B22',Olive:'#808000',Burgundy:'#800020',Tortoise:'#8B4513',Clear:'#E8F4F8',Nude:'#E3BC9A',Cream:'#FFFDD0'};
                const hex = colMap[c]||'#ccc';
                const selected = currentColours.includes(c);
                return `<button title="${c}" onclick="toggleFilter(currentColours,'${c}',true)" class="w-6 h-6 rounded-full border-2 transition ${selected?'border-gold scale-110':'border-white'}" style="background:${hex}"></button>`;
              }).join('')}
            </div>
          </div>` : ''}
          ${allSizes.filter(s=>s!=='One Size').length ? `<div>
            <p class="text-xs uppercase tracking-wider text-mblack/50 mb-2">Size</p>
            <div class="flex flex-wrap gap-1">
              ${[...new Set(allSizes.filter(s=>s!=='One Size'))].map(s=>`
                <button onclick="toggleFilter(currentSizes,'${s}',true)" class="px-2 py-1 text-xs rounded border transition ${currentSizes.includes(s)?'bg-mblack text-white border-mblack':'border-beige hover:border-gold'}">${s}</button>
              `).join('')}
            </div>
          </div>` : ''}
        </div>
      </aside>

      <div class="flex-1">
        <div class="flex items-center justify-between mb-4">
          <p id="productCount" class="text-sm text-mblack/50">${filtered.length} product${filtered.length!==1?'s':''} found</p>
          ${hasActiveFilters ? `<span class="text-xs bg-gold/10 text-gold px-2 py-1 rounded-full">Filters active</span>` : ''}
        </div>
        ${filtered.length===0
          ? `<div class="flex flex-col items-center py-24 bg-white rounded-2xl border border-beige/20">
              <i data-lucide="search-x" class="w-12 h-12 text-beige mb-4"></i>
              <p class="text-mblack/50 mb-2">No products match your filters</p>
              <button onclick="currentCat='All';currentMinPrice='';currentMaxPrice='';currentMinRating=0;currentBrands=[];currentColours=[];currentSizes=[];showPage('collections')" class="text-sm text-gold hover:underline">Clear all filters</button>
            </div>`
          : `<div id="productGrid" class="grid grid-cols-2 md:grid-cols-3 gap-5">${filtered.map(p=>productCardWithCompare(p)).join('')}</div>`
        }
      </div>
    </div>
  </div>`;
}

// ── ORDERS ────────────────────────────────────────────────────

function renderOrders() {
  const userOrders = getUserOrders();
  if (!userOrders.length) return `<div class="flex flex-col items-center justify-center py-24 slide-up">
    <i data-lucide="package" class="w-12 h-12 text-beige mb-4"></i>
    <p class="text-mblack/50 mb-4">No orders yet for this account</p>
    <button onclick="showPage('collections')" class="px-6 py-2.5 bg-mblack text-white rounded-full text-sm hover:bg-gold transition">Start Shopping</button>
  </div>`;
  return `<div class="max-w-4xl mx-auto px-6 py-12 slide-up">
    <h1 class="font-heading text-4xl mb-2">My Orders</h1>
    <p class="text-mblack/40 text-sm mb-8">${userOrders.length} order${userOrders.length!==1?'s':''} placed</p>
    <div class="space-y-4">${userOrders.map(o=>`
      <div class="bg-white rounded-xl p-5 border border-beige/20 flex items-center gap-5 card-hover cursor-pointer" onclick="showOrderDetail(${o.id})">
        <img src="${o.product.img}" alt="${o.product.name}" loading="lazy" class="w-20 h-20 rounded-lg object-cover flex-shrink-0" onerror="this.style.background='#E8DCCF';">
        <div class="flex-1 min-w-0">
          <p class="font-medium truncate">${o.product.name}</p>
          <p class="text-xs text-mblack/50 mt-0.5">Order #${o.id} · ${o.date}</p>
          <div class="flex items-center gap-1 mt-1 text-xs">${renderStars(o.product.rating)}<span class="text-mblack/40 ml-1">(${o.product.reviews})</span></div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="font-medium text-gold">$${o.product.price}</p>
          <span class="inline-block mt-1 px-3 py-1 rounded-full text-xs ${o.badge}">${o.status}</span>
          <p class="text-xs text-gold mt-2 hover:underline">View Details →</p>
        </div>
      </div>
    `).join('')}</div>
  </div>`;
}

// ── CART ──────────────────────────────────────────────────────

function renderCart() {
  if (!cart.length) return `<div class="flex flex-col items-center justify-center py-24 slide-up">
    <i data-lucide="shopping-bag" class="w-12 h-12 text-beige mb-4"></i>
    <p class="text-mblack/50 mb-4">Your cart is empty</p>
    <button onclick="showPage('collections')" class="px-6 py-2.5 bg-mblack text-white rounded-full text-sm hover:bg-gold transition">Browse Products</button>
  </div>`;
  const subtotal  = cart.reduce((s,p)=>s+p.price,0);
  const shipping  = subtotal >= 150 ? 0 : 15;
  const total     = subtotal + shipping;
  return `<div class="max-w-5xl mx-auto px-6 py-12 slide-up">
    <h1 class="font-heading text-4xl mb-8">Cart <span class="text-mblack/30 text-2xl">(${cart.length})</span></h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-4">${cart.map(p=>`
        <div class="bg-white rounded-xl p-4 border border-beige/20 flex items-center gap-4">
          <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer" onclick="showProductDetail(${p.id})" onerror="this.style.background='#E8DCCF';">
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm truncate cursor-pointer hover:text-gold transition" onclick="showProductDetail(${p.id})">${p.name}</p>
            <p class="text-xs text-mblack/40 mt-0.5">${p.cat}</p>
            <p class="text-gold text-sm font-medium mt-1">$${p.price}</p>
          </div>
          <button onclick="removeCart(${p.id})" class="text-mblack/30 hover:text-red-500 transition flex-shrink-0"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
      `).join('')}</div>
      <div class="bg-white rounded-xl border border-beige/20 p-6 h-fit space-y-4">
        <h2 class="font-heading text-xl">Order Summary</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-mblack/60">Subtotal</span><span>$${subtotal}</span></div>
          <div class="flex justify-between"><span class="text-mblack/60">Shipping</span><span class="${shipping===0?'text-green-600':''}">${shipping===0?'Free':'$'+shipping}</span></div>
          ${shipping>0?`<p class="text-xs text-mblack/40">Add $${150-subtotal} more for free shipping</p>`:''}
          <div class="border-t border-beige/20 pt-2 flex justify-between font-medium"><span>Total</span><span class="text-gold">$${total}</span></div>
        </div>
        <button onclick="showPage('checkout')" class="btn-primary w-full py-3.5 bg-mblack text-white rounded-xl text-sm font-medium hover:bg-gold transition">Proceed to Checkout</button>
        <button onclick="showPage('collections')" class="w-full py-2.5 text-sm text-mblack/50 hover:text-mblack transition">Continue Shopping</button>
      </div>
    </div>
  </div>`;
}

// ── CHECKOUT ──────────────────────────────────────────────────

function renderCheckout() {
  if (!cart.length) return `<div class="flex flex-col items-center justify-center py-24 slide-up">
    <i data-lucide="shopping-bag" class="w-12 h-12 text-beige mb-4"></i>
    <p class="text-mblack/50 mb-4">Your cart is empty</p>
    <button onclick="showPage('collections')" class="px-6 py-2.5 bg-mblack text-white rounded-full text-sm hover:bg-gold transition">Browse Products</button>
  </div>`;

  const subtotal = cart.reduce((s,p)=>s+p.price,0);
  const shipping = subtotal >= 150 ? 0 : 15;
  const total    = subtotal + shipping;

  return `<div class="max-w-5xl mx-auto px-6 py-12 slide-up">
    <button onclick="showPage('cart')" class="flex items-center gap-2 text-sm text-mblack/50 hover:text-mblack mb-8 transition">
      <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Cart
    </button>
    <h1 class="font-heading text-4xl mb-8">Checkout</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

      <!-- Left: Forms -->
      <div class="md:col-span-2 space-y-6">

        <!-- Delivery Address -->
        <div class="bg-white rounded-2xl border border-beige/20 p-6">
          <h2 class="font-medium mb-5 flex items-center gap-2">
            <i data-lucide="map-pin" class="w-4 h-4 text-gold"></i> Delivery Address
          </h2>
          <div class="space-y-4">
            <div>
              <label class="text-xs uppercase tracking-wider text-mblack/50 mb-1 block">Full Name</label>
              <input id="co_name" type="text" placeholder="John Doe"
                class="w-full px-4 py-3 rounded-lg bg-lgrey border border-beige/50 focus:outline-none focus:border-gold text-sm transition">
            </div>
            <div>
              <label class="text-xs uppercase tracking-wider text-mblack/50 mb-1 block">Street Address</label>
              <input id="co_address" type="text" placeholder="123 Main Street, Apt 4B"
                class="w-full px-4 py-3 rounded-lg bg-lgrey border border-beige/50 focus:outline-none focus:border-gold text-sm transition">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs uppercase tracking-wider text-mblack/50 mb-1 block">City</label>
                <input id="co_city" type="text" placeholder="Mumbai"
                  class="w-full px-4 py-3 rounded-lg bg-lgrey border border-beige/50 focus:outline-none focus:border-gold text-sm transition">
              </div>
              <div>
                <label class="text-xs uppercase tracking-wider text-mblack/50 mb-1 block">PIN Code</label>
                <input id="co_pin" type="text" placeholder="400001" maxlength="6"
                  class="w-full px-4 py-3 rounded-lg bg-lgrey border border-beige/50 focus:outline-none focus:border-gold text-sm transition">
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Details -->
        <div class="bg-white rounded-2xl border border-beige/20 p-6">
          <h2 class="font-medium mb-5 flex items-center gap-2">
            <i data-lucide="credit-card" class="w-4 h-4 text-gold"></i> Payment Details
          </h2>
          <div class="space-y-4">
            <div>
              <label class="text-xs uppercase tracking-wider text-mblack/50 mb-1 block">Card Number</label>
              <input id="co_card" type="text" placeholder="1234 5678 9012 3456" maxlength="19"
                oninput="this.value=this.value.replace(/[^0-9]/g,'').replace(/(.{4})/g,'$1 ').trim()"
                class="w-full px-4 py-3 rounded-lg bg-lgrey border border-beige/50 focus:outline-none focus:border-gold text-sm transition tracking-widest">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs uppercase tracking-wider text-mblack/50 mb-1 block">Expiry Date</label>
                <input id="co_expiry" type="text" placeholder="MM/YY" maxlength="5"
                  oninput="this.value=this.value.replace(/[^0-9/]/g,'').replace(/^(\d{2})(\d)/,'$1/$2')"
                  class="w-full px-4 py-3 rounded-lg bg-lgrey border border-beige/50 focus:outline-none focus:border-gold text-sm transition">
              </div>
              <div>
                <label class="text-xs uppercase tracking-wider text-mblack/50 mb-1 block">CVV</label>
                <input id="co_cvv" type="password" placeholder="•••" maxlength="4"
                  class="w-full px-4 py-3 rounded-lg bg-lgrey border border-beige/50 focus:outline-none focus:border-gold text-sm transition">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Order Summary -->
      <div class="space-y-4">
        <div class="bg-white rounded-2xl border border-beige/20 p-6">
          <h2 class="font-heading text-xl mb-4">Order Summary</h2>
          <div class="space-y-3 mb-4">
            ${cart.map(p=>`
              <div class="flex items-center gap-3">
                <img src="${p.img}" class="w-12 h-12 rounded-lg object-cover flex-shrink-0">
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium truncate">${p.name}</p>
                  <p class="text-xs text-mblack/40">${p.cat}</p>
                </div>
                <span class="text-xs text-gold font-medium flex-shrink-0">$${p.price}</span>
              </div>
            `).join('')}
          </div>
          <div class="border-t border-beige/20 pt-4 space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-mblack/60">Subtotal</span><span>$${subtotal}</span></div>
            <div class="flex justify-between"><span class="text-mblack/60">Shipping</span><span class="${shipping===0?'text-green-600':''}">${shipping===0?'Free':'$'+shipping}</span></div>
            <div class="border-t border-beige/20 pt-2 flex justify-between font-medium text-base">
              <span>Total</span><span class="text-gold">$${total}</span>
            </div>
          </div>
        </div>

        <button onclick="placeOrder()" class="btn-primary w-full py-4 bg-mblack text-white rounded-xl text-sm font-medium hover:bg-gold transition flex items-center justify-center gap-2">
          <i data-lucide="lock" class="w-4 h-4"></i> Place Order · $${total}
        </button>
        <p class="text-xs text-mblack/40 text-center">Your payment is secured with 256-bit SSL encryption</p>
      </div>
    </div>
  </div>`;
}


// ── ORDER DETAIL ──────────────────────────────────────────────

function renderOrderDetail(orderId) {
  const allOrders = getUserOrders();
  const o = allOrders.find(ord => ord.id == orderId);
  if (!o) return '<div class="p-12 text-center text-mblack/40">Order not found.</div>';
  const p = o.product;

  const statusSteps = ['Processing', 'Confirmed', 'Shipped', 'In Transit', 'Delivered'];
  const currentStep = statusSteps.indexOf(o.status);
  const activeStep  = currentStep === -1 ? 0 : currentStep;

  return `<div class="max-w-3xl mx-auto px-6 py-12 slide-up">
    <button onclick="showPage('orders')" class="flex items-center gap-2 text-sm text-mblack/50 hover:text-mblack mb-8 transition">
      <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Orders
    </button>

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-heading text-4xl mb-1">Order Details</h1>
        <p class="text-mblack/40 text-sm">Order #${o.id}</p>
      </div>
      <span class="px-4 py-1.5 rounded-full text-sm font-medium ${o.badge}">${o.status}</span>
    </div>

    <!-- Order Progress -->
    <div class="bg-white rounded-2xl border border-beige/20 p-6 mb-6">
      <h2 class="font-medium mb-6 flex items-center gap-2">
        <i data-lucide="package" class="w-4 h-4 text-gold"></i> Order Progress
      </h2>
      <div class="relative flex justify-between items-center">
        <div class="absolute top-4 left-0 right-0 h-0.5 bg-beige/50 z-0"></div>
        <div class="absolute top-4 left-0 h-0.5 bg-gold z-0 transition-all duration-700"
             style="width: ${activeStep === 0 ? 0 : Math.min((activeStep / (statusSteps.length - 1)) * 100, 100)}%"></div>
        ${statusSteps.map((step, i) => `
          <div class="relative z-10 flex flex-col items-center gap-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition
              ${i <= activeStep ? 'bg-gold text-white' : 'bg-beige text-mblack/40'}">
              ${i < activeStep ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : (i + 1)}
            </div>
            <p class="text-xs text-center ${i <= activeStep ? 'text-mblack font-medium' : 'text-mblack/40'} w-16">${step}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Product Info -->
    <div class="bg-white rounded-2xl border border-beige/20 p-6 mb-6">
      <h2 class="font-medium mb-4 flex items-center gap-2">
        <i data-lucide="shopping-bag" class="w-4 h-4 text-gold"></i> Item Ordered
      </h2>
      <div class="flex items-center gap-4 cursor-pointer" onclick="showProductDetail(${p.id})">
        <img src="${p.img}" alt="${p.name}" class="w-20 h-20 rounded-xl object-cover flex-shrink-0">
        <div class="flex-1 min-w-0">
          <p class="font-medium">${p.name}</p>
          <p class="text-xs text-mblack/40 mt-0.5">${p.cat} · ${p.brand}</p>
          <div class="flex items-center gap-1 mt-1 text-xs">${renderStars(p.rating)}</div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-gold font-medium text-lg">$${o.total || p.price}</p>
          <p class="text-xs text-gold hover:underline mt-1">View Product →</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

      <!-- Delivery Address -->
      <div class="bg-white rounded-2xl border border-beige/20 p-6">
        <h2 class="font-medium mb-4 flex items-center gap-2">
          <i data-lucide="map-pin" class="w-4 h-4 text-gold"></i> Delivery Address
        </h2>
        ${o.name ? `
        <p class="font-medium text-sm">${o.name}</p>
        <p class="text-sm text-mblack/60 mt-1">${o.address}</p>
        <p class="text-sm text-mblack/60">${o.city} - ${o.pin}</p>
        ` : '<p class="text-sm text-mblack/40">Address not available</p>'}
      </div>

      <!-- Payment Info -->
      <div class="bg-white rounded-2xl border border-beige/20 p-6">
        <h2 class="font-medium mb-4 flex items-center gap-2">
          <i data-lucide="credit-card" class="w-4 h-4 text-gold"></i> Payment
        </h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-mblack/50">Method</span>
            <span class="font-medium">${o.last4 ? 'Card ending •••• ' + o.last4 : 'Credit / Debit Card'}</span>
          </div>
          ${o.expiry ? `<div class="flex justify-between"><span class="text-mblack/50">Expiry</span><span>${o.expiry}</span></div>` : ''}
          <div class="flex justify-between">
            <span class="text-mblack/50">Amount Paid</span>
            <span class="text-gold font-medium">$${o.total || p.price}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-mblack/50">Shipping</span>
            <span class="text-green-600">Free</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Meta -->
    <div class="bg-white rounded-2xl border border-beige/20 p-6">
      <h2 class="font-medium mb-4 flex items-center gap-2">
        <i data-lucide="info" class="w-4 h-4 text-gold"></i> Order Information
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div><p class="text-mblack/40 text-xs mb-0.5">Order ID</p><p class="font-medium">#${o.id}</p></div>
        <div><p class="text-mblack/40 text-xs mb-0.5">Order Date</p><p class="font-medium">${o.date}</p></div>
        <div><p class="text-mblack/40 text-xs mb-0.5">Status</p><span class="px-2 py-0.5 rounded-full text-xs ${o.badge}">${o.status}</span></div>
      </div>
    </div>

  </div>`;
}

// ── WISHLIST ──────────────────────────────────────────────────

function renderWishlist() {
  if (!wishlist.length) return `<div class="flex flex-col items-center justify-center py-24 slide-up">
    <i data-lucide="heart" class="w-12 h-12 text-beige mb-4"></i>
    <p class="text-mblack/50 mb-4">Your wishlist is empty</p>
    <button onclick="showPage('collections')" class="px-6 py-2.5 bg-mblack text-white rounded-full text-sm hover:bg-gold transition">Discover Products</button>
  </div>`;
  return `<div class="max-w-7xl mx-auto px-6 py-12 slide-up">
    <h1 class="font-heading text-4xl mb-8">Wishlist <span class="text-mblack/30 text-2xl">(${wishlist.length})</span></h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">${wishlist.map(p=>`
      <div class="card-hover bg-white rounded-xl overflow-hidden border border-beige/20 relative cursor-pointer" onclick="showProductDetail(${p.id})">
        <button onclick="event.stopPropagation();removeWish(${p.id})" class="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow z-10 hover:text-red-500 transition"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
        <div class="aspect-square bg-lgrey overflow-hidden"><img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover"></div>
        <div class="p-4">
          <p class="font-medium text-sm">${p.name}</p>
          <div class="text-xs mt-0.5">${renderStars(p.rating)}</div>
          <p class="text-gold mt-1 font-medium">$${p.price}</p>
          <button onclick="event.stopPropagation();addToCart(${p.id})" class="mt-3 w-full py-2 bg-mblack text-white rounded-lg text-xs hover:bg-gold transition">Add to Cart</button>
        </div>
      </div>
    `).join('')}</div>
  </div>`;
}

// ── ACCOUNT SETTINGS ─────────────────────────────────────────

function renderAccountSettings() {
  const email = localStorage.getItem('curateUserEmail') || '';
  const name  = localStorage.getItem('curateUserName')  || 'User';
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  const orders = getUserOrders();
  return `<div class="max-w-4xl mx-auto px-6 py-12 slide-up">
    <h1 class="font-heading text-4xl mb-2">Account Settings</h1>
    <p class="text-mblack/50 text-sm mb-10">Manage your Curate account</p>
    <div class="bg-white rounded-2xl border border-beige/20 p-6 mb-6 flex items-center gap-5">
      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-mblack flex items-center justify-center text-2xl font-heading font-medium text-white">${displayName.charAt(0).toUpperCase()}</div>
      <div>
        <p class="font-medium text-lg">${displayName}</p>
        <p class="text-sm text-mblack/50">${email}</p>
        <p class="text-xs text-green-600 mt-0.5">${orders.length} order${orders.length!==1?'s':''} placed</p>
      </div>
      <button class="ml-auto text-xs px-4 py-2 border border-beige rounded-lg hover:border-gold transition">Edit Profile</button>
    </div>
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-white rounded-xl border border-beige/20 p-4 text-center">
        <p class="font-heading text-2xl text-gold">${orders.length}</p>
        <p class="text-xs text-mblack/50 mt-1">Total Orders</p>
      </div>
      <div class="bg-white rounded-xl border border-beige/20 p-4 text-center">
        <p class="font-heading text-2xl text-gold">${wishlist.length}</p>
        <p class="text-xs text-mblack/50 mt-1">Wishlist Items</p>
      </div>
      <div class="bg-white rounded-xl border border-beige/20 p-4 text-center">
        <p class="font-heading text-2xl text-gold">${cart.length}</p>
        <p class="text-xs text-mblack/50 mt-1">Cart Items</p>
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-beige/20 mb-6 overflow-hidden">
      <div class="px-6 py-4 border-b border-beige/20 flex items-center gap-3">
        <i data-lucide="lock" class="w-5 h-5 text-gold"></i>
        <h2 class="font-medium">Login &amp; Security</h2>
      </div>
      ${settingRow('Email address', email, 'Edit')}
      ${settingRow('Password', '••••••••••', 'Change')}
      ${settingRow('Two-step verification', 'Not enabled', 'Enable')}
    </div>
    <div class="bg-white rounded-2xl border border-beige/20 mb-6 overflow-hidden">
      <div class="px-6 py-4 border-b border-beige/20 flex items-center gap-3">
        <i data-lucide="map-pin" class="w-5 h-5 text-gold"></i>
        <h2 class="font-medium">Address Book</h2>
      </div>
      ${settingRow('Default shipping address', 'No address saved', 'Add')}
      ${settingRow('Default billing address', 'Same as shipping', 'Edit')}
    </div>
    <div class="bg-white rounded-2xl border border-beige/20 mb-6 overflow-hidden">
      <div class="px-6 py-4 border-b border-beige/20 flex items-center gap-3">
        <i data-lucide="credit-card" class="w-5 h-5 text-gold"></i>
        <h2 class="font-medium">Payment Methods</h2>
      </div>
      ${settingRow('Saved cards', 'No cards saved', 'Add')}
      ${settingRow('UPI / Wallets', 'Not linked', 'Link')}
    </div>
    <div class="bg-white rounded-2xl border border-beige/20 mb-6 overflow-hidden">
      <div class="px-6 py-4 border-b border-beige/20 flex items-center gap-3">
        <i data-lucide="bell" class="w-5 h-5 text-gold"></i>
        <h2 class="font-medium">Notifications</h2>
      </div>
      ${toggleRow('Order updates via email', true)}
      ${toggleRow('Promotional offers', false)}
      ${toggleRow('New arrivals & restocks', true)}
    </div>
    <div class="bg-white rounded-2xl border border-beige/20 mb-6 overflow-hidden">
      <div class="px-6 py-4 border-b border-beige/20 flex items-center gap-3">
        <i data-lucide="shield" class="w-5 h-5 text-gold"></i>
        <h2 class="font-medium">Privacy &amp; Data</h2>
      </div>
      ${settingRow('Download your data', 'Request a copy of your account data', 'Request')}
      ${settingRow('Delete account', 'Permanently remove your account', '<span class="text-red-500">Delete</span>')}
    </div>
    <button onclick="logout()" class="w-full py-3.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition">Sign Out</button>
  </div>`;
}

function settingRow(label, value, action) {
  return `<div class="px-6 py-4 flex items-center justify-between border-b border-beige/10 last:border-b-0">
    <div>
      <p class="text-sm font-medium">${label}</p>
      <p class="text-xs text-mblack/40 mt-0.5">${value}</p>
    </div>
    <button class="text-xs px-3 py-1.5 border border-beige rounded-lg hover:border-gold transition">${action}</button>
  </div>`;
}

function toggleRow(label, checked) {
  return `<div class="px-6 py-4 flex items-center justify-between border-b border-beige/10 last:border-b-0">
    <p class="text-sm font-medium">${label}</p>
    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" class="sr-only peer" ${checked?'checked':''}>
      <div class="w-10 h-5 bg-beige peer-checked:bg-gold rounded-full transition-colors duration-300 after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5 after:shadow"></div>
    </label>
  </div>`;
}

// ── SEARCH HANDLER ────────────────────────────────────────────

function handleSearch(val) {
  currentSearchQuery = val;
  currentCat = 'All';
  showPage('collections', val);
}

// ── COMPARE BAR ───────────────────────────────────────────────

function renderCompareBar() {
  const items = compareList.map(id => products.find(p=>p.id===id)).filter(Boolean);
  return `<div class="flex items-center gap-4 max-w-5xl mx-auto px-6 py-3 flex-wrap">
    <span class="text-sm font-medium text-white">Compare (${items.length}/3):</span>
    ${items.map(p=>`<div class="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
      <img src="${p.img}" class="w-8 h-8 rounded object-cover">
      <span class="text-white text-xs">${p.name}</span>
      <button onclick="toggleCompare(${p.id})" class="text-white/60 hover:text-white ml-1"><i data-lucide="x" class="w-3 h-3"></i></button>
    </div>`).join('')}
    <button onclick="showPage('compare')" class="ml-auto px-4 py-1.5 bg-gold text-white rounded-full text-xs font-medium hover:bg-white hover:text-mblack transition">Compare Now</button>
    <button onclick="compareList=[];updateCounts()" class="text-white/50 hover:text-white text-xs transition">Clear</button>
  </div>`;
}

// ── COMPARE PAGE ──────────────────────────────────────────────

function renderComparePage() {
  const items = compareList.map(id => products.find(p=>p.id===id)).filter(Boolean);
  if (items.length < 2) return `<div class="flex flex-col items-center justify-center py-24 slide-up">
    <i data-lucide="git-compare" class="w-12 h-12 text-beige mb-4"></i>
    <p class="text-mblack/50 mb-2">Add at least 2 products to compare</p>
    <p class="text-xs text-mblack/30 mb-6">Use the compare button on any product card</p>
    <button onclick="showPage('collections')" class="px-6 py-2.5 bg-mblack text-white rounded-full text-sm hover:bg-gold transition">Browse Products</button>
  </div>`;

  const fields = [
    { label:'Price',       val: p=>`<span class="text-gold font-medium">$${p.price}</span>` },
    { label:'Category',    val: p=>p.cat },
    { label:'Rating',      val: p=>`${renderStars(p.rating)} <span class="text-xs text-mblack/40">${p.rating} (${p.reviews})</span>` },
    { label:'Stock',       val: p=>stockBadge(p.stock) },
    { label:'Description', val: p=>`<span class="text-xs text-mblack/60 leading-relaxed">${p.description.slice(0,100)}…</span>` },
  ];

  return `<div class="max-w-5xl mx-auto px-6 py-12 slide-up">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-heading text-4xl">Compare Products</h1>
        <p class="text-mblack/40 text-sm mt-1">Side-by-side comparison of ${items.length} products</p>
      </div>
      <button onclick="showPage('collections')" class="text-sm text-gold hover:underline">← Back to collections</button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr>
            <td class="w-36 p-3"></td>
            ${items.map(p=>`<td class="p-3 text-center">
              <div class="relative">
                <button onclick="toggleCompare(${p.id})" class="absolute -top-1 -right-1 w-6 h-6 bg-beige rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition z-10"><i data-lucide="x" class="w-3 h-3"></i></button>
                <img src="${p.img}" class="w-24 h-24 object-cover rounded-xl mx-auto mb-2">
                <p class="font-medium text-sm">${p.name}</p>
                <button onclick="addToCart(${p.id})" class="mt-2 px-4 py-1.5 bg-mblack text-white rounded-full text-xs hover:bg-gold transition">Add to Cart</button>
              </div>
            </td>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${fields.map((f,i)=>`
          <tr class="${i%2===0?'bg-lgrey':'bg-white'} rounded-xl">
            <td class="p-4 text-sm font-medium text-mblack/60 rounded-l-xl">${f.label}</td>
            ${items.map(p=>`<td class="p-4 text-center text-sm">${f.val(p)}</td>`).join('')}
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    ${compareList.length < 3 ? `<div class="mt-8 text-center">
      <p class="text-sm text-mblack/40 mb-3">Add one more product to compare</p>
      <button onclick="showPage('collections')" class="px-6 py-2.5 border border-beige rounded-full text-sm hover:border-gold transition">+ Add another product</button>
    </div>` : ''}
  </div>`;
}

// ── PRODUCT CARD WITH COMPARE ─────────────────────────────────

function productCardWithCompare(p) {
  const inCart  = cart.find(c=>c.id===p.id);
  const inWish  = wishlist.find(w=>w.id===p.id);
  const inCmp   = compareList.includes(p.id);
  return `<div class="card-hover bg-white rounded-xl overflow-hidden border border-beige/20 cursor-pointer relative group" onclick="showProductDetail(${p.id})">
    ${p.stock <= 10 && p.stock > 0 ? `<div class="absolute top-2 left-2 z-10 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">Low Stock</div>` : ''}
    ${p.stock === 0 ? `<div class="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">Sold Out</div>` : ''}
    <button onclick="event.stopPropagation();toggleCompare(${p.id})" title="Compare" class="absolute top-2 right-2 z-10 w-7 h-7 rounded-full ${inCmp?'bg-gold text-white':'bg-white/80 text-mblack/50 opacity-0 group-hover:opacity-100'} flex items-center justify-center shadow transition">
      <i data-lucide="git-compare" class="w-3.5 h-3.5"></i>
    </button>
    <div class="aspect-square bg-lgrey overflow-hidden">
      <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onerror="this.style.background='#E8DCCF';">
    </div>
    <div class="p-4">
      <p class="text-xs text-mblack/50 uppercase tracking-wider">${p.cat}</p>
      <p class="font-medium text-sm mt-1 leading-tight">${p.name}</p>
      <div class="flex items-center gap-1 mt-1 text-xs">${renderStars(p.rating)}<span class="text-mblack/40 ml-1">(${p.reviews})</span></div>
      <div class="flex items-center justify-between mt-3">
        <span class="text-gold font-medium">$${p.price}</span>
        <div class="flex gap-2">
          <button onclick="event.stopPropagation();addToWish(${p.id})" class="w-7 h-7 rounded-full bg-lgrey flex items-center justify-center hover:bg-beige transition ${inWish?'text-red-400':''}">
            <i data-lucide="heart" class="w-3.5 h-3.5"></i>
          </button>
          <button onclick="event.stopPropagation();addToCart(${p.id})" class="w-7 h-7 rounded-full ${inCart?'bg-gold':'bg-mblack'} text-white flex items-center justify-center hover:bg-gold transition" ${p.stock===0?'disabled':''}>
            <i data-lucide="${inCart?'check':'plus'}" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

// ── BROWSE HISTORY PAGE ───────────────────────────────────────

function renderHistoryPage() {
  const viewed = browseHistory.map(id=>products.find(p=>p.id===id)).filter(Boolean);
  if (!viewed.length) return `<div class="flex flex-col items-center justify-center py-24 slide-up">
    <i data-lucide="clock" class="w-12 h-12 text-beige mb-4"></i>
    <p class="text-mblack/50 mb-4">No browsing history yet</p>
    <button onclick="showPage('collections')" class="px-6 py-2.5 bg-mblack text-white rounded-full text-sm hover:bg-gold transition">Start Browsing</button>
  </div>`;
  return `<div class="max-w-7xl mx-auto px-6 py-12 slide-up">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-heading text-4xl">Recently Viewed</h1>
        <p class="text-mblack/40 text-sm mt-1">${viewed.length} product${viewed.length!==1?'s':''} viewed</p>
      </div>
      <button onclick="browseHistory=[];showPage('history')" class="text-sm text-red-400 hover:text-red-600 transition">Clear History</button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      ${viewed.map((p,i)=>`
        <div class="card-hover bg-white rounded-xl overflow-hidden border border-beige/20 cursor-pointer relative" onclick="showProductDetail(${p.id})">
          <div class="absolute top-2 left-2 z-10 bg-mblack/70 text-white text-[10px] px-2 py-0.5 rounded-full">#${i+1}</div>
          <div class="aspect-square bg-lgrey overflow-hidden">
            <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-3">
            <p class="font-medium text-xs leading-tight">${p.name}</p>
            <p class="text-gold text-sm font-medium mt-1">$${p.price}</p>
            <button onclick="event.stopPropagation();addToCart(${p.id})" class="mt-2 w-full py-1.5 bg-mblack text-white rounded-lg text-xs hover:bg-gold transition">Add to Cart</button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

// ── ADMIN PANEL ───────────────────────────────────────────────

function renderAdminPanel() {
  const lowStock  = products.filter(p=>p.stock<=10);
  const catCounts = {};
  products.forEach(p=>{ catCounts[p.cat]=(catCounts[p.cat]||0)+1; });
  const avgRating = (products.reduce((s,p)=>s+p.rating,0)/products.length).toFixed(1);

  return `<div class="max-w-6xl mx-auto px-6 py-12 slide-up">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-heading text-4xl">Admin Panel</h1>
        <p class="text-mblack/40 text-sm mt-1">Catalogue overview &amp; management</p>
      </div>
      <span class="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full font-medium">Admin View</span>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      ${[
        {label:'Total Products',  val: products.length,        icon:'package',        color:'text-blue-500'},
        {label:'Avg Rating',      val: avgRating+'★',          icon:'star',           color:'text-gold'},
        {label:'Low Stock Items', val: lowStock.length,        icon:'alert-triangle', color:'text-orange-500'},
        {label:'Cart Value',      val: '$'+cart.reduce((s,p)=>s+p.price,0), icon:'shopping-bag', color:'text-green-600'},
      ].map(k=>`
        <div class="bg-white rounded-xl border border-beige/20 p-5">
          <div class="flex items-center justify-between mb-3">
            <p class="text-xs text-mblack/50">${k.label}</p>
            <i data-lucide="${k.icon}" class="w-4 h-4 ${k.color}"></i>
          </div>
          <p class="font-heading text-2xl font-medium">${k.val}</p>
        </div>
      `).join('')}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-2xl border border-beige/20 p-6">
        <h2 class="font-medium mb-4 flex items-center gap-2"><i data-lucide="bar-chart-2" class="w-4 h-4 text-gold"></i> Products by Category</h2>
        <div class="space-y-3">
          ${Object.entries(catCounts).map(([cat,count])=>{
            const pct = Math.round((count/products.length)*100);
            return `<div>
              <div class="flex justify-between text-sm mb-1"><span>${cat}</span><span class="text-mblack/50">${count} products (${pct}%)</span></div>
              <div class="h-2 bg-lgrey rounded-full overflow-hidden">
                <div class="h-full bg-gold rounded-full transition-all duration-700" style="width:${pct}%"></div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-beige/20 p-6">
        <h2 class="font-medium mb-4 flex items-center gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-orange-500"></i> Low Stock Alerts</h2>
        ${lowStock.length===0
          ? `<p class="text-sm text-green-600">All products are well stocked ✓</p>`
          : `<div class="space-y-3 max-h-56 overflow-y-auto">
              ${lowStock.map(p=>`
                <div class="flex items-center gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100 cursor-pointer" onclick="showProductDetail(${p.id})">
                  <img src="${p.img}" class="w-10 h-10 rounded-lg object-cover flex-shrink-0">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium truncate">${p.name}</p>
                    <p class="text-xs text-orange-500">${p.stock===0?'Out of Stock':'Only '+p.stock+' left'}</p>
                  </div>
                  <span class="text-gold text-sm font-medium flex-shrink-0">$${p.price}</span>
                </div>
              `).join('')}
            </div>`
        }
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-beige/20 overflow-hidden">
      <div class="px-6 py-4 border-b border-beige/20 flex items-center justify-between">
        <h2 class="font-medium flex items-center gap-2"><i data-lucide="list" class="w-4 h-4 text-gold"></i> All Products (${products.length})</h2>
        <span class="text-xs text-mblack/40">Click a row to view product</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-lgrey">
            <tr>
              <th class="px-4 py-3 text-left text-xs uppercase tracking-wider text-mblack/50 font-medium">Product</th>
              <th class="px-4 py-3 text-left text-xs uppercase tracking-wider text-mblack/50 font-medium">Category</th>
              <th class="px-4 py-3 text-left text-xs uppercase tracking-wider text-mblack/50 font-medium">Price</th>
              <th class="px-4 py-3 text-left text-xs uppercase tracking-wider text-mblack/50 font-medium">Rating</th>
              <th class="px-4 py-3 text-left text-xs uppercase tracking-wider text-mblack/50 font-medium">Stock</th>
              <th class="px-4 py-3 text-left text-xs uppercase tracking-wider text-mblack/50 font-medium">Reviews</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-beige/20">
            ${products.map(p=>`
              <tr class="hover:bg-lgrey/50 cursor-pointer transition" onclick="showProductDetail(${p.id})">
                <td class="px-4 py-3 flex items-center gap-3">
                  <img src="${p.img}" class="w-9 h-9 rounded-lg object-cover flex-shrink-0">
                  <span class="font-medium truncate max-w-[160px]">${p.name}</span>
                </td>
                <td class="px-4 py-3 text-mblack/60">${p.cat}</td>
                <td class="px-4 py-3 text-gold font-medium">$${p.price}</td>
                <td class="px-4 py-3">${p.rating} ★</td>
                <td class="px-4 py-3">${p.stock === 0 ? '<span class="text-red-500">Out</span>' : p.stock <= 10 ? `<span class="text-orange-500">${p.stock}</span>` : `<span class="text-green-600">${p.stock}</span>`}</td>
                <td class="px-4 py-3 text-mblack/60">${p.reviews}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}