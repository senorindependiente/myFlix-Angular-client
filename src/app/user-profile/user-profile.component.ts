import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  username: any = localStorage.getItem('user');
  favoriteMovies: any[] = [];
  displayElement: boolean = false

  @Input() userData = { 
    Username: this.user.Username, 
    Email: this.user.Email, 
    Password: '', 
    Birthdate: this.user.Birthdate
  };

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
 
  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
    console.log(this.userData);
  }

    /**
   * calls API endpoint to get user info
   * @function getUserProfile
   * @param user
   * @return user data in JSON format
   */

  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUserProfile().subscribe((response: any) => {
        this.user = response;
        console.log(this.user);
        return this.user;
      });
    }
  }
/**
   * edits user info from profile page
   * @function editUserProfile
   */
  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUserProfile(this.userData).subscribe((resp) => {
      localStorage.setItem('user', JSON.stringify(resp));// update profile in localstorage
      this.snackBar.open('Your profile was updated successfully!', 'OK', {
        duration: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

 /**
   * deletes user account when on profile page
   * @function deleteUserProfile
   */
  deleteUser(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        this.snackBar.open(`${this.user.Username} has been removed!`, 'OK', {
          duration: 4000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }
  /**
   * function to let the user remove a movie from their favorited movies
   * @function removeFavoriteMovie
   */
  removeFavoriteMovie(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `Removed from your favourites!`,
        'OK',
        {
          duration: 3000,
        });
        this.ngOnInit();
      });
    }
/**
     * function to let the user display their favorited movies 
     * @function getAllMovies
     */ 
    getFavorites(): void {
      let movies: any[] = [];
      this.fetchApiData.getAllMovies().subscribe((res: any) => {
        this.movies = res;
        this.movies.forEach((movie: any) => {
          if (this.user.FavoriteMovie.includes(movie._id)) {
            this.favoriteMovies.push(movie);
            this.displayElement = true;
          }
          });
        
      });
      console.log(this.favoriteMovies);
     
    }

 
}