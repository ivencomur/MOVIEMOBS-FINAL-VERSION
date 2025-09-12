/**
 * Component for managing the user's profile.
 */
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../../services/fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ],
  template: `
    <mat-card>
      <mat-card-title>Your Profile</mat-card-title>
      <mat-card-content>
        <form (ngSubmit)="updateUser()">
          <mat-form-field appearance="fill">
            <mat-label>Username</mat-label>
            <input matInput [(ngModel)]="userData.Username" name="Username" required>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput [(ngModel)]="userData.Password" name="Password" type="password">
            <mat-hint>Leave blank to keep current password</mat-hint>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="userData.Email" name="Email" type="email" required>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Birthday</mat-label>
            <input matInput [(ngModel)]="userData.Birthday" name="Birthday" type="date">
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit">Update Profile</button>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="warn" (click)="deleteUser()">Delete Account</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 500px;
      margin: 20px auto;
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class UserProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @param fetchApiData Service for API calls.
   * @param snackBar Service for showing notifications.
   * @param router Service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetches the current user's data to populate the form.
   */
  getUser(): void {
    this.fetchApiData.getUserProfile().subscribe({
      next: (result: any) => {
        const formattedBirthday = result.Birthday ? new Date(result.Birthday).toISOString().split('T')[0] : '';
        this.userData = { ...result, Birthday: formattedBirthday, Password: '' };
      },
      error: (error: any) => {
        this.snackBar.open('Could not load profile.', 'OK', { duration: 4000 });
      }
    });
  }

  /**
   * Updates the user's profile information.
   */
  updateUser(): void {
    // Create a new object for the update payload
    const updatePayload: any = {
      Username: this.userData.Username,
      Email: this.userData.Email,
      Birthday: this.userData.Birthday
    };

    // Only include the password if the user has entered a new one
    if (this.userData.Password) {
      updatePayload.Password = this.userData.Password;
    }

    this.fetchApiData.editUserProfile(updatePayload).subscribe({
      next: (result: any) => {
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000
        });
        localStorage.setItem('user', JSON.stringify(result));
      },
      error: (error: any) => {
        this.snackBar.open('Failed to update profile. Please try again.', 'OK', {
          duration: 4000
        });
      }
    });
  }

  /**
   * Deletes the user's account.
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUserProfile().subscribe({
        next: (result: any) => {
          this.snackBar.open('Account deleted successfully.', 'OK', {
            duration: 2000
          });
          localStorage.clear();
          this.router.navigate(['welcome']);
        },
        error: (error: any) => {
          this.snackBar.open('Failed to delete account. Please try again.', 'OK', {
            duration: 4000
          });
        }
      });
    }
  }
}