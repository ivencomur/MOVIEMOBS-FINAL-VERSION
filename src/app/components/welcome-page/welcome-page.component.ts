import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <div class="welcome-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Welcome to MovieMobs!</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Discover and manage your favorite movies</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="openUserRegistrationDialog()">
            Sign Up
          </button>
          <button mat-raised-button color="accent" (click)="openUserLoginDialog()">
            Login
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .welcome-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    mat-card {
      max-width: 400px;
      text-align: center;
    }
    mat-card-actions {
      display: flex;
      justify-content: space-around;
      padding: 16px;
    }
  `]
})
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '400px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '400px'
    });
  }
}
