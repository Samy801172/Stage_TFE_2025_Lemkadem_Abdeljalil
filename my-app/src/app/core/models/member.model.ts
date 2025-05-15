export interface Member {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  profileImage: string;
  bio?: string;
  linkedinUrl?: string;
  website?: string;
  isActive: boolean;
  joinDate: Date;
  role?: string;
}

export interface MemberProfile extends Member {
  interests?: string[];
  skills?: string[];
  languages?: string[];
  events?: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  created: Date;
} 