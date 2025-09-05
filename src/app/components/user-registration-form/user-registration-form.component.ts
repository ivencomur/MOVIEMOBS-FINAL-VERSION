import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../../services/fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
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
    <mat-card>
      <mat-card-header>
        <mat-card-title>Sign Up</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form>
          <mat-form-field appearance="fill">
            <mat-label>Username</mat-label>
            <input matInput [(ngModel)]="userData.username" name="username" required minlength="5">
          </mat-form-field>
          
          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput type="password" [(ngModel)]="userData.password" name="password" required minlength="8">
          </mat-form-field>
          
          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput type="email" [(ngModel)]="userData.email" name="email" required>
          </mat-form-field>
          
          <mat-form-field appearance="fill">
            <mat-label>Birthday</mat-label>
            <input matInput type="date" [(ngModel)]="userData.birthday" name="birthday">
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="registerUser()">Sign Up</button>
        <button mat-button (click)="dialogRef.close()">Cancel</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    mat-card-actions {
      display: flex;
      justify-content: space-between;
    }
  `]
})
export class UserRegistrationFormComponent {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  registerUser(): void {
    const cleanedData = {
      username: this.userData.username.trim(),
      password: this.userData.password,
      email: this.userData.email.trim().toLowerCase(),
      birthday: this.userData.birthday || undefined
    };

    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key as keyof typeof cleanedData] === undefined) {
        delete cleanedData[key as keyof typeof cleanedData];
      }
    });

    this.fetchApiData.userRegistration(cleanedData).subscribe({
      next: (result) => {
        this.snackBar.open('User registration successful! Please log in.', 'OK', {
          duration: 4000
        });
        this.dialogRef.close();
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Registration failed. Please try again.', 'OK', {
          duration: 4000
        });
      }
    });
  }
}
