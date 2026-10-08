/* ============================================================
   AA LEATHERS — ADMIN AUTH
   Single temporary admin account; no admin registration flow.
   ============================================================ */

function doAdminLogin() {
  const errEl = document.getElementById('adminLoginError');
  const username = document.getElementById('adminUsername').value.trim();
  const password = document.getElementById('adminPassword').value;
  if (username !== 'admin' || password !== 'admin@123') {
    errEl.textContent = 'Invalid admin credentials.';
    return;
  }
  const admin = AA.admins()[0] || {
    adminID: 'ADM-ROOT', name: 'Administrator', email: 'admin', role: 'admin', joined: AA.todayISO()
  };
  AA.saveAdmins([admin]);
  AA.setAdminSession(admin);
  toast('Welcome', 'success');
  location.href = 'admin.html';
}

function requireAdmin() {
  const admin = AA.adminSession();
  if (!admin) { location.href = 'admin-login.html'; return null; }
  return admin;
}

function doAdminLogout() {
  AA.adminLogout();
  location.href = 'admin-login.html';
}
