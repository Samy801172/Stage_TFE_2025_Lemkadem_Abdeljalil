import { Member } from './member.model';

export interface User {
  id: string;
  username: string;
  mail: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  companyName?: string;
  position?: string;
  address?: string;
  city?: string;
  country?: string;
  profilePicture?: string;
  bio?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  active: boolean;
  created: string | Date;
  updated: string | Date;
  isAdmin: boolean;
  credential_id: string;
  role?: UserRole;
  entreprise?: string;
}

export function mapUserToMember(user: any): Member {
  let joinDate: Date = new Date();
  if (user.created_at && !isNaN(new Date(user.created_at).getTime())) {
    joinDate = new Date(user.created_at);
  }

  return {
    id: user.id,
    username: user.nom || user.prenom || 'Non spécifié',
    email: user.email || 'Non spécifié',
    firstName: user.prenom || 'Non spécifié',
    lastName: user.nom || '',
    company: user.entreprise || 'Non spécifié',
    position: user.secteur || 'Non spécifié',
    phone: user.telephone || 'Non spécifié',
    address: '', // pas dans la réponse
    city: '',    // pas dans la réponse
    country: '', // pas dans la réponse
    profileImage: user.photo || '',
    bio: user.bio || '',
    linkedinUrl: user.linkedin || '',
    website: '', // pas dans la réponse
    isActive: user.isActive,
    joinDate
  };
}

export enum UserRole {
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
  MEMBER = 'MEMBER'
} 