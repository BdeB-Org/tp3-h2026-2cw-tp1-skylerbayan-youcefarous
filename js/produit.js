const produitsBody = document.getElementById('produits-body');
const searchProduits = document.getElementById('search-produits');
const reloadProduitsBtn = document.getElementById('reload-produits');
let tousLesProduits = [];

function afficherProduits(produits) {
  if (!produits.length) {
    produitsBody.innerHTML = '<tr><td colspan="6">Aucun produit trouvé.</td></tr>';
    return;
  }

  produitsBody.innerHTML = produits.map(p => `
    <tr>
      <td>${escapeHtml(p.id_produit)}</td>
      <td>${escapeHtml(p.nom)}</td>
      <td>${formatMoney(p.prix)}</td>
      <td>${formatMoney(p.cout)}</td>
      <td>${escapeHtml(p.stock)}</td>
      <td>${escapeHtml(p.categorie)}</td>
    </tr>
  `).join('');
}

async function chargerProduits() {
  produitsBody.innerHTML = '<tr><td colspan="6">Chargement...</td></tr>';
  try {
    tousLesProduits = await getAll('produit');
    afficherProduits(tousLesProduits);
  } catch (error) {
    produitsBody.innerHTML = `<tr><td colspan="6">${escapeHtml(error.message)}</td></tr>`;
  }
}

searchProduits.addEventListener('input', () => {
  const terme = searchProduits.value.trim().toLowerCase();
  const filtres = tousLesProduits.filter(p =>
    String(p.nom || '').toLowerCase().includes(terme)
  );
  afficherProduits(filtres);
});

reloadProduitsBtn.addEventListener('click', chargerProduits);
chargerProduits();
