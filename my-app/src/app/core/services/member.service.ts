// Service Angular pour la gestion des membres (CRUD, recherche, etc.)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '@core/models/member.model';
import { User, mapUserToMember } from '@core/models/user.model';
import { MemberRefreshService } from '@core/services/member-refresh.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  // URL de base de l'API pour les utilisateurs
  private apiUrl = `${environment.apiUrl}/users`;
  // Subject pour stocker la liste des membres en mémoire (pattern RxJS)
  private membersSubject = new BehaviorSubject<User[]>([]);
  // Observable exposé pour souscription dans les composants
  members$ = this.membersSubject.asObservable();

  constructor(private http: HttpClient, private memberRefreshService: MemberRefreshService) {}

  /**
   * Récupère tous les membres (brut, format User)
   */
  getAllMembers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Récupère un membre par son ID et adapte les propriétés reçues du backend (français/snake_case)
   * vers le modèle Member utilisé côté front (anglais/camelCase).
   */
  getMemberById(id: string): Observable<Member> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        const user = response.data;
        // Mapping backend -> front
        return {
          id: user.id,
          firstName: user.prenom,
          lastName: user.nom,
          email: user.email,
          company: user.entreprise,
          position: user.position || '',
          bio: user.bio || '',
          linkedinUrl: user.linkedin,
          website: user.website || '',
          isActive: user.isActive,
          profileImage: user.photo || '',
          joinDate: user.created_at,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          role: user.type_user,
          phone: user.telephone || '',
          address: user.address || '',
          city: user.city || '',
          country: user.country || '',
          username: user.username || ''
        };
      })
    );
  }

  /**
   * Recherche un membre par email (retourne undefined si non trouvé)
   */
  getMemberByEmail(email: string): Observable<Member | undefined> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => users.length > 0 ? mapUserToMember(users[0]) : undefined)
    );
  }

  /**
   * Récupère uniquement les membres actifs
   * Correction : gère le cas où la réponse est un tableau ou un objet { data: [...] }
   */
  getActiveMembers(): Observable<Member[]> {
    return this.http.get<any>(`${this.apiUrl}?active=true`).pipe(
      map(response => {
        // La réponse peut être un tableau ou un objet avec une propriété data
        let users: any[] = [];
        if (Array.isArray(response)) {
          users = response;
        } else if (Array.isArray(response?.data)) {
          users = response.data;
        }
        return users.map(user => mapUserToMember(user));
      })
    );
  }

  /**
   * Recherche des membres par une requête textuelle
   */
  searchMembers(query: string): Observable<Member[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search?q=${query}`).pipe(
      map(users => users.map(user => mapUserToMember(user)))
    );
  }

  /**
   * Met à jour un membre (PUT). Adapte le champ 'company' en 'entreprise' pour le backend.
   * @param id ID du membre à mettre à jour
   * @param data Données à mettre à jour (partielles)
   */
  updateMember(id: string, data: Partial<Member>): Observable<void> {
    // Adapter le champ 'company' si besoin
    const payload: any = { ...data };
    if (payload.company) {
      payload.entreprise = payload.company;
      delete payload.company;
    }
    // Le backend attend 'isActive' (et non 'active'), donc on ne transforme pas ce champ
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  /**
   * Supprime un membre par son ID
   */
  deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Restaure un membre inactif (soft deleted) en le réactivant
   * @param id ID du membre à restaurer
   */
  restoreMember(id: string): Observable<void> {
    // Correction : utiliser PATCH comme dans Postman
    return this.http.patch<void>(`${environment.apiUrl}/security/restore/${id}`, {});
  }

  /**
   * Récupère le membre actuellement connecté (endpoint /me)
   */
  getCurrentMember(): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/me`);
  }

  /**
   * Convertit un objet Member (front) en User (backend) pour l'API si besoin
   * (peu utilisé, mais utile pour des mappings personnalisés)
   */
  private convertMemberToUserData(memberData: Partial<Member>): Partial<User> {
    // Table de correspondance des champs front <-> back
    const userDataMap: { [key in keyof Member]?: keyof User } = {
      email: 'mail',
      profileImage: 'profilePicture',
      website: 'websiteUrl',
      isActive: 'active'
    };

    const userData: Partial<User> = {};
    // Pour chaque champ, on mappe la clé si besoin
    Object.entries(memberData).forEach(([key, value]) => {
      const userKey = userDataMap[key as keyof Member] || key;
      if (userKey) {
        userData[userKey as keyof User] = value as any;
      }
    });

    return userData;
  }
}
// Fin du service MemberService 