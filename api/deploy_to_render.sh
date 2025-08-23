#!/bin/bash

# Script de déploiement pour Render
echo "🚀 Déploiement du backend sur Render..."

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Vous devez être dans le dossier api/"
    exit 1
fi

# Vérifier que git est configuré
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Erreur: Ce dossier n'est pas un repository git"
    exit 1
fi

# Vérifier le statut git
echo "📋 Statut du repository git:"
git status

# Demander confirmation
echo ""
echo "⚠️  Attention: Ce script va pousser les changements vers le repository distant"
echo "Assurez-vous d'avoir configuré les variables d'environnement sur Render"
echo ""
read -p "Continuer le déploiement? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Déploiement annulé"
    exit 1
fi

# Ajouter tous les fichiers
echo "📦 Ajout des fichiers..."
git add .

# Créer le commit
echo "💾 Création du commit..."
git commit -m "Deploy to Render - $(date)"

# Pousser vers le repository distant
echo "🚀 Push vers le repository distant..."
git push origin main

echo ""
echo "✅ Déploiement terminé!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Allez sur Render Dashboard"
echo "2. Vérifiez que le déploiement est en cours"
echo "3. Configurez les variables d'environnement si nécessaire"
echo "4. Testez votre API: https://kiwiclub-backend.onrender.com/health"
echo ""
echo "🔗 URLs importantes:"
echo "- Backend: https://kiwiclub-backend.onrender.com"
echo "- API Health: https://kiwiclub-backend.onrender.com/health"
echo "- Swagger Docs: https://kiwiclub-backend.onrender.com/api-docs"
