# API Documentation for Frontend Team

Ce document résume les principales API que tu as mises en place côté backend pour faciliter l'intégration avec le frontend.

---

## 🔐 Authentication (JWT Simple Authentication)

### **1. POST /token/**

Permet de récupérer un **access token** et un **refresh token**.

#### **Body JSON**

```json
{
  "username": "aymane",
  "password": "password"
}
```

#### **Response**

```json
{
  "refresh": "<refresh_token>",
  "access": "<access_token>"
}
```

---

## 👤 Users API — `/user/users/`

Gère la création, consultation, mise à jour et suppression des utilisateurs.

### **1. GET /user/users/**

Récupère la liste des utilisateurs.

### **2. POST /user/users/**

Crée un nouvel utilisateur.

#### Body JSON

```json
{
  "username": "aymane",
  "password": "your_password", // uniquement nécessaire lors de la création
  "role": "admin",
  "sites": []
}
```

### **3. PATCH /user/users/{id}/**

Met à jour les informations d'un utilisateur.

### **4. DELETE /user/users/{id}/**

Supprime un utilisateur.

---

## 📊 Type Indicateurs — `/user/type-indicateurs/`

Permet de récupérer la liste des types d’indicateurs disponibles.

### **GET /user/type-indicateurs/**

Renvoie tous les indicateurs utilisables dans les configurations de sites.

Exemple de réponse :

```json
[
  {
    "id": 1,
    "name": "Température",
    "description": "Mesure de la température"
  },
  {
    "id": 2,
    "name": "Pression",
    "description": "Mesure de la pression"
  }
]
```

---

## 🏨 Sites API — `/user/sites/`

Gère la création et la configuration des sites.

### **1. POST /user/sites/**

Crée un nouveau site.

#### Body JSON

```json
{
  "name": "Nom du site",
  "require_double_validation": true,
  "config_json": {}
}
```

### **2. PATCH /user/sites/{id}/**

Met à jour un site existant.

---

## ⚙️ Site Configuration — `/user/sites/{id}/config/`

Permet de mettre à jour la configuration détaillée d’un site.

### **PUT /user/sites/{id}/config/**

#### Body JSON

```json
{
  "configs": [
    {
      "type_indicateur_id": 1,
      "obligatoire": true
    }
    // ...
  ]
}
```

---

Si tu veux, je peux ajouter :

- des exemples de réponses pour chaque endpoint,
- un schéma global,
- des explications sur l’auth middleware,
- ou reformater pour que ce soit plus "API reference" style Swagger.
