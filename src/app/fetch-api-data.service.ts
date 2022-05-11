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
const apiUrl = 'https://movieapiapp.herokuapp.com/';
//get the token from local storage
const token = localStorage.getItem('token');
// Get username from localStorage for URLs
const username = localStorage.getItem('username');

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient, private router: Router) {}

  
  /**
 * call API endpoint to register a new user
 * @function userRegistration
 * @param userDetails 
 * @returns a new user object in JSON format
 */


  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
/**
 * calls API endpoint for user login
 * @function userLogin
 * @param userDetails 
 * @returns a users' data in JSON format
 */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
 * calls API endpoint to get all movies
 * @function getAllMovies
 * @returns an array of the movies object in JSON format
 */
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

   /**
 * calls API endpoint for getting a single movie 
 * @function getSingleMovie
 * @returns a movie object in JSON format
 */
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

    /**
 * calls the API endpoint to get director info by his*her name
 * @function getDirector
 * @returns directors' data in JSON format
 */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /**
 * calls API endpoint to get Genre data by its name
 * @function getGenre
 * @returns genre data in JSON format
 */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
 * calls API endpoint to get a user's favorite movies
 * @function getFavoriteMovies
 * @returns a list of the users' favorite movies in JSON format
 */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
 * calls API endpooint to add a movie to a users' favorite movie list
 * @function addFavoriteMovies
 * @returns the updated users' favorite list in JSON format
 */
  addFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${id}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /**
 * calls API endpoint to delete a movie from the users' favorite list
 * @function deleteFavoriteMovie
 * @param id 
 * @returns updated user info after removing a favorite
 */
  deleteFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

 /**
 * calls API endpooint to get a users' data 
 * @function getUserProfile
 * @returns user data in JSON format
 */
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
 * calls API endpoint to edit user info
 * @function editUserProfile
 * @param userCredentials 
 * @param user
 * @returns updated user information in JSON format
 */
  editUserProfile(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

    /**
 * call API endpoint to delete a user
 * @function deleteUserProfile
 * @param user 
 * @returns delete status
 */
  public deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
 * Non-typed response extraction
  */
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

 /**
 * Error function at bottom to reduce repetition 
 * @function handleError
 * @param error 
 * @returns error
 */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something went wrong');
  }
}
