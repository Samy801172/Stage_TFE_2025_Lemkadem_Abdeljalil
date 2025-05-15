export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  companySector?: string;
  bio?: string;
  profilePicture?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  role: 'ADMIN' | 'ORGANIZER' | 'MEMBER';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
} 