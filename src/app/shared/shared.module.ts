import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SnackbarComponent } from './component/snackbar/snackbar.component';
import { ApiHandlerInterceptor } from './api-handler.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';




@NgModule({
  declarations: [
    SnackbarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports:[
    MatButtonModule,
    HttpClientModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HeaderComponent,
    FooterComponent
  ],
  entryComponents:[SnackbarComponent],
  providers:[  { provide: HTTP_INTERCEPTORS, useClass: ApiHandlerInterceptor, multi: true },]
})
export class SharedModule { }
