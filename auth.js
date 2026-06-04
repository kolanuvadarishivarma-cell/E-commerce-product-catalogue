// ============================================================
// auth.js — Handles login form submission, logout, and profile dropdown
// ============================================================

// ── ADMIN VISIBILITY ─────────────────────────────────────────
// Shows admin nav + dropdown only if logged-in email is admin@curate.com
function updateAdminVisibility() {
  const email = localStorage.getItem('curateUserEmail') || '';
  const isAdmin = email === 'admin@curate.com';
  const navLink  = document.getElementById('adminNavLink');
  const dropItem = document.getElementById('adminDropItem');
  if (navLink)  navLink.classList.toggle('hidden', !isAdmin);
  if (dropItem) dropItem.classList.toggle('hidden', !isAdmin);
}

// Login form submit handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  if (email && pass) {
    localStorage.setItem('curateAuth', 'true');
    localStorage.setItem('curateUserEmail', email);      // <-- store email per-session
    localStorage.setItem('curateUserName', email.split('@')[0]); // derive display name
    document.getElementById('loginPage').classList.add('fade-out');
    setTimeout(() => {
      document.getElementById('loginPage').classList.add('hidden');
      document.getElementById('mainApp').classList.remove('hidden');
      document.getElementById('mainApp').classList.add('fade-in');
      showPage('home');
      updateAdminVisibility();
      lucide.createIcons();
    }, 400);
  }
});

// Logout function
function logout() {
  localStorage.removeItem('curateAuth');
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('fade-in');
  document.getElementById('loginPage').classList.remove('hidden','fade-out');
  document.getElementById('loginPage').classList.add('fade-in');
}

// Toggle profile dropdown visibility
function toggleProfile() { document.getElementById('profileDrop').classList.toggle('hidden'); }

// Close profile dropdown when clicking outside
document.addEventListener('click', (e) => { if (!e.target.closest('.relative')) document.getElementById('profileDrop')?.classList.add('hidden'); });

// Check auth on page load — if already logged in, skip login screen
if (localStorage.getItem('curateAuth') === 'true') {
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
  setTimeout(() => { showPage('home'); updateAdminVisibility(); }, 50);
}

// ============================================================
// Forgot Password — show/hide panel, handle email submit
// ============================================================

function showForgotPassword() {
  // Inject the forgot password panel into the right side of the login page
  const rightPanel = document.querySelector('#loginPage .w-full.lg\\:w-1\\/2');
  if (!rightPanel) return;

  rightPanel.innerHTML = `
    <div class="glass rounded-2xl p-10 w-full max-w-md shadow-xl fade-in">
      <!-- Step 1: Enter email -->
      <div id="fpStep1">
        <button onclick="showLoginPanel()" class="flex items-center gap-1 text-xs text-mblack/50 hover:text-mblack mb-6 transition">
          ← Back to Sign In
        </button>
        <h2 class="font-heading text-3xl font-medium text-mblack mb-1">Forgot Password</h2>
        <p class="text-sm text-mblack/50 mb-8">Enter your email and we'll send you a reset link</p>
        <form id="forgotForm" class="space-y-5" onsubmit="handleForgotSubmit(event)">
          <div>
            <label class="text-xs uppercase tracking-wider text-mblack/60 mb-1 block">Email Address</label>
            <input type="email" id="fpEmail" required
              class="w-full px-4 py-3 rounded-lg bg-lgrey border border-beige/50 focus:outline-none focus:border-gold transition text-sm"
              placeholder="your@email.com">
          </div>
          <p id="fpError" class="hidden text-xs text-red-500 -mt-2">Please enter a valid email address.</p>
          <button type="submit"
            class="btn-primary w-full py-3.5 bg-mblack text-white rounded-lg text-sm font-medium tracking-wide hover:bg-gold">
            Send Reset Link
          </button>
        </form>
      </div>

      <!-- Step 2: Confirmation (shown after submit) -->
      <div id="fpStep2" class="hidden text-center">
        <div class="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <h2 class="font-heading text-3xl font-medium text-mblack mb-2">Check your inbox</h2>
        <p class="text-sm text-mblack/50 mb-1">We've sent a password reset link to</p>
        <p id="fpEmailDisplay" class="text-sm font-medium text-gold mb-8"></p>
        <p class="text-xs text-mblack/40 mb-6">Didn't receive it? Check your spam folder or try again.</p>
        <button onclick="resetForgotForm()"
          class="text-xs text-gold hover:underline block mx-auto mb-3">Try a different email</button>
        <button onclick="showLoginPanel()"
          class="btn-primary w-full py-3.5 bg-mblack text-white rounded-lg text-sm font-medium tracking-wide hover:bg-gold">
          Back to Sign In
        </button>
      </div>
    </div>
  `;
}

function handleForgotSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('fpEmail').value.trim();
  const err   = document.getElementById('fpError');
  if (!email || !email.includes('@')) {
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');
  // Show confirmation step
  document.getElementById('fpStep1').classList.add('hidden');
  document.getElementById('fpStep2').classList.remove('hidden');
  document.getElementById('fpEmailDisplay').textContent = email;
}

function resetForgotForm() {
  document.getElementById('fpStep1').classList.remove('hidden');
  document.getElementById('fpStep2').classList.add('hidden');
  document.getElementById('fpEmail').value = '';
}

function showLoginPanel() {
  // Restore the original login form HTML
  const rightPanel = document.querySelector('#loginPage .w-full.lg\\:w-1\\/2');
  if (!rightPanel) return;
  rightPanel.innerHTML = `
    <div class="glass rounded-2xl p-10 w-full max-w-md shadow-xl fade-in">
      <h2 class="font-heading text-3xl font-medium text-mblack mb-1">Sign In</h2>
      <p class="text-sm text-mblack/50 mb-8">Enter your credentials to continue</p>
      <form id="loginForm" class="space-y-5">
        <div>
          <label for="email" class="text-xs uppercase tracking-wider text-mblack/60 mb-1 block">Email</label>
          <input type="email" id="email" value="hello@curate.com"
            class="w-full px-4 py-3 rounded-lg bg-lgrey border border-beige/50 focus:outline-none focus:border-gold transition text-sm"
            placeholder="your@email.com">
        </div>
        <div>
          <label for="password" class="text-xs uppercase tracking-wider text-mblack/60 mb-1 block">Password</label>
          <input type="password" id="password" value="password"
            class="w-full px-4 py-3 rounded-lg bg-lgrey border border-beige/50 focus:outline-none focus:border-gold transition text-sm"
            placeholder="••••••••">
        </div>
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-beige accent-gold">
            <span class="text-xs text-mblack/60">Remember me</span>
          </label>
          <a href="#" onclick="showForgotPassword();return false;" class="text-xs text-gold hover:underline">Forgot password?</a>
        </div>
        <button type="submit" class="btn-primary w-full py-3.5 bg-mblack text-white rounded-lg text-sm font-medium tracking-wide hover:bg-gold">Sign In</button>
      </form>
    </div>
  `;
  // Re-attach the login submit listener
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass  = document.getElementById('password').value;
    if (email && pass) {
      localStorage.setItem('curateAuth', 'true');
      localStorage.setItem('curateUserEmail', email);
      localStorage.setItem('curateUserName', email.split('@')[0]);
      document.getElementById('loginPage').classList.add('fade-out');
      setTimeout(() => {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        document.getElementById('mainApp').classList.add('fade-in');
        showPage('home');
        lucide.createIcons();
      }, 400);
    }
  });
}