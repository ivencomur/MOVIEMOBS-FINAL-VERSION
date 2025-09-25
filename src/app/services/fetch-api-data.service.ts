import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Helper function to get the username from localStorage
  private getUsername(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).Username || JSON.parse(user).username : null;
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
    const backendUserData = {
      Username: userDetails.username,
      Password: userDetails.password,
      Email: userDetails.email,
      Birthday: userDetails.birthday
    };
    
    return this.http.post(`${this.API_URL}/users`, backendUserData, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, userDetails, { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getAllMovies(): Observable<any> {
    return this.http.get(`${this.API_URL}/movies`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Updated to use the new /user endpoint instead of /users/:username
  public getUserProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/user`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError((error) => {
        // If /user endpoint fails, fall back to the legacy endpoint
        if (error.status === 404) {
          const username = this.getUsername();
          if (username) {
            return this.http.get(`${this.API_URL}/users/${username}`, { 
              headers: this.getHeaders() 
            }).pipe(catchError(this.handleError));
          }
        }
        return this.handleError(error);
      })
    );
  }

  // Updated to use the new /user/favorites endpoint
  public addFavoriteMovie(movieId: string): Observable<any> {
    return this.http.post(`${this.API_URL}/user/favorites/${movieId}`, {}, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError((error) => {
        // If /user endpoint fails, fall back to the legacy endpoint
        if (error.status === 404) {
          const username = this.getUsername();
          if (username) {
            return this.http.post(`${this.API_URL}/users/${username}/movies/${movieId}`, {}, { 
              headers: this.getHeaders() 
            }).pipe(catchError(this.handleError));
          }
        }
        return this.handleError(error);
      })
    );
  }

  // Updated to use the new /user/favorites endpoint
  public removeFavoriteMovie(movieId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/user/favorites/${movieId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError((error) => {
        // If /user endpoint fails, fall back to the legacy endpoint
        if (error.status === 404) {
          const username = this.getUsername();
          if (username) {
            return this.http.delete(`${this.API_URL}/users/${username}/movies/${movieId}`, { 
              headers: this.getHeaders() 
            }).pipe(catchError(this.handleError));
          }
        }
        return this.handleError(error);
      })
    );
  }

  public getMovie(movieId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/movies/${movieId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getDirector(directorName: string): Observable<any> {
    return this.http.get(`${this.API_URL}/directors/${directorName}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getGenre(genreName: string): Observable<any> {
    return this.http.get(`${this.API_URL}/genres/${genreName}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Updated to use the new /user endpoint
  public editUser(updatedUser: any): Observable<any> {
    return this.http.put(`${this.API_URL}/user`, updatedUser, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError((error) => {
        // If /user endpoint fails, fall back to the legacy endpoint
        if (error.status === 404) {
          const username = this.getUsername();
          if (username) {
            return this.http.put(`${this.API_URL}/users/${username}`, updatedUser, { 
              headers: this.getHeaders() 
            }).pipe(catchError(this.handleError));
          }
        }
        return this.handleError(error);
      })
    );
  }

  // Updated to use the new /user endpoint
  public deleteUser(): Observable<any> {
    return this.http.delete(`${this.API_URL}/user`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError((error) => {
        // If /user endpoint fails, fall back to the legacy endpoint
        if (error.status === 404) {
          const username = this.getUsername();
          if (username) {
            return this.http.delete(`${this.API_URL}/users/${username}`, { 
              headers: this.getHeaders() 
            }).pipe(catchError(this.handleError));
          }
        }
        return this.handleError(error);
      })
    );
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred!';
    
    console.log('HTTP Error Details:', {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      message: error.message,
      error: error.error
    });
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = 'Cannot connect to the API server. Please check if the backend is running and CORS is configured correctly.';
      } else if (error.status === 401) {
        errorMessage = 'Invalid credentials or session expired. Please log in again.';
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } else if (error.status === 404) {
        errorMessage = 'Requested resource not found.';
      } else if (error.status === 422) {
        errorMessage = error.error?.errors?.[0]?.msg || 'Validation error occurred.';
      } else {
        errorMessage = error.error?.message || `Server error: ${error.status} ${error.statusText}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}