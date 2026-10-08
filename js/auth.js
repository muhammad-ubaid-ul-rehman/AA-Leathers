/* ============================================================
   AA LEATHERS — CUSTOMER AUTH (login.html)
   FR-09 Customer Account, FR-10 Guest Checkout
   ============================================================ */

function switchAuthTab(which) {
  document.getElementById('tabLogin').classList.toggle('active', which === 'login');
  document.getElementById('tabSignup').classList.toggle('active', which === 'signup');
  document.getElementById('loginSection').classList.toggle('active', which === 'login');
  document.getElementById('signupSection').classList.toggle('active', which === 'signup');
}

function doLogin() {
  const id = document.getElementById('loginId').value.trim().toLowerCase();
  const pw = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('loginError');
  if (!id || !pw) { errEl.textContent = 'Please enter your email and password.'; return; }
  const user = AA.users().find(u => u.email.toLowerCase() === id && u.password === pw);
  if (!user) { errEl.textContent = 'Invalid credentials. Please try again.'; return; }
  AA.setSession(user);
  toast('Welcome back, ' + user.name.split(' ')[0], 'success');
  location.href = 'index.html';
}

function showForgotPasswordMessage() {
  const error = document.getElementById('loginError');
  if (error) error.textContent = 'Password reset is not available yet. Please contact AA Leathers support.';
}

function doSignup() {
  const name = document.getElementById('suName').value.trim();
  const email = document.getElementById('suEmail').value.trim().toLowerCase();
  const password = document.getElementById('suPassword').value;
  const confirmPassword = document.getElementById('suConfirmPassword').value;
  const errEl = document.getElementById('signupError');

  if (!name || !email || !password || !confirmPassword) { errEl.textContent = 'Full name, email and both password fields are required.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errEl.textContent = 'Please enter a valid email address.'; return; }
  if (password !== confirmPassword) { errEl.textContent = 'Passwords do not match.'; return; }
  const users = AA.users();
  if (users.some(u => (u.email || '').toLowerCase() === email)) { errEl.textContent = 'An account with this email already exists.'; return; }

  const user = { userID: AA.uid('USR'), name, phone: '', email, address: '', password, joined: AA.todayISO() };
  users.push(user);
  AA.saveUsers(users);
  AA.setSession(user);
  toast('Account created — welcome, ' + name.split(' ')[0], 'success');
  location.href = 'index.html';
}

if (location.hash === '#register') switchAuthTab('signup');
