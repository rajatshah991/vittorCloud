import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../shared/error-handler';
import { LoginPerameter } from './login/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,private errorHandlerService: ErrorHandlerService ) { }

/** Login user */
  loginUser(userData: LoginPerameter):Observable<LoginPerameter[]> {
    console.log(userData);
    return this.httpClient.get(`${environment.apiPath}/user`,{params:{'username':userData.username,'password':userData.password}}).pipe(
      map((res: any) => {
        return res;
      }), catchError((error) => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );

  }
}
