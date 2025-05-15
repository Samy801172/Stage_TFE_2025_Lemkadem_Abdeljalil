import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // Mapping des noms d'utilisateurs vers leurs images de profil
  private readonly userImages: Record<string, string> = {
    'abdeladmin': 'Abdel.jpg',                                // Photo d'Abdel pour admin
    'abdel@hotmail.be': 'Abdel.jpg',                         // Photo d'Abdel pour admin (email)
    'member1': 'Clara.jpg',                                  // Photo de Clara
    'clara.dubois@digital-solutions.be': 'Clara.jpg', 
    'member2': 'Jon.jpg',                                    // Photo de Jon
    'jon.stevens@digital-solutions.be': 'Jon.jpg',           // Photo de Jon (email pro)
    'member3': 'Nat.jpg',                                    // Photo de Nat
    'nathalie.martin@webdev-experts.be': 'Nat.jpg',          // Photo de Nat (email pro)
    'member4': 'Isabelle.jpg',                              // Photo de Isabelle
    'isabelle.leroy@design-studio.be': 'Isabelle.jpg',      // Photo de Isabelle (email pro)
    'member5': 'Pierre.jpg',                                // Photo de Pierre
    'pierre.dupont@data-analytics.be': 'Pierre.jpg',        // Photo de Pierre (email pro)
    'member6': 'Maria.jpg',                                 // Photo de Maria
    'maria.garcia@cyber-security.be': 'Maria.jpg',           // Photo de Maria (email pro)
    
  };

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Récupère l'URL de l'image de profil pour un utilisateur donné
   * @param username Identifiant de l'utilisateur (peut être vide)
   * @param email Email de l'utilisateur (optionnel)
   * @returns URL de l'image de profil
   */
  getProfileImage(username: string, email?: string): string {
    // Log pour debug
    console.log('Getting image for username:', username, 'and email:', email);

    // Si aucun identifiant fourni, retourne l'image par défaut
    if (!username && !email) {
      console.log('No username or email provided, using default');
      return '/assets/members/default.jpg';
    }

    // Normalise les identifiants pour éviter les problèmes de casse
    const normalizedUsername = username ? username.toLowerCase() : '';
    const normalizedEmail = email ? email.toLowerCase() : '';

    // Vérifie si c'est un utilisateur Google (email se termine par @gmail.com)
    if (normalizedEmail && normalizedEmail.endsWith('@gmail.com')) {
      console.log('Google user detected, using Google default avatar');
      return '/assets/members/google-default.jpg';
    }

    // Cherche d'abord par username
    let imageName = this.userImages[normalizedUsername];

    // Si pas trouvé, cherche par email
    if (!imageName && normalizedEmail) {
      imageName = this.userImages[normalizedEmail];
    }

    // Si toujours pas trouvé, retourne l'image par défaut
    if (!imageName) {
      console.log('No specific image found for user, using default');
      return '/assets/members/default.jpg';
    }

    const fullPath = `/assets/members/${imageName}`;
    console.log('Image path:', fullPath);
    return fullPath;
  }

  /**
   * Précharge les images pour le mode hors ligne (PWA)
   */
  async preloadImages(): Promise<void> {
    try {
      const images = [...Object.values(this.userImages), 'default.jpg', 'google-default.jpg'];
      console.log('Preloading images:', images);
      
      await Promise.all(
        images.map(async img => {
          const response = await fetch(`/assets/members/${img}`);
          if (!response.ok) {
            throw new Error(`Failed to load ${img}`);
          }
          console.log(`Successfully loaded: ${img}`);
        })
      );
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  }

  /**
   * Gère les erreurs de chargement d'image
   */
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== '/assets/members/default.jpg') {
      img.src = '/assets/members/default.jpg';
    }
  }
} 