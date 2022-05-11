import { DirectorCardComponent } from './../director-card/director-card.component';
import { GenreCardComponent } from './../genre-card/genre-card.component';
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any [] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

ngOnInit(): void {
  this.getMovies();
  this.getCurrentUser();
}

 /**
   * function to show all movies
   * @function getMovies
   * @returns movies in JSON format
   */

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * open Director dialog
   * @param name 
   * @param bio 
   * @param birth
   */
getDirector(name: string, bio: string, birth: string): void {
  this.dialog.open(DirectorCardComponent, {
    data: {
      Name: name,
      Bio: bio,
      Birth: birth,
    },
    width: '500px',
   });
  }
  /**
   * open Genre dialog
   * @param name 
   * @param description 
   */
getGenre(name: string, description: string): void {
  this.dialog.open(GenreCardComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '500px'
    });
  }
/**
   * open movie details dialog
   * @param title 
   * @param imagePath
   * @param description 
   */
getDetails(title: string, imagePath: any, description: string): void {
  this.dialog.open(DetailsComponent, {
    data: {
      Title: title,
      ImagePath: imagePath,
      Description: description,
    },
    width: '500px'
   });
  }
/**
 * function to get current users information and log it to the console
 * @function getUserProfile
 */
getCurrentUser(): void {
  const username = localStorage.getItem('user');
  this.fetchApiData.getUserProfile().subscribe((resp: any) => { 
      console.log(resp)
      const currentUser=resp.Username
      console.log(currentUser)
      const currentFavs=resp.FavoriteMovies
      console.log(currentFavs)
    });
  }
/**
 * function to let user add a movie to their favorite movies
 * @function addFavoriteMovies
 * @param id
 * @param title 
 * @returns movie object array in JSON format
 */
addFavoriteMovie(id: string, title: string): void {
  this.fetchApiData.addFavoriteMovie(id).subscribe((resp: any) => {
    this.snackBar.open(`${title} has been added to your favourites!`, 'OK', {
      duration: 3000,
      });
    this.ngOnInit();
    });
  }
  /**
   * function to let user remove a movie from their favorite movies
   * @function deleteFavoriteMovie
   * @param id
   * @param title 
   * @returns updated users' fav movies in JSON format
   */
removeFavoriteMovie(id: string, title: string): void {
  this.fetchApiData.deleteFavoriteMovie(id).subscribe((resp: any) => {
    console.log(resp);
    this.snackBar.open(
      `${title} has been removed from your favourites!`,
      'OK',
      {
        duration: 3000,
      });
      this.ngOnInit();
    });
  }
}
