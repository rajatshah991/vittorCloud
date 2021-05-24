import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from '../auth.service';
import { LoginPerameter } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm:FormGroup;
  subscription: Subscription;

  constructor(private router: Router,private storageService: StorageService,private commonService:CommonService,private formBuilder: FormBuilder,private authService: AuthService) { }


  ngOnInit() {
    this.commonService.resetApiCount();
    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  login() : void {
    if(this.loginForm.valid) {
      const data = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      console.log(data);
      this.subscription = this.authService.loginUser(data).subscribe((result:LoginPerameter[])=>{
      if(result.length>0) {
        this.storageService.setItem('token',result[0].token);
        this.commonService.openSnackbar('Login Successfully','Done')
      } else  {
        this.commonService.openSnackbar('Login Failed','Warning')
      }
      },()=>{  
          this.commonService.openSnackbar('Something went wrong','Warning')
      })
    }
    // if(this.username == 'admin' && this.password == 'admin'){
    //  this.router.navigate(["user"]);
    // }else {
    //   alert("Invalid credentials");
    // }
  }

  ngOnDestroy():void {
    if(!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
