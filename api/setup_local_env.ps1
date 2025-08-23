# Script de configuration pour l'environnement local
Write-Host "🔧 Configuration de l'environnement local..." -ForegroundColor Green

# Créer le fichier .env local
$envContent = @"
# Configuration de la base de données locale (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=kiwiclub
DB_TYPE=postgres
DB_SYNC=true

# Configuration JWT
JWT_TOKEN_SECRET=kiwiclub-jwt-secret-2025-super-securise-123456789
JWT_TOKEN_EXPIRE_IN=1h
JWT_REFRESH_TOKEN_SECRET=kiwiclub-refresh-jwt-secret-2025-super-securise-123456789
JWT_REFRESH_TOKEN_EXPIRE_IN=7d

# Configuration du serveur
APP_PORT=2024
APP_MODE=development
APP_BASE_URL=http://localhost:2024

# Configuration Google OAuth
GOOGLE_CLIENT_ID=447804059370-3hq60m3iik50cvltiiu8npfl7h2310hn.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:2024/auth/google/callback

# Configuration Stripe
STRIPE_SECRET_KEY=sk_test_votre-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_votre-webhook-secret

# Configuration Email (Mailtrap pour le développement)
SENDGRID_API_KEY=votre-sendgrid-api-key
EMAIL_FROM=noreply@kiwiclub.com

# Configuration CORS
CORS_ORIGIN=http://localhost:4200
"@

# Écrire le contenu dans le fichier .env
$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "✅ Fichier .env créé avec succès!" -ForegroundColor Green
Write-Host "📋 Variables configurées pour le développement local" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  IMPORTANT: Assurez-vous que PostgreSQL est installé et en cours d'exécution" -ForegroundColor Red
Write-Host "⚠️  IMPORTANT: Créez la base de données 'kiwiclub' si elle n'existe pas" -ForegroundColor Red
Write-Host ""
Write-Host "🚀 Vous pouvez maintenant démarrer l'application avec: npm run start:dev" -ForegroundColor Green
