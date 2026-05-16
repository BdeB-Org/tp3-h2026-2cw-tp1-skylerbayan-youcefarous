# Projet Commande - TP3

Ce projet est un exemple complet correspondant au TP3. Il utilise le schéma Oracle **commande** et une API REST **ORDS** consommée avec `fetch()`.

## Structure

```text
commande-projet/
├── index.html
├── clients.html
├── produits.html
├── utilisateurs.html
├── paniers.html
├── css/
│   └── style.css
├── js/
│   ├── api.js
│   ├── shared.js
│   ├── clients.js
│   ├── produits.js
│   ├── utilisateurs.js
│   └── paniers.js
└── sql/
    └── commande_schema.sql
```

## 1. Prérequis

- Oracle Database dans votre VM
- ORDS activé
- VS Code
- Extension **Live Server**

## 2. Préparer la base de données

1. Ouvrir Oracle SQL Developer
2. Exécuter le script `sql/commande_schema.sql`
3. Vérifier que les tables existent :
   - client
   - produit
   - utilisateur
   - panier
   - item

## 3. Activer ORDS

Activer le schéma et les tables pour exposer les endpoints REST.

Exemples d'URLs :
- `http://localhost:8080/ords/commande/client/`
- `http://localhost:8080/ords/commande/produit/`
- `http://localhost:8080/ords/commande/utilisateur/`
- `http://localhost:8080/ords/commande/panier/`
- `http://localhost:8080/ords/commande/item/`

## 4. Configurer le frontend

Ouvrir le fichier `js/api.js` et ajuster au besoin :

```javascript
const BASE_URL = 'http://localhost:8080/ords/commande';
```

Si votre mapping ORDS est différent, modifier cette valeur.

## 5. Exécuter le projet dans VS Code

1. Ouvrir le dossier `commande-projet` dans VS Code
2. Cliquer sur `index.html`
3. Lancer **Open with Live Server**
4. Naviguer entre les pages

## 6. Pages incluses

- **index.html** : accueil
- **clients.html** : liste, ajout, suppression
- **produits.html** : liste, filtre de recherche
- **utilisateurs.html** : liste et ajout
- **paniers.html** : liste des paniers et consultation des items

## 7. Notes importantes

- ORDS retourne généralement les listes dans `data.items`
- Le projet est purement frontend
- Les formulaires d'ajout fonctionnent si les endpoints POST sont actifs dans ORDS
- La suppression fonctionne si l'endpoint DELETE est actif

## 8. Adaptation pédagogique

Ce projet sert de modèle pour le schéma `commande`. Pour un autre schéma, il faut conserver la même logique et adapter :
- les noms de pages HTML
- les fichiers JS
- les noms des tables et des colonnes
