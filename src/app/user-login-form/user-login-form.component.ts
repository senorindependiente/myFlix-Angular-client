import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { Username: '', Password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

ngOnInit(): void {
}


// transfering the user data input to the server-side storage (database)
loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((result) => {
      localStorage.setItem("user", result.user.Username);
      localStorage.setItem("token", result.token);
     this.dialogRef.close();
     console.log(result);
     this.snackBar.open("user logged in", "OK", {
        duration: 2000
     });
     this.router.navigate(["movies"]); //when user login successfully, navigate to the movielist
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    });
  }

  }