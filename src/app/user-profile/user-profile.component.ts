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
  userString: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userString);

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
    this.getUserProfile();
    console.log(this.userData);
  }


   
  getUserProfile(): void {
    const UserID = localStorage.getItem('UserID');
    if (UserID) {
      this.fetchApiData.getUserProfile().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }
   
 
  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUserProfile(this.userData).subscribe((resp) => {
      localStorage.setItem('user', JSON.stringify(resp));// update profile in localstorage
      this.snackBar.open('Your profile was updated', 'OK', {
        duration: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  

  deleteUser(): void {
    if (confirm('Are you sure you want to delete the profile?')) {
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        this.snackBar.open(`${this.user.Username} has been deleted`, 'OK', {
          duration: 4000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }

 
}