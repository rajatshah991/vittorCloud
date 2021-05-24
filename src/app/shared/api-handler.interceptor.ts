import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { switchMap, filter, take, tap } from 'rxjs/operators';
import { CommonService } from './services/common.service';
import { StorageService } from './services/storage.service';
import { AuthToken } from './bearer-token';


@Injectable()
export class ApiHandlerInterceptor implements HttpInterceptor {
  private isRefreshing = false;
 
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor( private commonService: CommonService,
     private routes: Router, private storageService: StorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getItem('token')
    if (token) {
      req = this.addToken(req, token);
    } else {
       this.commonService.showSpinner();
      this.commonService.apiCall += 1;
    }
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          this.commonService.apiResponse += 1;
          if (this.commonService.apiCall === this.commonService.apiResponse) {
            this.commonService.resetApiCount();
            this.commonService.checkBackgroundApi();
            this.commonService.hideSpinner();
          }
        
        }
      }),
      catchError((err: any) => {
        this.commonService.resetApiCount();
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            if (this.commonService.backGroundApi != true ) {
              this.commonService.showSpinner();
            } else {
              this.commonService.openSnackbar(err.error.message, 'Warning');
              this.routes.navigate(['/']);
            }
           
          } else {
            this.commonService.hideSpinner();
            try {
              if (err.error.message) {

                if (err.error.message !== 'No Result Found'  && err.error.message !== 'Not Found' && err.error.message.toLowerCase() !== 'invalid column name.' && err.error.message.toLowerCase() !== 'invalid column name' && err.error.message.toLowerCase() !== 'invalid columns in file.' && err.error.message !=='Validation error') {
                  if (err.error.validations) {
                    this.commonService.openSnackbar(err.error.validations[0], 'Warning');
                  } else {
                    this.commonService.openSnackbar(err.error.message, 'Warning');
                  }
                }
              } else if (err.error.tMessage) {
                this.commonService.openSnackbar(err.error.tMessage, 'Warning');
              } else {
                if (err.error.message !== 'No Result Found'  && err.error.message !== 'Not Found' && err.error.message.toLowerCase() !== 'invalid column name.' && err.error.message.toLowerCase() !== 'invalid column name' && err.error.message.toLowerCase() !== 'invalid columns in file.'  && err.error.message !=='Validation error') {
                this.commonService.openSnackbar('Something went wrong', 'Warning');
                }
              }
            } catch (e) {
              this.commonService.openSnackbar('An error occurred', 'Warning');
            }
          }
        }
        return throwError(err);
      })
    ) as any;
  }
  private addToken(request: HttpRequest<any>, token: string|AuthToken) {

    if (this.commonService.backGroundApi !== true) {
      this.commonService.showSpinner();
    }
    this.commonService.apiCall += 1;
    this.storageService.setItem('token', token);
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storageService.getItem('premisesAdminToken')}`,
      },
    });
  }
 
}
