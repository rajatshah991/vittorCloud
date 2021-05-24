import { Injectable } from "@angular/core";
import {  Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from "@angular/router";
import { AuthService } from "src/app/authentication/auth.service";
import { CommonService } from "../services/common.service";
import { StorageService } from "../services/storage.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
    constructor(
        private router: Router, private commonService: CommonService,
        public auth: AuthService, private storageService: StorageService) {
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.commonService.redirectUrl = state.url;
        const token =  this.storageService.getItem('token');
        if (token) {
            return true;
        } else {
            this.router.navigate(['/product-info']);
            return false;
        }
    }
}
