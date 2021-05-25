import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from "../component/snackbar/snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiCall = 0;
  apiResponse = 0;
  backGroundApi = false;
  redirectUrl = "";
  spinner = false;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) {
  }

  showSpinner(): void {
    this.spinner = true;
  }

  hideSpinner(): void {
    this.spinner = false;
  }

  openSnackbar(message: string, type: string): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      data: { message: message, snackType: type },
    });
  }

  closeSnackbar(): void {
    this.snackbar.dismiss();
  }

  checkBackgroundApi(): void {
    if (this.backGroundApi === true) {
      this.backGroundApi = false;
    }
  }

  resetApiCount(): void {
    this.apiCall = 0;
    this.apiResponse = 0;
  }
}


