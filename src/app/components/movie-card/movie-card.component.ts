import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../../services/fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../dialogs/genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../dialogs/director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../dialogs/synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: string[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    // The getUserProfile method returns the full user object including favorites
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      // Ensure FavoriteMovies exists before assigning
      this.favoriteMovies = resp.FavoriteMovies ? resp.FavoriteMovies.map((movie: any) => movie._id) : [];
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.removeFavoriteMovie(movieId).subscribe(() => {
        this.snackBar.open('Removed from favorites', 'OK', { duration: 2000 });
        this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
        this.snackBar.open('Added to favorites', 'OK', { duration: 2000 });
        this.favoriteMovies.push(movieId);
      });
    }
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: genre.Name,
        Description: genre.Description
      }
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: director.Name,
        Bio: director.Bio
      }
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        Title: movie.Title,
        Description: movie.Description
      }
    });
  }
}
