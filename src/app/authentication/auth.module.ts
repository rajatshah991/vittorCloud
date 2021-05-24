import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthMaterialModule } from './auth.material.module';

const routes:Routes=[{
  path:'', component:LoginComponent
}]


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthMaterialModule,
    
    RouterModule.forChild(routes)
   
  ]
})
export class AuthModule { }
