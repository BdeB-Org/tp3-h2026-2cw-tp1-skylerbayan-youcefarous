const clientsBody = document.getElementById('clients-body');
const clientForm = document.getElementById('client-form');
const reloadClientsBtn = document.getElementById('reload-clients');

async function chargerClients() {
  clientsBody.innerHTML = '<tr><td colspan="6">Chargement...</td></tr>';
  try {
    const clients = await getAll('client');
    if (!clients.length) {
      clientsBody.innerHTML = '<tr><td colspan="6">Aucun client trouvé.</td></tr>';
      return;
    }

    clientsBody.innerHTML = clients.map(client => `
      <tr>
        <td>${escapeHtml(client.id_client)}</td>
        <td>${escapeHtml(client.nom)}</td>
        <td>${escapeHtml(client.prenom)}</td>
        <td>${escapeHtml(client.pays)}</td>
        <td>${escapeHtml(client.premium)}</td>
        <td><button class="danger" onclick="supprimerClient(${client.id_client})">Supprimer</button></td>
      </tr>
    `).join('');
  } catch (error) {
    clientsBody.innerHTML = `<tr><td colspan="6">${escapeHtml(error.message)}</td></tr>`;
    setMessage('client-message', 'Impossible de charger les clients. Vérifiez BASE_URL et ORDS.', 'error');
  }
}

async function supprimerClient(id) {
  if (!confirm(`Supprimer le client ${id} ?`)) return;
  try {
    await remove('client', id);
    setMessage('client-message', `Client ${id} supprimé avec succès.`, 'success');
    chargerClients();
  } catch (error) {
    setMessage('client-message', error.message, 'error');
  }
}

clientForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nouveauClient = {
    nom: document.getElementById('nom').value.trim(),
    prenom: document.getElementById('prenom').value.trim(),
    pays: document.getElementById('pays').value.trim(),
    premium: document.getElementById('premium').value.trim(),
  };

  try {
    await create('client', nouveauClient);
        console.log("created instance of client")
    clientForm.reset();
        console.log("resetted client form")
    document.getElementById('pays').value = 'Canada';
        console.log("gave pays value of canada")
    setMessage('client-message', 'Client ajouté avec succès.', 'success');
        console.log("message")
    chargerClients();
            console.log("successfully loeded clients")
  } catch (error) {
    setMessage('client-message', error.message, 'error');
    console.log("creation of client errored")
  }
});

reloadClientsBtn.addEventListener('click', chargerClients);
chargerClients();
