import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../shared/services/common.service';
import { StorageService } from '../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {
  constructor(private router: Router, private commonService: CommonService,
    private storageService: StorageService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.storageService.getItem('token')) {
        this.router.navigate(['/product-info']);
        return false;
      }  else {
        return true;
      }
      
  }
  
}
