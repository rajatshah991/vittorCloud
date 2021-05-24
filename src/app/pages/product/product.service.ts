import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/shared/error-handler';
import { environment } from 'src/environments/environment';
import { ProductDetail } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient,private errorHandlerService:ErrorHandlerService) { }

  getProduct():Observable<ProductDetail[]> {
    return this.httpClient.get(`${environment.apiPath}/product`).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error) => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }
  searchProduct(keyword:string):Observable<ProductDetail[]> {
    return this.httpClient.get(`${environment.apiPath}/product`,{params:{"name_like":keyword}}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error) => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  add(data:ProductDetail): Observable<ProductDetail[]>{
    
    return this.httpClient.post(`${environment.apiPath}/product`,data).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error) => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }
}
