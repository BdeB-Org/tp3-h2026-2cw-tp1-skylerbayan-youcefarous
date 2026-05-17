const produitsBody = document.getElementById('produits-body');
const searchProduits = document.getElementById('search-produits');
const reloadProduitsBtn = document.getElementById('reload-produits');
let tousLesProduits = [];

function afficherProduits(produits) {
  if (!produits.length) {
    produitsBody.innerHTML = '<tr><td colspan="7">Aucun produit trouvé.</td></tr>';
    return;
  }
  produitsBody.innerHTML = produits.map(p => `
    <tr>
      <td>${escapeHtml(p.id_produit)}</td>
      <td>${escapeHtml(p.nom_produit)}</td>
      <td>${formatMoney(p.prix)}</td>
      <td>${escapeHtml(p.rabais + "%")}</td>
      <td>${escapeHtml(p.quantite)}</td>
      <td>${escapeHtml(p.id_colis)}</td>
      <td>${escapeHtml(p.id_categorie)}</td>
    </tr>
  `).join('');
}
async function chargerProduits() {
  produitsBody.innerHTML = '<tr><td colspan="7">Chargement...</td></tr>';
  try {
    tousLesProduits = await getAll('produit');
    afficherProduits(tousLesProduits);
  } catch (error) {
    produitsBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
  }
}

searchProduits.addEventListener('input', () => {
  const terme = searchProduits.value.trim().toLowerCase();
  const filtres = tousLesProduits.filter(p =>
    String(p.nom_produit || '').toLowerCase().includes(terme)
  );
  afficherProduits(filtres);
});




reloadProduitsBtn.addEventListener('click', chargerProduits);
chargerProduits();