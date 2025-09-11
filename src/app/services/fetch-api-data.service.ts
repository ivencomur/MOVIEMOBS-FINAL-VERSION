import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// API URL updated to point to the local backend server for development
const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

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

  public userRegistration(userDetails: any): Observable<any> {
    console.log('Registration data being sent:', userDetails);
    return this.http.post(API_URL + 'users', userDetails, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log('Login data being sent:', userDetails);
    return this.http.post(API_URL + 'login', userDetails, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getAllMovies(): Observable<any> {
    return this.http.get(API_URL + 'movies', { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getUserProfile(): Observable<any> {
    console.log('Calling getUserProfile - should go to /user endpoint');
    return this.http.get(`${API_URL}user`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public addFavoriteMovie(movieId: string): Observable<any> {
    console.log('Adding favorite movie:', movieId);
    return this.http.post(`${API_URL}user/favorites/${movieId}`, {}, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public removeFavoriteMovie(movieId: string): Observable<any> {
    console.log('Removing favorite movie:', movieId);
    return this.http.delete(`${API_URL}user/favorites/${movieId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getMovie(movieId: string): Observable<any> {
    return this.http.get(`${API_URL}movies/${movieId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getDirector(directorName: string): Observable<any> {
    return this.http.get(`${API_URL}directors/${directorName}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getGenre(genreName: string): Observable<any> {
    return this.http.get(`${API_URL}genres/${genreName}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public editUser(updatedUser: any): Observable<any> {
    return this.http.put(`${API_URL}user`, updatedUser, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteUser(): Observable<any> {
    return this.http.delete(`${API_URL}user`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

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

