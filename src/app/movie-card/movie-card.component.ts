import { DirectorCardComponent } from './../director-card/director-card.component';
import { GenreCardComponent } from './../genre-card/genre-card.component';
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


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

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

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

getGenre(name: string, description: string): void {
  this.dialog.open(GenreCardComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '500px'
    });
  }

// getDetails(title: string, imagePath: any, description: string): void {
//   this.dialog.open(DetailsCardComponent, {
//     data: {
//       Title: title,
//       ImagePath: imagePath,
//       Description: description,
//     },
//     width: '500px'
//    });
//   }

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

addFavoriteMovie(id: string, title: string): void {
  this.fetchApiData.addFavoriteMovie(id).subscribe((resp: any) => {
    this.snackBar.open(`${title} has been added to your favourites!`, 'OK', {
      duration: 3000,
      });
    this.ngOnInit();
    });
  }

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
