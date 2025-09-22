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
      <div class="movies-grid" *ngIf="movies.length > 0">
        <mat-card *ngFor="let movie of movies" class="movie-card">
          <mat-card-header>
            <mat-card-title>{{ movie.Title }}</mat-card-title>
          </mat-card-header>
          
          <img mat-card-image 
               [src]="getImagePath(movie)" 
               [alt]="movie.Title"
               class="movie-image"
               (error)="onImageError($event)">
          
          <mat-card-content>
            <p>{{ getDescription(movie) | slice:0:100 }}{{ (getDescription(movie) || '').length > 100 ? '...' : '' }}</p>
            <p><strong>Genre:</strong> {{ getGenreName(movie) }}</p>
            <p><strong>Director:</strong> {{ getDirectorName(movie) }}</p>
            <p><strong>Year:</strong> {{ movie.ReleaseYear || 'N/A' }}</p>
            <p *ngIf="movie.Rating"><strong>Rating:</strong> {{ movie.Rating }}/10</p>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-button (click)="openGenreDialog(movie)">Genre</button>
            <button mat-button (click)="openDirectorDialog(movie)">Director</button>
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
      
      <div *ngIf="movies.length === 0 && !isLoading" class="no-movies">
        <p>No movies found. Please check if the backend is running and contains movie data.</p>
      </div>
      
      <div *ngIf="isLoading" class="loading">
        <p>Loading movies...</p>
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
      transition: opacity 0.3s ease;
      background-color: #f0f0f0;
    }
    .movie-image.loading {
      opacity: 0.5;
    }
    mat-card-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    .no-movies, .loading {
      text-align: center;
      padding: 40px;
      font-size: 1.2rem;
    }
  `]
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: string[] = [];
  isLoading = true;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.isLoading = true;
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => {
        this.movies = resp;
        this.isLoading = false;
        console.log('Movies loaded:', this.movies);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error loading movies:', error);
        this.snackBar.open('Error loading movies. Please ensure the backend is running.', 'OK', {
          duration: 4000
        });
      }
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe({
      next: (resp: any) => {
        this.favoriteMovies = resp.FavoriteMovies ? resp.FavoriteMovies.map((movie: any) => movie._id || movie) : [];
        console.log('Favorites loaded:', this.favoriteMovies);
      },
      error: (error: any) => {
        console.error('Error loading favorites:', error);
      }
    });
  }

  // Helper methods to handle different data structures
  getImagePath(movie: any): string {
    return movie.ImagePath || movie.imagePath || 'assets/no-image.png';
  }

  getDescription(movie: any): string {
    return movie.Description || movie.description || 'No description available.';
  }

  getGenreName(movie: any): string {
    if (movie.Genre) {
      if (typeof movie.Genre === 'string') {
        return movie.Genre;
      } else if (movie.Genre.Name) {
        return movie.Genre.Name;
      } else if (movie.Genre.name) {
        return movie.Genre.name;
      }
    }
    return 'Unknown';
  }

  getDirectorName(movie: any): string {
    if (movie.Director) {
      if (typeof movie.Director === 'string') {
        return movie.Director;
      } else if (movie.Director.Name) {
        return movie.Director.Name;
      } else if (movie.Director.name) {
        return movie.Director.name;
      }
    }
    return 'Unknown';
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
        next: (resp: any) => {
          this.favoriteMovies = resp.FavoriteMovies ? resp.FavoriteMovies.map((movie: any) => movie._id || movie) : [];
          this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
        },
        error: (error: any) => {
          console.error('Error removing favorite:', error);
          this.snackBar.open('Error removing favorite. Please try again.', 'OK', { duration: 4000 });
        }
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe({
        next: (resp: any) => {
          this.favoriteMovies = resp.FavoriteMovies ? resp.FavoriteMovies.map((movie: any) => movie._id || movie) : [];
          this.snackBar.open('Movie added to favorites', 'OK', { duration: 2000 });
        },
        error: (error: any) => {
          console.error('Error adding favorite:', error);
          this.snackBar.open('Error adding favorite. Please try again.', 'OK', { duration: 4000 });
        }
      });
    }
  }

  onImageError(event: any): void {
    event.target.src = 'assets/no-image.png';
  }

  openGenreDialog(movie: any): void {
    const genreData = movie.Genre || { Name: 'Unknown Genre', Description: 'No description available.' };
    this.dialog.open(GenreDialogComponent, {
      data: genreData,
      width: '400px'
    });
  }

  openDirectorDialog(movie: any): void {
    const directorData = movie.Director || { Name: 'Unknown Director', Bio: 'No biography available.' };
    this.dialog.open(DirectorDialogComponent, {
      data: directorData,
      width: '400px'
    });
  }

  openSynopsisDialog(movie: any): void {
    const synopsisData = {
      Title: movie.Title || 'Unknown Movie',
      Description: this.getDescription(movie),
      Genre: { name: this.getGenreName(movie) },
      Director: { name: this.getDirectorName(movie) },
      ReleaseYear: movie.ReleaseYear,
      Rating: movie.Rating
    };
    
    this.dialog.open(SynopsisDialogComponent, {
      data: synopsisData,
      width: '500px'
    });
  }
}