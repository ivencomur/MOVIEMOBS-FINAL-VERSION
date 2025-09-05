import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <span>MovieMobs</span>
      <span class="spacer"></span>
      <div *ngIf="isLoggedIn()">
        <button mat-button (click)="goToMovies()">
          <mat-icon>movie</mat-icon>
          Movies
        </button>
        <button mat-button (click)="goToProfile()">
          <mat-icon>person</mat-icon>
          Profile
        </button>
        <button mat-button (click)="logout()">
          <mat-icon>logout</mat-icon>
          Logout
        </button>
      </div>
      <div *ngIf="!isLoggedIn()">
        <button mat-button (click)="goToWelcome()">
          <mat-icon>home</mat-icon>
          Home
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    button {
      margin-left: 8px;
    }
  `]
})
export class NavBarComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  goToWelcome(): void {
    this.router.navigate(['welcome']);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['welcome']);
  }
}
