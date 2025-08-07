# ✅ Vérification du Déploiement Render

## 🔍 Checklist de Vérification

### 1. **Vérification du Backend**

#### Test de Santé de l'API
```bash
# Test de base
curl https://kiwiclub-backend.onrender.com/health

# Réponse attendue: {"status":"ok"}
```

#### Test d'Authentification
```bash
# Test de connexion
curl -X POST https://kiwiclub-backend.onrender.com/api/security/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

#### Test de la Base de Données
```bash
# Vérifier que la DB est connectée
curl https://kiwiclub-backend.onrender.com/api/events
```

### 2. **Vérification des Variables d'Environnement**

Dans Render Dashboard, vérifiez que ces variables sont configurées :

✅ **Base de données**
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `DATABASE_NAME`

✅ **JWT**
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

✅ **Google OAuth**
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`

✅ **Stripe**
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

✅ **CORS**
- `CORS_ORIGIN`

### 3. **Vérification de l'Application Flutter**

#### Test de Connexion API
```dart
// Dans votre app Flutter, testez :
final response = await http.get(
  Uri.parse('https://kiwiclub-backend.onrender.com/api/health'),
);
print('Status: ${response.statusCode}');
print('Body: ${response.body}');
```

#### Test d'Authentification
```dart
// Test de connexion
final loginResponse = await http.post(
  Uri.parse('https://kiwiclub-backend.onrender.com/api/security/signin'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({
    'email': 'test@example.com',
    'password': 'password'
  }),
);
```

### 4. **Vérification des Logs**

Dans Render Dashboard :
1. Allez dans votre service web
2. Cliquez sur "Logs"
3. Vérifiez qu'il n'y a pas d'erreurs

### 5. **Tests Fonctionnels**

#### ✅ Authentification
- [ ] Connexion par email
- [ ] Connexion Google
- [ ] Déconnexion

#### ✅ Événements
- [ ] Liste des événements
- [ ] Détails d'un événement
- [ ] Inscription à un événement

#### ✅ Paiements
- [ ] Création de session de paiement
- [ ] Vérification de paiement
- [ ] Génération de facture

#### ✅ Messagerie
- [ ] Envoi de message
- [ ] Réception de message
- [ ] Gestion des contacts

## 🐛 Dépannage

### Erreur 500 - Internal Server Error
```bash
# Vérifiez les logs Render
# Problème probable: Variables d'environnement manquantes
```

### Erreur de Connexion à la DB
```bash
# Vérifiez:
# 1. Les variables DATABASE_* sont configurées
# 2. La DB PostgreSQL est active sur Render
# 3. Les credentials sont corrects
```

### Erreurs CORS
```bash
# Vérifiez que CORS_ORIGIN contient:
# - https://kiwiclub-flutter.onrender.com
# - http://localhost:3000 (pour le développement)
```

### Build échoue
```bash
# Vérifiez:
# 1. Toutes les dépendances dans package.json
# 2. Les scripts de build dans package.json
# 3. La version de Node.js sur Render
```

## 📊 Tests Automatisés

### Script de Test Rapide
```bash
#!/bin/bash
echo "🧪 Test du backend Render..."

# Test de santé
echo "1. Test de santé..."
curl -s https://kiwiclub-backend.onrender.com/health

# Test d'authentification
echo "2. Test d'authentification..."
curl -s -X POST https://kiwiclub-backend.onrender.com/api/security/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test des événements
echo "3. Test des événements..."
curl -s https://kiwiclub-backend.onrender.com/api/events

echo "✅ Tests terminés!"
```

## 🎯 Prochaines Étapes

Une fois tout vérifié :

1. **Testez votre app Flutter** avec le backend Render
2. **Vérifiez toutes les fonctionnalités**
3. **Préparez votre présentation**
4. **Ayez un plan B** (backend local en cas de problème)

## 🚀 Prêt pour la Présentation !

Si tous les tests passent, votre application est prête pour la présentation !
