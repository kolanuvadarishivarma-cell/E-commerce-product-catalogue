// ============================================================
// data.js — All static product and order data for the store
// Project: E-Commerce Product Catalogue (#298)
// ============================================================

const products = [
  // ── CLOTHING ──────────────────────────────────────────────
  {
    id:1, name:'Wool Overcoat', price:289, cat:'Clothing',
    img:'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600',
    rating:4.7, reviews:128, stock:14,
    brand:'Armani', colours:['Charcoal', 'Navy', 'Black'], sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description:'A timeless wool overcoat crafted from premium Italian merino wool. Features a slim silhouette, satin lining, and reinforced shoulder seams. Perfect for layering in colder months. Available in sizes XS–XXL.'
  },
  {
    id:5, name:'Cashmere Sweater', price:220, cat:'Clothing',
    img:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
    rating:4.6, reviews:155, stock:22,
    brand:'Loro Piana', colours:['Ivory', 'Grey', 'Camel'], sizes:['XS', 'S', 'M', 'L', 'XL'],
    description:'Pure Grade-A Mongolian cashmere in a relaxed crewneck fit. Exceptionally soft, lightweight, and warm. Ribbed cuffs and hem for a refined finish. Hand wash recommended. Available in 8 neutral tones.'
  },
  {
    id:9, name:'Silk Dress Shirt', price:175, cat:'Clothing',
    img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600',
    rating:4.5, reviews:67, stock:30,
    brand:'Giorgio', colours:['White', 'Ivory', 'Sky Blue'], sizes:['S', 'M', 'L', 'XL'],
    description:'Woven from 100% mulberry silk with a mother-of-pearl button placket and French cuffs. A fluid drape and subtle sheen make this shirt equally at home at a dinner party or a business meeting.'
  },
  {
    id:13, name:'Trench Coat', price:395, cat:'Clothing',
    img:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    rating:4.8, reviews:93, stock:8,
    brand:'Burberry', colours:['Khaki', 'Black', 'Sand'], sizes:['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description:'Classic double-breasted trench coat in a water-resistant cotton gabardine. Storm flap, gun flap, epaulettes, and a belted waist for authentic heritage styling. Fully lined in a signature plaid print.'
  },
  {
    id:17, name:'Denim Jacket', price:165, cat:'Clothing',
    img:'https://images.unsplash.com/photo-1601933470096-0e34634ffcde?w=600',
    rating:4.4, reviews:136, stock:19,
    brand:"Levi's", colours:['Indigo', 'Light Blue', 'Black'], sizes:['XS', 'S', 'M', 'L', 'XL'],
    description:'Rigid selvedge denim jacket with a faded indigo wash and contrast stitching. Two chest pockets, two side pockets, and adjustable side tabs for a custom fit. Washed and sanforized for minimal shrinkage.'
  },
  {
    id:19, name:'Linen Blazer', price:245, cat:'Clothing',
    img:'https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=600',
    rating:4.5, reviews:81, stock:17,
    brand:'Massimo', colours:['Beige', 'Navy', 'White'], sizes:['S', 'M', 'L', 'XL'],
    description:'Lightweight linen blazer with a half-canvas construction and horn buttons. The breathable fabric makes it ideal for warm-weather occasions. Pair with chinos or tailored shorts for a relaxed smart look.'
  },
  {
    id:20, name:'Merino Turtleneck', price:145, cat:'Clothing',
    img:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600',
    rating:4.6, reviews:109, stock:25,
    brand:'Icebreaker', colours:['Black', 'Grey', 'Forest'], sizes:['XS', 'S', 'M', 'L', 'XL'],
    description:'Fine 18.5-micron merino wool in a slim-fit turtleneck. Machine washable, odour-resistant, and temperature-regulating. The perfect base layer that doubles as a standalone piece.'
  },
  {
    id:21, name:'Cotton Chinos', price:110, cat:'Clothing',
    img:'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600',
    rating:4.3, reviews:192, stock:40,
    brand:'Uniqlo', colours:['Stone', 'Navy', 'Khaki'], sizes:['28', '30', '32', '34', '36'],
    description:'Straight-leg chinos in a peached cotton twill. Four-pocket construction, YKK zip, and a mid-rise waistband with internal elastic. Available in stone, navy, and khaki. Machine washable.'
  },

  // ── SHOES ─────────────────────────────────────────────────
  {
    id:2, name:'Leather Loafers', price:195, cat:'Shoes',
    img:'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600',
    rating:4.5, reviews:94, stock:11,
    brand:"Tod's", colours:['Tan', 'Black', 'Brown'], sizes:['39', '40', '41', '42', '43', '44'],
    description:'Handcrafted from full-grain calfskin leather with a cushioned insole and durable rubber sole. These penny loafers offer effortless elegance for both formal and smart-casual looks. Comes in a gift box.'
  },
  {
    id:6, name:'Canvas Sneakers', price:135, cat:'Shoes',
    img:'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
    rating:4.4, reviews:203, stock:33,
    brand:'Veja', colours:['White', 'Black', 'Cream'], sizes:['38', '39', '40', '41', '42', '43', '44'],
    description:'Low-profile canvas sneakers with a vulcanised rubber sole and cushioned footbed. Clean, minimalist design that pairs with everything. Vegan-friendly materials and ethically sourced cotton canvas.'
  },
  {
    id:10, name:'Running Shoes', price:160, cat:'Shoes',
    img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    rating:4.6, reviews:241, stock:28,
    brand:'Nike', colours:['Black', 'White', 'Blue'], sizes:['38', '39', '40', '41', '42', '43', '44'],
    description:'Engineered mesh upper for breathability, responsive foam midsole, and a high-traction outsole. Designed for neutral pronators running up to marathon distances. Reflective detailing for low-light safety.'
  },
  {
    id:14, name:'Oxford Shoes', price:245, cat:'Shoes',
    img:'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600',
    rating:4.7, reviews:58, stock:9,
    brand:'Crockett', colours:['Black', 'Tan'], sizes:['39', '40', '41', '42', '43', '44'],
    description:'Goodyear-welted brogues in smooth black calf leather. The welt construction allows resoling, making these a lifetime investment. Leather-lined interior and a studded rubber heel for grip and durability.'
  },
  {
    id:18, name:'Slip-On Mules', price:115, cat:'Shoes',
    img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
    rating:4.3, reviews:78, stock:16,
    brand:'Mango', colours:['Black', 'Nude', 'Tan'], sizes:['36', '37', '38', '39', '40', '41'],
    description:'Supple nappa leather mules with a block heel and cushioned footbed. Versatile enough for office or weekend wear. Slip-on silhouette for effortless on-and-off. Available in black, nude, and tan.'
  },
  {
    id:22, name:'Chelsea Boots', price:275, cat:'Shoes',
    img:'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600',
    rating:4.8, reviews:115, stock:12,
    brand:'Chelsea', colours:['Brown', 'Black', 'Tan'], sizes:['39', '40', '41', '42', '43', '44'],
    description:'Pull-on Chelsea boots in full-grain suede with elastic side gussets and a leather heel tab. Stacked leather heel and a crepe rubber outsole for all-day comfort. Resoleable Goodyear welt construction.'
  },
  {
    id:23, name:'Boat Shoes', price:150, cat:'Shoes',
    img:'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600',
    rating:4.2, reviews:87, stock:20,
    brand:'Sperry', colours:['Tan', 'Navy', 'Brown'], sizes:['39', '40', '41', '42', '43', '44'],
    description:'Classic two-eyelet boat shoes in oiled full-grain leather with 360° lacing and a non-marking siped rubber outsole. Rust-proof hardware and a breathable leather lining. Ideal for deck or dock.'
  },

  // ── ELECTRONICS ────────────────────────────────────────────
  {
    id:3, name:'Wireless Headphones', price:349, cat:'Electronics',
    img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    rating:4.8, reviews:312, stock:45,
    brand:'Sony', colours:['Black', 'White', 'Silver'], sizes:['One Size'],
    description:'Studio-quality sound with 40mm dynamic drivers and active noise cancellation. Up to 30 hours of battery life, foldable design, and a premium carrying case included. Bluetooth 5.2 with multipoint connection.'
  },
  {
    id:7, name:'Smart Speaker', price:199, cat:'Electronics',
    img:'https://images.unsplash.com/photo-1543512214-318c7553f230?w=600',
    rating:4.3, reviews:189, stock:37,
    brand:'Bose', colours:['Black', 'Grey'], sizes:['One Size'],
    description:'360° room-filling sound with dual tweeters and a down-firing woofer. Built-in voice assistant, multi-room audio support, and a premium fabric finish that blends into any interior. Wi-Fi and Bluetooth enabled.'
  },
  {
    id:11, name:'Mechanical Keyboard', price:229, cat:'Electronics',
    img:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
    rating:4.8, reviews:174, stock:22,
    brand:'Keychron', colours:['Silver', 'Space Grey'], sizes:['One Size'],
    description:'Tenkeyless layout with Cherry MX Brown switches for a tactile yet quiet typing experience. Aircraft-grade aluminium chassis, per-key RGB backlighting, and a detachable USB-C cable. PBT double-shot keycaps.'
  },
  {
    id:15, name:'Portable Charger', price:89, cat:'Electronics',
    img:'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600',
    rating:4.5, reviews:302, stock:60,
    brand:'Anker', colours:['Black', 'White'], sizes:['One Size'],
    description:'20,000mAh capacity with 65W USB-C Power Delivery and dual USB-A ports. Charges a laptop, phone, and earbuds simultaneously. Compact matte-aluminium shell with a built-in LED battery indicator.'
  },
  {
    id:24, name:'Smartwatch', price:299, cat:'Electronics',
    img:'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600',
    rating:4.6, reviews:228, stock:18,
    brand:'Apple', colours:['Black', 'Silver', 'Gold'], sizes:['One Size'],
    description:'Always-on AMOLED display with health monitoring (ECG, SpO2, sleep), GPS, and 5-day battery life. Water-resistant to 50m. Compatible with iOS and Android. Comes with a stainless steel and sport band.'
  },
  {
    id:25, name:'Wireless Earbuds', price:179, cat:'Electronics',
    img:'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
    rating:4.7, reviews:411, stock:52,
    brand:'Samsung', colours:['White', 'Black', 'Beige'], sizes:['One Size'],
    description:'True wireless earbuds with hybrid ANC, 8-hour playtime (32 total with case), and IPX5 water resistance. Transparency mode, multipoint pairing, and a custom EQ via the companion app. Fast charging: 10 min = 1 hr.'
  },
  {
    id:26, name:'Laptop Stand', price:79, cat:'Electronics',
    img:'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600',
    rating:4.4, reviews:156, stock:44,
    brand:'Twelve South', colours:['Silver', 'Space Grey'], sizes:['One Size'],
    description:'Adjustable aluminium laptop stand with six height positions from 15° to 60°. Anti-slip pads protect your desk and laptop. Folds flat for travel. Compatible with laptops up to 17 inches.'
  },

  // ── ACCESSORIES ────────────────────────────────────────────
  {
    id:4, name:'Gold Watch', price:450, cat:'Accessories',
    img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    rating:4.9, reviews:76, stock:5,
    brand:'Tissot', colours:['Gold', 'Silver', 'Rose Gold'], sizes:['One Size'],
    description:'Swiss-movement timepiece with a 40mm stainless steel case and 18K gold-plated finish. Sapphire crystal glass, 50m water resistance, and a genuine leather strap. A statement of understated luxury.'
  },
  {
    id:8, name:'Leather Bag', price:320, cat:'Accessories',
    img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
    rating:4.7, reviews:88, stock:13,
    brand:'Mulberry', colours:['Tan', 'Black', 'Brown'], sizes:['One Size'],
    description:'Full-grain vegetable-tanned leather tote with a cotton canvas lining and solid brass hardware. Features an interior zip pocket and two slip pockets. Ages beautifully with use. Dimensions: 38×28×12cm.'
  },
  {
    id:12, name:'Sunglasses', price:145, cat:'Accessories',
    img:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
    rating:4.4, reviews:119, stock:21,
    brand:'Ray-Ban', colours:['Black', 'Tortoise', 'Clear'], sizes:['One Size'],
    description:'Handmade acetate frames with polarised CR-39 lenses offering UV400 protection. A classic oversized silhouette that flatters all face shapes. Comes with a hard case and microfibre cleaning cloth.'
  },
  {
    id:16, name:'Silver Bracelet', price:120, cat:'Accessories',
    img:'https://images.unsplash.com/photo-1573408301185-9519f94815b8?w=600',
    rating:4.6, reviews:44, stock:29,
    brand:'Tiffany', colours:['Silver'], sizes:['One Size'],
    description:'Sterling silver link bracelet with a secure lobster-claw clasp. Hypoallergenic, tarnish-resistant, and suitable for everyday wear. Presented in a velvet-lined jewellery box. Width: 6mm, adjustable length.'
  },
  {
    id:27, name:'Leather Wallet', price:95, cat:'Accessories',
    img:'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600',
    rating:4.5, reviews:163, stock:38,
    brand:'Bellroy', colours:['Black', 'Brown', 'Tan'], sizes:['One Size'],
    description:'Slim bi-fold wallet in full-grain Horween leather. Six card slots, two bill compartments, and an ID window. RFID-blocking lining included. Gets better with every year of use.'
  },
  {
    id:28, name:'Wool Scarf', price:85, cat:'Accessories',
    img:'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600',
    rating:4.3, reviews:72, stock:34,
    brand:'Acne', colours:['Grey', 'Camel', 'Black'], sizes:['One Size'],
    description:'Extra-long scarf woven from a merino-cashmere blend. Fringe ends, 200×30cm dimensions, and a beautifully soft hand-feel. Available in six classic colourways. Dry clean or gentle hand wash.'
  },
  {
    id:29, name:'Canvas Backpack', price:135, cat:'Accessories',
    img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    rating:4.6, reviews:204, stock:27,
    brand:'Herschel', colours:['Olive', 'Black', 'Navy'], sizes:['One Size'],
    description:'Waxed canvas backpack with a padded 15" laptop sleeve, two external water-bottle pockets, and a quick-access top pocket. YKK zippers, solid brass hardware, and padded shoulder straps.'
  },
  {
    id:30, name:'Silk Tie', price:75, cat:'Accessories',
    img:'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=600',
    rating:4.4, reviews:55, stock:42,
    brand:'Eton', colours:['Navy', 'Burgundy', 'Silver'], sizes:['One Size'],
    description:'Hand-rolled seven-fold tie in 100% silk twill from Como, Italy. Standard 8cm blade width and a classic length of 148cm. Presented in a branded gift box. Dry clean only.'
  },
];

// ── ORDERS (per-user, stored in localStorage) ─────────────────

function getOrders(email) {
  const key = 'curateOrders_' + email;
  const saved = localStorage.getItem(key);
  if (saved) return JSON.parse(saved);
  if (email === 'hello@curate.com') {
    const demo = [
      { id:1001, productId:1,  date:'2024-12-15', status:'Delivered',  badge:'bg-green-100 text-green-700' },
      { id:1002, productId:4,  date:'2025-01-03', status:'In Transit', badge:'bg-gold/20 text-gold' },
      { id:1003, productId:7,  date:'2025-01-10', status:'Processing', badge:'bg-beige text-mblack/70' },
      { id:1004, productId:24, date:'2025-02-20', status:'Delivered',  badge:'bg-green-100 text-green-700' },
      { id:1005, productId:29, date:'2025-03-05', status:'In Transit', badge:'bg-gold/20 text-gold' },
    ];
    localStorage.setItem(key, JSON.stringify(demo));
    return demo;
  }
  return [];
}

function getUserOrders() {
  const email = localStorage.getItem('curateUserEmail') || '';
  return getOrders(email).map(o => ({
    ...o,
    product: products.find(p => p.id === o.productId)
  }));
}
