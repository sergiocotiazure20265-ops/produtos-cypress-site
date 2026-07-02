let selectedProductId = null;

document.addEventListener('DOMContentLoaded', () => {
  requireAuthentication();

  document.getElementById('btnSair').addEventListener('click', logout);
  document.getElementById('campoBuscaProduto').addEventListener('input', renderProducts);
  document.getElementById('btnLimparBusca').addEventListener('click', () => {
    document.getElementById('campoBuscaProduto').value = '';
    renderProducts();
  });

  document.getElementById('btnCancelarExclusao').addEventListener('click', closeDeleteModal);
  document.getElementById('btnConfirmarExclusao').addEventListener('click', deleteSelectedProduct);

  renderProducts();
});

function renderProducts() {
  const products = getProducts();
  const searchTerm = document.getElementById('campoBuscaProduto').value.trim().toLowerCase();
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm)
      || product.category.toLowerCase().includes(searchTerm)
      || product.code.toLowerCase().includes(searchTerm);
  });

  updateMetrics(products);

  const tbody = document.getElementById('corpoTabelaProdutos');
  const emptyMessage = document.getElementById('mensagemSemProdutos');
  tbody.innerHTML = '';

  if (filteredProducts.length === 0) {
    emptyMessage.classList.remove('hidden');
    return;
  }

  emptyMessage.classList.add('hidden');

  filteredProducts.forEach((product, index) => {
    const tr = document.createElement('tr');
    tr.id = `linhaProduto-${index + 1}`;
    tr.innerHTML = `
      <td id="produtoCodigo-${index + 1}">${product.code}</td>
      <td id="produtoNome-${index + 1}">${product.name}</td>
      <td id="produtoCategoria-${index + 1}">${product.category}</td>
      <td id="produtoPreco-${index + 1}">${formatCurrency(product.price)}</td>
      <td id="produtoEstoque-${index + 1}">${product.stock}</td>
      <td id="produtoStatus-${index + 1}"><span class="status ${product.status.toLowerCase()}">${product.status}</span></td>
      <td>
        <div class="actions">
          <a id="btnEditarProduto-${index + 1}" class="btn btn-secondary" href="produto-form.html?id=${product.id}">Editar</a>
          <button id="btnExcluirProduto-${index + 1}" class="btn btn-danger" type="button" data-id="${product.id}">Excluir</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('[id^="btnExcluirProduto-"]').forEach(button => {
    button.addEventListener('click', () => openDeleteModal(button.dataset.id));
  });
}

function updateMetrics(products) {
  const totalProducts = products.length;
  const stockValue = products.reduce((total, product) => total + Number(product.price) * Number(product.stock), 0);
  const lowStock = products.filter(product => Number(product.stock) <= 5).length;

  document.getElementById('cardTotalProdutos').textContent = totalProducts;
  document.getElementById('cardValorEstoque').textContent = formatCurrency(stockValue);
  document.getElementById('cardEstoqueBaixo').textContent = lowStock;
}

function openDeleteModal(productId) {
  selectedProductId = productId;
  document.getElementById('modalConfirmacao').classList.remove('hidden');
}

function closeDeleteModal() {
  selectedProductId = null;
  document.getElementById('modalConfirmacao').classList.add('hidden');
}

function deleteSelectedProduct() {
  if (!selectedProductId) return;
  const products = getProducts().filter(product => product.id !== selectedProductId);
  saveProducts(products);
  closeDeleteModal();
  showAlert('alertaProdutos', 'Produto excluído com sucesso.', 'success');
  renderProducts();
}
