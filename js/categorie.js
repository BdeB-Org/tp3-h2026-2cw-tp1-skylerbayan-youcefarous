const paniersBody = document.getElementById('paniers-body');
const itemsBody = document.getElementById('items-body');
const itemsTitle = document.getElementById('items-title');
const reloadPaniersBtn = document.getElementById('reload-paniers');
const filtrePanierId = document.getElementById('filtre-panier-id');
let tousLesPaniers = [];

function afficherPaniers(paniers) {
  if (!paniers.length) {
    paniersBody.innerHTML = '<tr><td colspan="6">Aucun panier trouvé.</td></tr>';
    return;
  }

  paniersBody.innerHTML = paniers.map(p => `
    <tr>
      <td>${escapeHtml(p.id_panier)}</td>
      <td>${escapeHtml(p.id_client)}</td>
      <td>${escapeHtml(p.id_utilisateur)}</td>
      <td>${escapeHtml(p.date_creation)}</td>
      <td>${escapeHtml(p.note)}</td>
      <td><button onclick="voirItems(${p.id_panier})">Voir les items</button></td>
    </tr>
  `).join('');
}

async function chargerPaniers() {
  paniersBody.innerHTML = '<tr><td colspan="6">Chargement...</td></tr>';
  try {
    tousLesPaniers = await getAll('panier'); 
    appliquerFiltre();
  } catch (error) {
    paniersBody.innerHTML = `<tr><td colspan="6">${escapeHtml(error.message)}</td></tr>`;
  }
}

function appliquerFiltre() {
  const id = filtrePanierId.value.trim();
  if (!id) {
    afficherPaniers(tousLesPaniers);
    return;
  }

  const filtres = tousLesPaniers.filter(p => String(p.id_panier) === id);
  afficherPaniers(filtres);
}

async function voirItems(idPanier) {
  itemsTitle.textContent = `Items du panier ${idPanier}`;
  itemsBody.innerHTML = '<tr><td colspan="5">Chargement...</td></tr>';
  try {
    const items = await getItemsByPanier(idPanier);
    if (!items.length) {
      itemsBody.innerHTML = '<tr><td colspan="5">Aucun item trouvé pour ce panier.</td></tr>';
      return;
    }

    itemsBody.innerHTML = items.map(item => `
      <tr>
        <td>${escapeHtml(item.id_item)}</td>
        <td>${escapeHtml(item.id_produit)}</td>
        <td>${escapeHtml(item.qte_commande)}</td>
        <td>${formatMoney(item.prix)}</td>
        <td>${escapeHtml(item.escompte)}</td>
      </tr>
    `).join('');
  } catch (error) {
    itemsBody.innerHTML = `<tr><td colspan="5">${escapeHtml(error.message)}</td></tr>`;
  }
}

reloadPaniersBtn.addEventListener('click', chargerPaniers);
filtrePanierId.addEventListener('input', appliquerFiltre);
chargerPaniers();
