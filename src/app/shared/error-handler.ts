

import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { CommonService } from './services/common.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(public commonService: CommonService) { }

   handleError(err: any) {
    console.log(err);
    this.commonService.openSnackbar(err,'warning');
    if (err.error instanceof ErrorEvent) {

    } else {
      if (err.error.message) {
        console.log(err);
        if (err.error.message !== 'No Result Found'  && err.error.message !== 'Not Found' ) {
          if (err.error.validations) {
            this.commonService.openSnackbar(err.error.validations[0], 'Warning');
          } else {
            this.commonService.openSnackbar(err.error.message, 'Warning');
          }
        }
      } else if (err.error.tMessage) {
        console.log(err.error.tMessage);
            this.commonService.openSnackbar(err.error.tMessage, 'Warning');
          } else {
            this.commonService.openSnackbar('Something went wrong', 'Warning');
          }
      console.log('server side error', err.error);
    }
 return throwError('Something Went Wrong');
  }
}
