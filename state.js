// ============================================================
// state.js — Shared mutable state
// Project: E-Commerce Product Catalogue (#298)
// ============================================================

let cart             = [];
let wishlist         = [];
let compareList      = [];     // Module 6: Compare tool (max 3)
let browseHistory    = [];     // Module 9: Browse history

let currentPage      = 'home';
let currentCat       = 'All';
let currentSort      = 'Default';

// Module 3: Rich filter panel state
let currentMinPrice  = '';
let currentMaxPrice  = '';
let currentBrands    = [];     // selected brand names
let currentColours   = [];     // selected colour names
let currentSizes     = [];     // selected size values
let currentMinRating = 0;      // 0 = no filter

let currentSearchQuery = '';
