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

  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) {
  }

  showSpinner() {
    // this.settings.loadingSpinner = true;
  }

  hideSpinner() {
    // this.settings.loadingSpinner = false;
  }

  openSnackbar(message: string, type: string) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      data: { message: message, snackType: type },
    });
  }

  closeSnackbar() {
    this.snackbar.dismiss();
  }

  checkBackgroundApi() {
    if (this.backGroundApi === true) {
      this.backGroundApi = false;
    }
  }


  resetApiCount() {
    this.apiCall = 0;
    this.apiResponse = 0;
  }


  checkForMobileView(): boolean {
    if (window.innerWidth <= 600) {
      return true;
    } else {
      return false;
    }
  }

}


