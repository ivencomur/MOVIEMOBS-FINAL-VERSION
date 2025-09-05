import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// API URL - matching your backend
const API_URL = 'https://iecm-movies-app-6966360ed90e.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // Helper to get stored token
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Helper to create headers with authentication
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }

  // User registration - matches your backend /users endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log('Registration data being sent:', userDetails);
    return this.http.post(API_URL + 'users', userDetails, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // User login - matches your backend /login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log('Login data being sent:', userDetails);
    return this.http.post(API_URL + 'login', userDetails, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies - matches your backend /movies endpoint
  public getAllMovies(): Observable<any> {
    return this.http.get(API_URL + 'movies', { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get user profile - matches your backend /user endpoint (fixed from /users/:username)
  public getUserProfile(): Observable<any> {
    console.log('Calling getUserProfile - should go to /user endpoint');
    return this.http.get(`${API_URL}user`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Add favorite movie - matches your backend /user/favorites/:movieId endpoint
  public addFavoriteMovie(movieId: string): Observable<any> {
    console.log('Adding favorite movie:', movieId);
    return this.http.post(`${API_URL}user/favorites/${movieId}`, {}, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Remove favorite movie - matches your backend /user/favorites/:movieId endpoint
  public removeFavoriteMovie(movieId: string): Observable<any> {
    console.log('Removing favorite movie:', movieId);
    return this.http.delete(`${API_URL}user/favorites/${movieId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get movie details - matches your backend /movies/:movieId endpoint
  public getMovie(movieId: string): Observable<any> {
    return this.http.get(`${API_URL}movies/${movieId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get director info - matches your backend /directors/:directorId endpoint
  public getDirector(directorId: string): Observable<any> {
    return this.http.get(`${API_URL}directors/${directorId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get genre info - matches your backend /genres/:name endpoint
  public getGenre(genreName: string): Observable<any> {
    return this.http.get(`${API_URL}genres/${genreName}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Update user profile - matches your backend /user endpoint
  public editUser(updatedUser: any): Observable<any> {
    return this.http.put(`${API_URL}user`, updatedUser, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete user - matches your backend /user endpoint
  public deleteUser(): Observable<any> {
    return this.http.delete(`${API_URL}user`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        errorMessage = 'Invalid credentials or session expired. Please log in again.';
        // Clear invalid auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } else if (error.status === 403) {
        errorMessage = 'Access forbidden. You do not have permission.';
      } else if (error.status === 404) {
        errorMessage = 'Requested resource not found.';
      } else if (error.status === 400) {
        if (error.error && error.error.errors && Array.isArray(error.error.errors)) {
          // Handle validation errors
          const validationErrors = error.error.errors.map((err: any) => err.msg).join(', ');
          errorMessage = `Validation error: ${validationErrors}`;
        } else if (error.error && error.error.error) {
          errorMessage = error.error.error;
        } else {
          errorMessage = 'Bad request. Please check your input.';
        }
      } else if (error.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    }
    
    console.error('Processed error message:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
