/**
 * Component for displaying all movies as cards.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../../services/fetch-api-data.service';
import { GenreDialogComponent } from '../dialogs/genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../dialogs/director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../dialogs/synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="movies-container">
      <h1>Movies</h1>
      <div class="movies-grid">
        <mat-card *ngFor="let movie of movies" class="movie-card">
          <mat-card-header>
            <mat-card-title>{{ movie.Title }}</mat-card-title>
          </mat-card-header>
          
          <img mat-card-image 
               [src]="movie.ImagePath || 'assets/no-image.png'" 
               [alt]="movie.Title"
               class="movie-image">
          
          <mat-card-content>
            <p>{{ movie.Description | slice:0:100 }}{{ movie.Description?.length > 100 ? '...' : '' }}</p>
            <p><strong>Genre:</strong> {{ movie.Genre?.name }}</p>
            <p><strong>Director:</strong> {{ movie.Director?.name }}</p>
            <p><strong>Year:</strong> {{ movie.ReleaseYear }}</p>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-button (click)="openGenreDialog(movie.Genre)">Genre</button>
            <button mat-button (click)="openDirectorDialog(movie.Director)">Director</button>
            <button mat-button (click)="openSynopsisDialog(movie)">Synopsis</button>
            
            <button mat-icon-button 
                    [color]="isFavorite(movie._id) ? 'warn' : 'primary'"
                    (click)="toggleFavorite(movie._id)"
                    [attr.aria-label]="isFavorite(movie._id) ? 'Remove from favorites' : 'Add to favorites'">
              <mat-icon>{{ isFavorite(movie._id) ? 'favorite' : 'favorite_border' }}</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .movies-container {
      padding: 20px;
    }
    .movies-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      padding: 20px;
    }
    .movie-card {
      max-width: 300px;
      margin: 10px;
    }
    .movie-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
    mat-card-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  `]
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: string[] = [];

  /**
   * @param fetchApiData Service for API calls.
   * @param dialog Service for opening dialogs.
   * @param snackBar Service for showing notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that runs when the component is initialized.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Fetches all movies from the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => {
        this.movies = resp;
      },
      error: (error: any) => {
        console.error('Error loading movies:', error);
        this.snackBar.open('Error loading movies. Please try again.', 'OK', {
          duration: 4000
        });
      }
    });
  }

  /**
   * Fetches the user's favorite movies.
   */
  getFavorites(): void {
    this.fetchApiData.getUserProfile().subscribe({
      next: (resp: any) => {
        this.favoriteMovies = resp.favoriteMovies ? resp.favoriteMovies.map((movie: any) => movie._id || movie) : [];
      },
      error: (error: any) => {
        console.error('Error loading favorites:', error);
      }
    });
  }

  /**
   * Checks if a movie is in the user's list of favorites.
   * @param movieId - The ID of the movie to check.
   * @returns True if the movie is a favorite, false otherwise.
   */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * Toggles a movie's favorite status (adds or removes it).
   * @param movieId - The ID of the movie to toggle.
   */
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.removeFavoriteMovie(movieId).subscribe({
        next: (resp: any) => {
          this.favoriteMovies = resp.favoriteMovies ? resp.favoriteMovies.map((movie: any) => movie._id || movie) : [];
          this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
        },
        error: (error: any) => {
          this.snackBar.open('Error removing favorite. Please try again.', 'OK', { duration: 4000 });
        }
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe({
        next: (resp: any) => {
          this.favoriteMovies = resp.favoriteMovies ? resp.favoriteMovies.map((movie: any) => movie._id || movie) : [];
          this.snackBar.open('Movie added to favorites', 'OK', { duration: 2000 });
        },
        error: (error: any) => {
          this.snackBar.open('Error adding favorite. Please try again.', 'OK', { duration: 4000 });
        }
      });
    }
  }

  /**
   * Opens a dialog with details about a movie's genre.
   * @param genre - The genre object.
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: genre || { name: 'Unknown Genre', description: 'No description available.' },
      width: '400px'
    });
  }

  /**
   * Opens a dialog with details about a movie's director.
   * @param director - The director object.
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: director || { name: 'Unknown Director', bio: 'No biography available.' },
      width: '400px'
    });
  }

  /**
   * Opens a dialog with the movie's synopsis.
   * @param movie - The movie object.
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: movie || { Title: 'Unknown Movie', Description: 'No synopsis available.' },
      width: '500px'
    });
  }
}