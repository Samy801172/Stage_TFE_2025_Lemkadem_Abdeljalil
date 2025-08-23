import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '@core/models/member.model';
import { MemberService } from '@core/services/member.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { User, mapUserToMember } from '@core/models/user.model';
import { NotificationService } from '@core/services/notification.service';
import { filter } from 'rxjs/operators';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MemberRefreshService } from '@core/services/member-refresh.service';

@Component({
  selector: 'app-admin-members',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="members-container">
      <header class="members-header">
        <h1>Gestion des Membres</h1>
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Rechercher un membre..." 
            [(ngModel)]="searchQuery"
            (keyup)="filterMembers()"
          >
        </div>
      </header>

      <div class="members-table-container">
        <table class="members-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Entreprise</th>
              <th>Date d'inscription</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let member of filteredMembers">
              <td>{{ member.lastName }}</td>
              <td>{{ member.firstName }}</td>
              <td>{{ member.email }}</td>
              <td>{{ member.company }}</td>
              <td>{{ member.joinDate | date:'dd/MM/yyyy' }}</td>
              <td>
                <span [class]="member.isActive ? 'status-active' : 'status-inactive'">
                  {{ member.isActive ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td class="actions-cell">
                <button 
                  class="btn-toggle-status" 
                  (click)="toggleMemberStatus(member)" 
                  [title]="member.isActive ? 'Désactiver le membre' : 'Restaurer le membre'">
                  <i 
                    [ngClass]="member.isActive ? 'fas fa-user-check status-active-icon' : 'fas fa-user-slash status-inactive-icon'"
                  ></i>
                </button>
                <button class="btn-edit" (click)="editMember(member)">
                  <i class="fas fa-pen"></i>
                </button>
              </td>
            </tr>
            <tr *ngIf="filteredMembers.length === 0 && !loading">
              <td colspan="8" class="no-data">Aucun membre trouvé</td>
            </tr>
            <tr *ngIf="loading">
              <td colspan="8" class="loading">
                <i class="fas fa-spinner fa-spin"></i> Chargement des membres...
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="showDeleteModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Confirmer la suppression</h2>
          <p>Êtes-vous sûr de vouloir supprimer le membre {{ selectedMember?.firstName }} {{ selectedMember?.lastName }} ?</p>
          <p class="warning">Cette action est irréversible.</p>
          <div class="modal-actions">
            <button class="btn-cancel" (click)="showDeleteModal = false">Annuler</button>
            <button class="btn-confirm" (click)="deleteMember()">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .members-container {
      padding: 2rem;
    }
    
    .members-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .search-box {
      flex: 0 0 300px;
    }
    
    .search-box input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .members-table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .members-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .members-table th, .members-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    .members-table th {
      background: #f5f5f5;
      font-weight: 600;
    }
    
    .actions-cell {
      display: flex;
      gap: 0.5rem;
    }
    
    .btn-view, .btn-edit, .btn-enable, .btn-disable, .btn-delete {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    
    .btn-view {
      color: #4CAF50;
    }
    
    .btn-edit {
      color: #2196F3;
    }
    
    .btn-enable {
      color: #4CAF50;
    }
    
    .btn-disable {
      color: #FF9800;
    }
    
    .btn-delete {
      color: #F44336;
    }
    
    .btn-view:hover, .btn-edit:hover, .btn-enable:hover, .btn-disable:hover, .btn-delete:hover {
      background: rgba(0,0,0,0.05);
    }
    
    .status-active {
      background: #e8f5e9;
      color: #1b5e20;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.85rem;
    }
    
    .status-inactive {
      background: #ffebee;
      color: #b71c1c;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.85rem;
    }
    
    .no-data, .loading {
      text-align: center;
      padding: 2rem;
      color: #757575;
    }
    
    .loading i {
      margin-right: 0.5rem;
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 100%;
      max-width: 500px;
    }
    
    .warning {
      color: #F44336;
      font-weight: bold;
    }
    
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }
    
    .btn-cancel, .btn-confirm {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    
    .btn-cancel {
      background: #f5f5f5;
      color: #333;
      border: 1px solid #ddd;
    }
    
    .btn-confirm {
      background: #F44336;
      color: white;
      border: none;
    }
    
    .btn-toggle-status {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .btn-toggle-status .status-active-icon {
      color: #4CAF50;
    }
    .btn-toggle-status .status-inactive-icon {
      color: #FF9800;
    }
  `]
})
export class AdminMembersComponent implements OnInit {
  members: Member[] = [];
  filteredMembers: Member[] = [];
  searchQuery: string = '';
  loading: boolean = true;
  showDeleteModal: boolean = false;
  selectedMember: Member | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private memberService: MemberService,
    private notificationService: NotificationService,
    private router: Router,
    private memberRefreshService: MemberRefreshService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const nav = event as NavigationEnd;
      if (nav.urlAfterRedirects.startsWith('/admin/members')) {
        this.loadMembers();
      }
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.loading = true;
    this.memberService.getAllMembers().subscribe({
      next: (response: any) => {
        let users: any[] = [];
        if (Array.isArray(response)) {
          users = response;
        } else if (Array.isArray(response?.data)) {
          users = response.data;
        }
        this.members = users.map(user => mapUserToMember(user));
        this.filterMembers();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des membres:', error);
        this.showErrorMessage('Erreur lors du chargement des membres');
        this.loading = false;
      }
    });
  }

  filterMembers() {
    const query = this.searchQuery.toLowerCase();
    this.filteredMembers = this.members.filter(member =>
      member.firstName?.toLowerCase().includes(query) ||
      member.lastName?.toLowerCase().includes(query) ||
      member.email?.toLowerCase().includes(query) ||
      member.company?.toLowerCase().includes(query)
    );
  }

  viewProfile(member: Member) {
    this.router.navigate(['/admin/members', member.id]);
  }

  editMember(member: Member) {
    this.router.navigate(['/admin/members', member.id]);
  }

  toggleMemberStatus(member: Member) {
    if (member.isActive) {
      this.memberService.deleteMember(member.id).subscribe({
        next: () => {
          member.isActive = false;
          this.showSuccessMessage('Membre désactivé avec succès');
          this.showSuccessMessage('Email envoyé au membre');
          this.loadMembers();
          this.memberRefreshService.triggerRefresh();
        },
        error: (error) => {
          this.showErrorMessage('Erreur lors de la désactivation');
          console.error(error);
        }
      });
    } else {
      this.restoreMember(member);
    }
  }

  confirmDelete(member: Member) {
    this.selectedMember = member;
    this.showDeleteModal = true;
  }

  deleteMember() {
    if (!this.selectedMember) return;
    
    const memberId = this.selectedMember.id;
    this.memberService.deleteMember(memberId).subscribe({
      next: () => {
        this.members = this.members.filter(m => m.id !== memberId);
        this.filterMembers();
        this.showDeleteModal = false;
        this.selectedMember = null;
      },
      error: (error) => {
        console.error('Error deleting member:', error);
        alert('Erreur lors de la suppression du membre. Veuillez réessayer.');
        this.showDeleteModal = false;
      }
    });
  }

  restoreMember(member: Member) {
    if (!member.id) return;
    this.memberService.restoreMember(member.id).subscribe({
      next: () => {
        this.showSuccessMessage('Membre restauré avec succès');
        this.showSuccessMessage('Email envoyé au membre');
        this.loadMembers();
      },
      error: (error: Error) => {
        this.showErrorMessage('Erreur lors de la restauration du membre');
        console.error(error);
      }
    });
  }

  formatCompanyName(companyName: string | undefined): string {
    return companyName?.trim() ? companyName : 'Cliquez sur éditer pour ajouter une entreprise';
  }

  showErrorMessage(message: string) {
    this.notificationService.error(message);
  }

  showSuccessMessage(message: string) {
    this.notificationService.success(message);
  }
} 