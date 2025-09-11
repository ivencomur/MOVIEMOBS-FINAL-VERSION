import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../../services/fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
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
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form>
          <mat-form-field appearance="fill">
            <mat-label>Username</mat-label>
            <input matInput [(ngModel)]="loginData.username" name="username" required>
          </mat-form-field>
          
          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput type="password" [(ngModel)]="loginData.password" name="password" required>
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="loginUser()">Login</button>
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
export class UserLoginFormComponent {
  @Input() loginData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  loginUser(): void {
    const cleanedData = {
      username: this.loginData.username.trim(),
      password: this.loginData.password
    };
    
    this.fetchApiData.userLogin(cleanedData).subscribe({
      next: (result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000
        });
        
        this.dialogRef.close();
        
        setTimeout(() => {
          this.router.navigate(['movies']);
        }, 100);
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Login failed. Please check your credentials.', 'OK', {
          duration: 4000
        });
      }
    });
  }
}
