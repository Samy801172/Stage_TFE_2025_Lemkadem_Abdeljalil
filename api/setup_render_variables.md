# 🔧 Configuration des Variables d'Environnement sur Render

## 📋 Variables à Configurer dans Render Dashboard

Copiez ces variables une par une dans votre service web Render :

### Base de Données
```
DATABASE_HOST=dpg-xxxxx-a.frankfurt-postgres.render.com
DATABASE_PORT=5432
DATABASE_USERNAME=kiwiclub_user
DATABASE_PASSWORD=votre-mot-de-passe-db
DATABASE_NAME=kiwiclub
```

### JWT
```
JWT_SECRET=kiwiclub-jwt-secret-2025-super-securise-123456789
JWT_EXPIRES_IN=24h
```

### Serveur
```
PORT=10000
NODE_ENV=production
```

### Google OAuth
```
GOOGLE_CLIENT_ID=447804059370-3hq60m3iik50cvltiiu8npfl7h2310hn.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre-google-client-secret
GOOGLE_CALLBACK_URL=https://kiwiclub-backend.onrender.com/auth/google/callback
```

### Stripe
```
STRIPE_SECRET_KEY=sk_test_votre-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_votre-webhook-secret
```

### Email
```
SENDGRID_API_KEY=votre-sendgrid-api-key
EMAIL_FROM=noreply@kiwiclub.com
```

### CORS
```
CORS_ORIGIN=https://kiwiclub-flutter.onrender.com
```

## 🚀 Étapes pour Configurer sur Render

1. **Allez sur Render Dashboard**
2. **Sélectionnez votre service web** `kiwiclub-backend`
3. **Cliquez sur "Environment"**
4. **Ajoutez chaque variable** une par une
5. **Sauvegardez** après chaque ajout

## ⚠️ Important

- **Remplacez** `dpg-xxxxx-a.frankfurt-postgres.render.com` par votre vrai host de DB
- **Remplacez** `votre-mot-de-passe-db` par votre vrai mot de passe
- **Remplacez** `votre-google-client-secret` par votre vrai secret Google
- **Remplacez** `sk_test_votre-stripe-secret-key` par votre vraie clé Stripe

## 🔄 Après Configuration

Une fois toutes les variables configurées :

1. **Redéployez** votre service
2. **Vérifiez les logs** pour s'assurer qu'il n'y a pas d'erreurs
3. **Testez votre API** : `https://kiwiclub-backend.onrender.com/health`
