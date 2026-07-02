const STORAGE_KEYS = {
  users: 'bluestock_users',
  session: 'bluestock_session',
  products: 'bluestock_products'
};

function initializeDatabase() {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    const users = [
      {
        id: crypto.randomUUID(),
        name: 'Administrador',
        email: 'admin@bluestock.com',
        password: 'Admin@123'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }

  if (!localStorage.getItem(STORAGE_KEYS.products)) {
    const products = [
      {
        id: crypto.randomUUID(),
        code: 'PRD-001',
        name: 'Notebook Pro 15',
        category: 'Informática',
        price: 5890.9,
        stock: 8,
        status: 'Ativo',
        description: 'Notebook profissional para desenvolvimento e produtividade.'
      },
      {
        id: crypto.randomUUID(),
        code: 'PRD-002',
        name: 'Mouse Wireless Blue',
        category: 'Acessórios',
        price: 129.9,
        stock: 22,
        status: 'Ativo',
        description: 'Mouse sem fio com design ergonômico.'
      },
      {
        id: crypto.randomUUID(),
        code: 'PRD-003',
        name: 'Monitor UltraWide 29',
        category: 'Eletrônicos',
        price: 1599.0,
        stock: 4,
        status: 'Ativo',
        description: 'Monitor ultrawide para maior produtividade.'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.products) || '[]');
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
}

function getSession() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || 'null');
}

function setSession(user) {
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({ id: user.id, name: user.name, email: user.email }));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
}

function requireAuthentication() {
  const session = getSession();
  if (!session) {
    window.location.href = 'index.html';
  }
}

function logout() {
  clearSession();
  window.location.href = 'index.html';
}

function showAlert(elementId, message, type = 'success') {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.textContent = message;
  element.className = `alert ${type}`;
  element.classList.remove('hidden');
}

function hideAlert(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.className = 'alert hidden';
  element.textContent = '';
}

function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

initializeDatabase();
