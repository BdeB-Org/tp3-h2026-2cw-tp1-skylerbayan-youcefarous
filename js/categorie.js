const categorieBody = document.getElementById('categorie-body');
const produitBody = document.getElementById('produit-body');
const produitTitle = document.getElementById('produit-title');
const reloadCategorieBtn = document.getElementById('reload-categorie');
const filtreCategorieId = document.getElementById('filtre-categorie-id');
let toutesLesCategories = [];

function afficherCategories(categories) {
  if (!categories.length) {
    categorieBody.innerHTML = '<tr><td colspan="5">Aucune catégorie trouvée.</td></tr>';
    return;
  }
  categorieBody.innerHTML = categories.map(c => `
    <tr>
      <td>${escapeHtml(String(c.id_categorie))}</td>
      <td>${escapeHtml(c.nom_categorie)}</td>
      <td>${escapeHtml(String(c.nb_produits))}</td>
      <td>${formatDate(c.date_creation)}</td>
      <td><button onclick="voirProduits(${c.id_categorie})">Voir les produits</button></td>
    </tr>
  `).join('');
}

async function chargerCategories() {
  categorieBody.innerHTML = '<tr><td colspan="5">Chargement...</td></tr>';
  try {
    toutesLesCategories = await getAll('categorie');
    appliquerFiltre();
  } catch (error) {
    categorieBody.innerHTML = `<tr><td colspan="5">${escapeHtml(error.message)}</td></tr>`;
  }
}

function appliquerFiltre() {
  const id = filtreCategorieId.value.trim();
  if (!id) {
    afficherCategories(toutesLesCategories);
    return;
  }
  const filtres = toutesLesCategories.filter(c => String(c.id_categorie) === id);
  afficherCategories(filtres);
}

async function voirProduits(idCategorie) {
  produitTitle.textContent = `Produits de la catégorie ${idCategorie}`;
  produitBody.innerHTML = '<tr><td colspan="5">Chargement...</td></tr>';
  try {
    const tous = await getAll('produit');
    const produits = tous.filter(p => Number(p.id_categorie) === Number(idCategorie));
    if (!produits.length) {
      produitBody.innerHTML = '<tr><td colspan="5">Aucun produit trouvé pour cette catégorie.</td></tr>';
      return;
    }
    produitBody.innerHTML = produits.map(p => `
      <tr>
        <td>${escapeHtml(String(p.id_produit))}</td>
        <td>${escapeHtml(p.nom_produit)}</td>
        <td>${formatMoney(p.prix)}</td>
        <td>${escapeHtml(String(p.rabais))}%</td>
        <td>${escapeHtml(String(p.quantite))}</td>
      </tr>
    `).join('');
  } catch (error) {
    produitBody.innerHTML = `<tr><td colspan="5">${escapeHtml(error.message)}</td></tr>`;
  }
}

reloadCategorieBtn.addEventListener('click', chargerCategories);
filtreCategorieId.addEventListener('input', appliquerFiltre);
chargerCategories();