# 🚀 Déploiement Backend sur Render

## 📋 Étapes pour Déployer votre Backend

### 1. **Créer une Base de Données PostgreSQL sur Render**

1. Allez sur [render.com](https://render.com)
2. Cliquez sur "New" > "PostgreSQL"
3. Configurez votre base de données :
   - **Name** : `kiwiclub-db`
   - **Database** : `kiwiclub`
   - **User** : `kiwiclub_user`
   - **Region** : Choisissez la région la plus proche

### 2. **Récupérer les Informations de Connexion**

Après la création, notez :
- **Host** : `dpg-xxxxx-a.frankfurt-postgres.render.com`
- **Port** : `5432`
- **Database** : `kiwiclub`
- **User** : `kiwiclub_user`
- **Password** : (généré automatiquement)

### 3. **Créer un Service Web pour votre Backend**

1. Cliquez sur "New" > "Web Service"
2. Connectez votre repository GitHub
3. Configurez le service :
   - **Name** : `kiwiclub-backend`
   - **Environment** : `Node`
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm run start:prod`

### 4. **Configurer les Variables d'Environnement**

Dans votre service web Render, ajoutez ces variables :

```bash
# Base de données
DATABASE_HOST=dpg-xxxxx-a.frankfurt-postgres.render.com
DATABASE_PORT=5432
DATABASE_USERNAME=kiwiclub_user
DATABASE_PASSWORD=votre-mot-de-passe-db
DATABASE_NAME=kiwiclub

# JWT
JWT_SECRET=votre-secret-jwt-super-securise
JWT_EXPIRES_IN=24h

# Serveur
PORT=2024
NODE_ENV=production

# Google OAuth
GOOGLE_CLIENT_ID=447804059370-3hq60m3iik50cvltiiu8npfl7h2310hn.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre-google-client-secret
GOOGLE_CALLBACK_URL=https://kiwiclub-backend.onrender.com/auth/google/callback

# Stripe
STRIPE_SECRET_KEY=sk_test_votre-stripe-secret
STRIPE_WEBHOOK_SECRET=whsec_votre-webhook-secret

# Email
SENDGRID_API_KEY=votre-sendgrid-api-key
EMAIL_FROM=noreply@kiwiclub.com

# CORS
CORS_ORIGIN=https://kiwiclub-flutter.onrender.com
```

### 5. **Mettre à Jour votre Application Flutter**

Dans votre app Flutter, mettez à jour l'URL de l'API :

```dart
// Dans lib/constants/api_config.dart
static const String baseUrl = 'https://kiwiclub-backend.onrender.com';
```

### 6. **Déployer**

1. Committez vos changements :
```bash
git add .
git commit -m "Configure backend for Render deployment"
git push origin main
```

2. Render déploiera automatiquement votre backend

## 🔧 Configuration Avancée

### Configuration CORS

Dans votre `main.ts`, assurez-vous que CORS est configuré :

```typescript
app.enableCors({
  origin: [
    'https://kiwiclub-flutter.onrender.com',
    'http://localhost:3000', // Pour le développement
  ],
  credentials: true,
});
```

### Configuration de la Base de Données

Vérifiez que votre configuration TypeORM utilise les variables d'environnement :

```typescript
// Dans votre configuration TypeORM
{
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
}
```

## 🐛 Dépannage

### Problèmes Courants

1. **Erreur de connexion à la DB**
   - Vérifiez les variables d'environnement
   - Assurez-vous que la DB est active sur Render

2. **Erreurs CORS**
   - Vérifiez que l'URL de votre app Flutter est dans CORS_ORIGIN
   - Testez avec Postman

3. **Build échoue**
   - Vérifiez les logs de build sur Render
   - Assurez-vous que toutes les dépendances sont installées

## 📊 Vérification

### Test de l'API

Une fois déployé, testez votre API :

```bash
# Test de santé
curl https://kiwiclub-backend.onrender.com/health

# Test d'authentification
curl -X POST https://kiwiclub-backend.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### Test avec Flutter

Dans votre app Flutter, testez la connexion :

```dart
// Test de connexion API
final response = await http.get(
  Uri.parse('https://kiwiclub-backend.onrender.com/health'),
);
print('Status: ${response.statusCode}');
```

## 🎯 Prochaines Étapes

1. **Déployez votre backend** avec les bonnes variables d'environnement
2. **Testez la connexion** depuis votre app Flutter
3. **Vérifiez toutes les fonctionnalités** (auth, événements, paiements)
4. **Préparez votre présentation** avec l'app fonctionnelle

## 🚀 Prêt pour la Présentation !

Une fois votre backend déployé et configuré, votre application Flutter pourra communiquer avec lui et toutes les fonctionnalités seront opérationnelles pour votre présentation !
