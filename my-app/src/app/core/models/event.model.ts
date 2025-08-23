export enum EventType {
  WORKSHOP = 'WORKSHOP',
  NETWORKING = 'NETWORKING',
  TRAINING = 'TRAINING',
  CONFERENCE = 'CONFERENCE',
  MEETUP = 'MEETUP',
  OTHER = 'OTHER'
}

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  price: number;
  max_participants: number;
  participants_count: number;
  payment_status?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  is_cancelled?: boolean;
  created: string;
  updated: string;
  type_event: EventType;
  status?: EventStatus;
  image_url?: string;
  organizer?: {
    id: string;
    username: string;
  };
  participations?: EventParticipation[];
  categories?: string[];
  // UI state properties
  isProcessing?: boolean;
  isExpanded?: boolean;
  isFull?: boolean;
  is_validated?: boolean;
}

export interface EventParticipation {
  event_id: string;
  member_id: string;
  payment_status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  created: string;
  updated: string;
}

export enum ParticipationStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

export interface Category {
  id: string;
  name: string;
}

export interface CreateEventDto {
  title: string;
  description: string;
  date: Date;
  location: string;
  price: number;
  max_participants: number;
  type_event: EventType;
  status?: EventStatus;
  image_url?: string;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  max_participants: number;
  type_event: EventType;
  status?: EventStatus;
  image_url?: string;
  categories?: string[];
} 