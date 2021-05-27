import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProductDetail } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit,OnDestroy {
  productForm:FormGroup;
  subscription: Subscription;

  constructor(private router: Router,private title:Title,private commonService:CommonService,private productService:ProductService,private formBuilder: FormBuilder) {
    this.commonService.apiCall++;
   }


  ngOnInit() {
    this.title.setTitle('ProductAdd');
    this.commonService.resetApiCount();
    this.initProductAddForm();
   
  }

  initProductAddForm() {
    this.productForm = this.formBuilder.group({
      name:['',[Validators.required]],
      articalNo:['',[Validators.required]],
      price: ['',[Validators.required]],
    })
  }
  addProduct() : void {
    console.log(this.productForm.valid);
    if(this.productForm.valid) {
      const data = {
        name: this.productForm.value.name,
        articalNo: this.productForm.value.articalNo,
        price:this.productForm.value.price
      }
      console.log(data);
      this.subscription = this.productService.add(data).subscribe((result:ProductDetail[])=>{
        if(result) {
        this.commonService.openSnackbar('Product Added successfully!!','Done');
        this.router.navigate(['/product-info']);
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
