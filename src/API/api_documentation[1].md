# Documentation API Backend - Guide Frontend

## 📋 Table des matières
- [Authentification](#authentification)
- [Gestion des utilisateurs](#gestion-des-utilisateurs)
- [Gestion des sites](#gestion-des-sites)
- [Saisie des données](#saisie-des-données)
- [Codes d'erreur](#codes-derreur)

---

## 🔐 Authentification

### Base URL
Toutes les requêtes doivent être envoyées à l'URL de base de l'API.

### Header d'authentification
**Tous les endpoints (sauf login) nécessitent le token JWT dans le header :**

```http
Authorization: Bearer <votre_token_jwt>
Content-Type: application/json
```

---

### 1. Login
**Endpoint:** `POST /api-auth/login/`

**Description:** Connexion d'un utilisateur existant.

**Body (JSON):**
```json
{
  "username": "nom_utilisateur",
  "password": "mot_de_passe"
}
```

**Réponse succès (200):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### 2. Logout
**Endpoint:** `POST /api-auth/logout/`

**Description:** Déconnexion de l'utilisateur.

**Headers:**
```http
Authorization: Bearer <access_token>
```

---

### 3. Obtenir un token
**Endpoint:** `POST /user/token/`

**Description:** Obtenir un nouveau token JWT.

**Body (JSON):**
```json
{
  "username": "nom_utilisateur",
  "password": "mot_de_passe"
}
```

**Réponse succès (200):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### 4. Rafraîchir le token
**Endpoint:** `POST /user/token/refresh/`

**Description:** Rafraîchir le token d'accès avec le refresh token.

**Body (JSON):**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Réponse succès (200):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## 👤 Gestion des utilisateurs

### 5. Créer un utilisateur
**Endpoint:** `POST /user/register/`

**Description:** Créer un nouveau compte utilisateur (nécessite authentification).

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "nouveau_user",
  "password": "mot_de_passe_securise",
  "email": "email@exemple.com",
  "role": "user",
  "sites": [1, 2, 3]
}
```

**Champs obligatoires:**
- `username` (string)
- `password` (string)
- `role` (string) - Valeurs possibles : `"admin"`, `"superuser"`, `"user"`, `"agent"`
- `sites` (array d'integers) - IDs des sites associés

**Champs optionnels:**
- `email` (string)

**Réponse succès (201):**
```json
{
  "message": "Utilisateur créé avec succès"
}
```

---

### 6. Profil utilisateur
**Endpoint:** `GET /user/profile/`

**Description:** Récupérer le profil de l'utilisateur connecté.

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Réponse succès (200):**
```json
{
  "id": 1,
  "username": "nom_utilisateur",
  "email": "email@exemple.com",
  "role": "user",
  "sites": [
    {
      "id": 1,
      "nom": "Site A"
    },
    {
      "id": 2,
      "nom": "Site B"
    }
  ]
}
```

---

## 🏢 Gestion des sites

### 7. Créer un site
**Endpoint:** `POST /user/site/register/`

**Description:** Créer un nouveau site (réservé aux administrateurs).

**Permission:** Rôle `admin` requis

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nom": "Nom du site"
}
```

**Réponse succès (201):**
```json
{
  "message": "Site créé avec succès",
  "id": 5,
  "nom": "Nom du site"
}
```

---

## 📊 Saisie des données

### 8. Énergies
**Endpoint:** `/core/energies/`

**Description:** Gestion des données énergétiques (voir fichier Excel pour la structure des données).

**Méthodes supportées:**
- `POST` - Créer une nouvelle entrée
- `GET` - Lister les entrées
- `PATCH` - Valider une entrée existante

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Exemple POST:**
```json
{
  // Structure selon le fichier Excel partagé
}
```

---

### 9. Eaux
**Endpoint:** `/core/eaux/`

**Description:** Gestion des données sur l'eau (voir fichier Excel pour la structure des données).

**Méthodes supportées:**
- `POST` - Créer une nouvelle entrée
- `GET` - Lister les entrées
- `PATCH` - Valider une entrée existante

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Exemple POST:**
```json
{
  // Structure selon le fichier Excel partagé
}
```

---

### 10. Déchets
**Endpoint:** `/core/dechets/`

**Description:** Gestion des données sur les déchets (voir fichier Excel pour la structure des données).

**Méthodes supportées:**
- `POST` - Créer une nouvelle entrée
- `GET` - Lister les entrées
- `PATCH` - Valider une entrée existante

**Headers:**
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Exemple POST:**
```json
{
  // Structure selon le fichier Excel partagé
}
```

---

## ⚠️ Codes d'erreur

| Code | Signification | Description |
|------|---------------|-------------|
| 200 | OK | Requête réussie |
| 201 | Created | Ressource créée avec succès |
| 400 | Bad Request | Données invalides ou manquantes |
| 401 | Unauthorized | Token manquant ou invalide |
| 403 | Forbidden | Permissions insuffisantes |
| 404 | Not Found | Ressource introuvable |
| 500 | Internal Server Error | Erreur serveur |

**Format des erreurs:**
```json
{
  "error": "Description de l'erreur",
  "details": {
    "field": ["Message d'erreur spécifique"]
  }
}
```

---

## 📝 Notes importantes

1. **Tous les endpoints nécessitent un token JWT** dans le header (sauf `/api-auth/login/` et `/user/token/`)
2. **Toutes les données doivent être envoyées en JSON**
3. **Les tokens expirent** - utilisez `/user/token/refresh/` pour renouveler
4. **Référez-vous au fichier Excel** pour la structure détaillée des données pour les endpoints énergies, eaux et déchets
5. **Seuls les admins peuvent créer des sites**

---

## 🔄 Workflow typique

1. **Login** avec `POST /api-auth/login/` ou `POST /user/token/`
2. **Stocker les tokens** (access et refresh)
3. **Utiliser le access token** dans toutes les requêtes
4. **Rafraîchir le token** quand nécessaire avec `POST /user/token/refresh/`
5. **Logout** avec `POST /api-auth/logout/`