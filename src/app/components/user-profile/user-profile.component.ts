import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../../services/fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <div class="profile-container">
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>My Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form>
            <mat-form-field appearance="fill">
              <mat-label>Username</mat-label>
              <input matInput [(ngModel)]="updatedUserData.Username" name="Username" required>
            </mat-form-field>
            
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput type="email" [(ngModel)]="updatedUserData.Email" name="Email" required>
            </mat-form-field>
            
            <mat-form-field appearance="fill">
              <mat-label>Birthday</mat-label>
              <input matInput type="date" [(ngModel)]="updatedUserData.Birthday" name="Birthday">
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="updateUser()">Update Profile</button>
          <button mat-raised-button color="warn" (click)="deleteUser()">Delete Account</button>
        </mat-card-actions>
      </mat-card>

      <mat-card class="favorites-card" *ngIf="favoriteMovies.length > 0">
        <mat-card-header>
          <mat-card-title>Favorite Movies</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="favorites-grid">
            <div *ngFor="let movie of favoriteMovies" class="favorite-movie">
              <h4>{{ movie.Title }}</h4>
              <p>{{ movie.Genre?.Name }} • {{ movie.ReleaseYear }}</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      gap: 20px;
    }
    .profile-card, .favorites-card {
      max-width: 500px;
      width: 100%;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    mat-card-actions {
      display: flex;
      justify-content: space-between;
    }
    .favorites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    .favorite-movie {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .favorite-movie h4 {
      margin: 0 0 8px 0;
    }
    .favorite-movie p {
      margin: 0;
      color: #666;
    }
  `]
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  @Input() updatedUserData = { Username: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe({
      next: (resp: any) => {
        this.user = resp;
        this.favoriteMovies = resp.FavoriteMovies || [];
        
        // Pre-populate form with current user data
        this.updatedUserData = {
          Username: resp.Username || '',
          Email: resp.Email || '',
          Birthday: resp.Birthday ? resp.Birthday.split('T')[0] : ''
        };
        
        console.log('User profile loaded:', this.user);
      },
      error: (error: any) => {
        console.error('Error loading user profile:', error);
        this.snackBar.open('Error loading profile. Please try again.', 'OK', {
          duration: 4000
        });
      }
    });
  }

  updateUser(): void {
    // Clean data before sending
    const cleanedData = {
      Username: this.updatedUserData.Username.trim(),
      Email: this.updatedUserData.Email.trim().toLowerCase(),
      Birthday: this.updatedUserData.Birthday || undefined
    };

    // Remove undefined values
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key as keyof typeof cleanedData] === undefined) {
        delete cleanedData[key as keyof typeof cleanedData];
      }
    });

    this.fetchApiData.editUser(cleanedData).subscribe({
      next: (result) => {
        console.log('Profile updated successfully:', result);
        this.user = result;
        
        // Update stored user data
        localStorage.setItem('user', JSON.stringify(result));
        
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 3000
        });
      },
      error: (error: any) => {
        console.error('Error updating profile:', error);
        this.snackBar.open(error.message || 'Error updating profile. Please try again.', 'OK', {
          duration: 4000
        });
      }
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe({
        next: (result) => {
          console.log('Account deleted successfully:', result);
          this.snackBar.open('Account deleted successfully.', 'OK', {
            duration: 3000
          });
          
          // Clear storage and redirect
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['welcome']);
        },
        error: (error: any) => {
          console.error('Error deleting account:', error);
          this.snackBar.open(error.message || 'Error deleting account. Please try again.', 'OK', {
            duration: 4000
          });
        }
      });
    }
  }
}