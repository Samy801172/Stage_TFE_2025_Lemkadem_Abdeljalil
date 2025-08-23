import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="member-detail" *ngIf="member">
      <div class="profile-header">
        <img [src]="member.profilePicture || 'assets/default-avatar.png'" alt="Profile picture">
        <h2>{{member.firstName}} {{member.lastName}}</h2>
      </div>
      
      <div class="profile-info">
        <h3>Company Information</h3>
        <p><strong>Company:</strong> {{member.companyName}}</p>
        <p><strong>Sector:</strong> {{member.companySector}}</p>
        
        <h3>Bio</h3>
        <p>{{member.bio}}</p>
        
        <h3>Contact</h3>
        <p><strong>Email:</strong> {{member.email}}</p>
        <p *ngIf="member.linkedinUrl">
          <strong>LinkedIn:</strong> 
          <a [href]="member.linkedinUrl" target="_blank">{{member.linkedinUrl}}</a>
        </p>
        <p *ngIf="member.websiteUrl">
          <strong>Website:</strong> 
          <a [href]="member.websiteUrl" target="_blank">{{member.websiteUrl}}</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .member-detail {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .profile-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .profile-header img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1rem;
    }
    .profile-info h3 {
      margin-top: 2rem;
      color: #2c3e50;
    }
  `]
})
export class MemberDetailComponent implements OnInit {
  member?: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // TODO: Implement member fetching logic
    console.log('Fetching member with id:', id);
  }
} 