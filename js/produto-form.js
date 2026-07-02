document.addEventListener('DOMContentLoaded', () => {
  requireAuthentication();

  const logoutButton = document.getElementById('btnSairFormulario');
  const form = document.getElementById('formProduto');
  const productId = getQueryParam('id');

  logoutButton.addEventListener('click', logout);

  if (productId) {
    loadProduct(productId);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    saveProduct();
  });
});

function loadProduct(productId) {
  const product = getProducts().find(item => item.id === productId);

  if (!product) {
    showAlert('alertaFormularioProduto', 'Produto não encontrado.', 'error');
    return;
  }

  document.getElementById('tituloFormularioProduto').textContent = 'Editar produto';
  document.getElementById('produtoId').value = product.id;
  document.getElementById('codigoProduto').value = product.code;
  document.getElementById('nomeProduto').value = product.name;
  document.getElementById('categoriaProduto').value = product.category;
  document.getElementById('precoProduto').value = product.price;
  document.getElementById('estoqueProduto').value = product.stock;
  document.getElementById('statusProduto').value = product.status;
  document.getElementById('descricaoProduto').value = product.description || '';
}

function saveProduct() {
  hideAlert('alertaFormularioProduto');

  const id = document.getElementById('produtoId').value;
  const code = document.getElementById('codigoProduto').value.trim();
  const name = document.getElementById('nomeProduto').value.trim();
  const category = document.getElementById('categoriaProduto').value;
  const price = Number(document.getElementById('precoProduto').value);
  const stock = Number(document.getElementById('estoqueProduto').value);
  const status = document.getElementById('statusProduto').value;
  const description = document.getElementById('descricaoProduto').value.trim();

  const products = getProducts();
  const duplicatedCode = products.some(product => product.code.toLowerCase() === code.toLowerCase() && product.id !== id);

  if (duplicatedCode) {
    showAlert('alertaFormularioProduto', 'Já existe um produto com este código.', 'error');
    return;
  }

  if (id) {
    const index = products.findIndex(product => product.id === id);
    products[index] = { id, code, name, category, price, stock, status, description };
    saveProducts(products);
    showAlert('alertaFormularioProduto', 'Produto atualizado com sucesso.', 'success');
    return;
  }

  products.push({
    id: crypto.randomUUID(),
    code,
    name,
    category,
    price,
    stock,
    status,
    description
  });

  saveProducts(products);
  showAlert('alertaFormularioProduto', 'Produto cadastrado com sucesso.', 'success');
  document.getElementById('formProduto').reset();
}
