import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movieapiapp.herokuapp.com';
//get the token from local storage
const token = localStorage.getItem('token');
// Get username from localStorage for URLs
const username = localStorage.getItem('username');

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient, private router: Router) {}

  //Registration of users
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Login of users
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // user get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // user get a single movie details
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:movieId', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // user get director details
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // user get genre details
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // user get their favorite movies
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Add a movie to user favs
  addFavoriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .post(apiUrl + `users/${username}/movies/${id}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // user can remove favorite movies from his list
  deleteFavoriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // user get their profile information
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // user update his profile
  editUserProfile(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // user can delete his profile
  public deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // response of the data extraction
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  // function to handle errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something went wrong; please try again later.');
  }
}
