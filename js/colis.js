const colisBody = document.getElementById('colis-body');
const produitBody = document.getElementById('produit-body');
const produitTitle = document.getElementById('produit-title');
const reloadColisBtn = document.getElementById('reload-colis');
const filtreColisId = document.getElementById('filtre-colis-id');
let tousLesColis = [];

function afficherColis(colis) {
  if (!colis.length) {
    colisBody.innerHTML = '<tr><td colspan="6">Aucun colis trouvé.</td></tr>';
    return;
  }
  colisBody.innerHTML = colis.map(c => `
    <tr>
      <td>${escapeHtml(String(c.id_colis))}</td>
      <td>${formatDate(c.date_creation)}</td>
      <td>${escapeHtml(c.pays_depart)}</td>
      <td>${escapeHtml(c.pays_destination)}</td>
      <td>${formatDate(c.date_estimee_arrivee)}</td>
      <td><button onclick="voirProduits(${c.id_colis})">Voir les produits</button></td>
    </tr>
  `).join('');
}

async function chargerColis() {
  colisBody.innerHTML = '<tr><td colspan="6">Chargement...</td></tr>';
  try {
    tousLesColis = await getAll('colis');
    appliquerFiltre();
  } catch (error) {
    colisBody.innerHTML = `<tr><td colspan="6">${escapeHtml(error.message)}</td></tr>`;
  }
}

function appliquerFiltre() {
  const id = filtreColisId.value.trim();
  if (!id) {
    afficherColis(tousLesColis);
    return;
  }
  const filtres = tousLesColis.filter(c => String(c.id_colis) === id);
  afficherColis(filtres);
}

async function voirProduits(idColis) {
  produitTitle.textContent = `Produits du colis ${idColis}`;
  produitBody.innerHTML = '<tr><td colspan="6">Chargement...</td></tr>';
  try {
    const tous = await getAll('produit');
    const produits = tous.filter(p => Number(p.id_colis) === Number(idColis));
    if (!produits.length) {
      produitBody.innerHTML = '<tr><td colspan="6">Aucun produit trouvé pour ce colis.</td></tr>';
      return;
    }
    produitBody.innerHTML = produits.map(p => `
      <tr>
        <td>${escapeHtml(String(p.id_produit))}</td>
        <td>${escapeHtml(p.nom_produit)}</td>
        <td>${formatMoney(p.prix)}</td>
        <td>${escapeHtml(String(p.rabais))}%</td>
        <td>${escapeHtml(String(p.quantite))}</td>
        <td>${escapeHtml(String(p.id_categorie))}</td>
      </tr>
    `).join('');
  } catch (error) {
    produitBody.innerHTML = `<tr><td colspan="6">${escapeHtml(error.message)}</td></tr>`;
  }
}

reloadColisBtn.addEventListener('click', chargerColis);
filtreColisId.addEventListener('input', appliquerFiltre);
chargerColis();