import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Base API URL for MovieMobs backend service
 * @constant API_URL
 */
const API_URL = 'http://localhost:8080/';

/**
 * Service for handling all API data operations
 * 
 * This service provides methods for:
 * - User authentication (registration and login)
 * - Movie data retrieval
 * - User profile management
 * - Favorite movies management
 * 
 * @class FetchApiDataService
 * @Injectable Service that can be injected into components
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   * Constructor for FetchApiDataService
   * @param http Angular HttpClient for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves JWT authentication token from localStorage
   * @private
   * @returns The stored JWT token or null if not found
   */
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Creates HTTP headers with authentication token and content type
   * @private
   * @returns HttpHeaders object with Content-Type and Authorization headers
   */
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

  /**
   * Registers a new user account
   * @param userDetails Object containing user registration information
   * @param userDetails.username User's chosen username (min 5 chars)
   * @param userDetails.password User's password
   * @param userDetails.email User's email address
   * @param userDetails.birthday User's birthday (optional)
   * @returns Observable containing the registration response
   * @example
   * ```typescript
   * const userData = {
   *   username: 'johndoe',
   *   password: 'securepassword',
   *   email: 'john@example.com',
   *   birthday: '1990-01-01'
   * };
   * this.fetchApiData.userRegistration(userData).subscribe(response => {
   *   console.log('User registered successfully');
   * });
   * ```
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log('Registration data being sent:', userDetails);
    // Transform to match backend expectations
    const backendUserData = {
      Username: userDetails.username,
      Password: userDetails.password,
      Email: userDetails.email,
      Birthday: userDetails.birthday
    };
    
    return this.http.post(API_URL + 'users', backendUserData, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Authenticates user login credentials
   * @param userDetails Object containing login credentials
   * @param userDetails.username User's username
   * @param userDetails.password User's password
   * @returns Observable containing login response with user data and JWT token
   * @example
   * ```typescript
   * const loginData = { username: 'johndoe', password: 'securepassword' };
   * this.fetchApiData.userLogin(loginData).subscribe(response => {
   *   localStorage.setItem('token', response.token);
   *   localStorage.setItem('user', JSON.stringify(response.user));
   * });
   * ```
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log('Login data being sent:', userDetails);
    return this.http.post(API_URL + 'login', userDetails, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all movies from the API with populated genre, director, and actors
   * @returns Observable containing array of movie objects
   * @requires Valid JWT token for authentication
   * @example
   * ```typescript
   * this.fetchApiData.getAllMovies().subscribe(movies => {
   *   this.movies = movies;
   *   console.log('Loaded movies:', movies.length);
   * });
   * ```
   */
  public getAllMovies(): Observable<any> {
    return this.http.get(API_URL + 'movies', { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves the authenticated user's profile information
   * @returns Observable containing user profile data with favorite movies
   * @requires Valid JWT token for authentication
   * @example
   * ```typescript
   * this.fetchApiData.getUserProfile().subscribe(user => {
   *   this.userProfile = user;
   *   this.favoriteMovies = user.FavoriteMovies || [];
   * });
   * ```
   */
  public getUserProfile(): Observable<any> {
    console.log('Calling getUserProfile - should go to /user endpoint');
    return this.http.get(`${API_URL}user`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to the user's favorites list
   * @param movieId The ID of the movie to add to favorites
   * @returns Observable containing updated user object with new favorite
   * @requires Valid JWT token for authentication
   * @example
   * ```typescript
   * this.fetchApiData.addFavoriteMovie('60d21b4667d0d8992e610c85').subscribe(updatedUser => {
   *   this.favoriteMovies = updatedUser.FavoriteMovies;
   *   console.log('Movie added to favorites');
   * });
   * ```
   */
  public addFavoriteMovie(movieId: string): Observable<any> {
    console.log('Adding favorite movie:', movieId);
    return this.http.post(`${API_URL}user/favorites/${movieId}`, {}, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Removes a movie from the user's favorites list
   * @param movieId The ID of the movie to remove from favorites
   * @returns Observable containing updated user object without the favorite
   * @requires Valid JWT token for authentication
   * @example
   * ```typescript
   * this.fetchApiData.removeFavoriteMovie('60d21b4667d0d8992e610c85').subscribe(updatedUser => {
   *   this.favoriteMovies = updatedUser.FavoriteMovies;
   *   console.log('Movie removed from favorites');
   * });
   * ```
   */
  public removeFavoriteMovie(movieId: string): Observable<any> {
    console.log('Removing favorite movie:', movieId);
    return this.http.delete(`${API_URL}user/favorites/${movieId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single movie by its ID
   * @param movieId The ID of the movie to retrieve
   * @returns Observable containing the movie object
   * @requires Valid JWT token for authentication
   */
  public getMovie(movieId: string): Observable<any> {
    return this.http.get(`${API_URL}movies/${movieId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves director information by name
   * @param directorName The name of the director
   * @returns Observable containing director information
   * @requires Valid JWT token for authentication
   */
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(`${API_URL}directors/${directorName}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves genre information by name
   * @param genreName The name of the genre
   * @returns Observable containing genre information
   * @requires Valid JWT token for authentication
   */
  public getGenre(genreName: string): Observable<any> {
    return this.http.get(`${API_URL}genres/${genreName}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Updates the authenticated user's profile information
   * @param updatedUser Object containing updated user data
   * @returns Observable containing updated user profile
   * @requires Valid JWT token for authentication
   * @example
   * ```typescript
   * const updatedData = { username: 'newusername', email: 'newemail@example.com' };
   * this.fetchApiData.editUser(updatedData).subscribe(updatedUser => {
   *   console.log('Profile updated successfully');
   * });
   * ```
   */
  public editUser(updatedUser: any): Observable<any> {
    return this.http.put(`${API_URL}user`, updatedUser, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes the authenticated user's account
   * @returns Observable containing deletion confirmation
   * @requires Valid JWT token for authentication
   * @warning This action is irreversible and will permanently delete the user account
   */
  public deleteUser(): Observable<any> {
    return this.http.delete(`${API_URL}user`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP error responses and formats user-friendly error messages
   * @private
   * @param error HttpErrorResponse object containing error details
   * @returns Observable that throws a formatted error message
   * @description Processes different types of HTTP errors and returns appropriate messages
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = 'Cannot connect to the API server. Please ensure the backend is running.';
      } else if (error.status === 401) {
        errorMessage = 'Invalid credentials or session expired. Please log in again.';
      } else if (error.status === 404) {
        errorMessage = 'Requested resource not found.';
      } else {
        errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
      }
    }
    
    console.error('Processed error message:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}