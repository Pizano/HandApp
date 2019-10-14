import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service'
import { Product } from '../product';
import { Location } from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    id : null,
    year : null,
    description: "",
    model: "",
    brand : "",
    kilometers : null,
    price : null
  }

  public ownerForm: FormGroup;

  constructor(
    private service : ProductService,
    private location : Location
  ) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      model: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.maxLength(100)]),
      brand: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      price: new FormControl('', [Validators.required, ]),
      kilometers: new FormControl('', [Validators.required, ]),
      year: new FormControl('', []),
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  public crear = () => {
    if (this.ownerForm.valid) {
      let model: Product = {
        id : 0,
        year : this.product.year,
        description: this.product.description,
        model: this.product.model,
        brand : this.product.brand,
        kilometers : this.product.kilometers,
        price : this.product.price
      }
      this.service.PostProduct(model)
        .subscribe(res => {
            this.location.back();
          },
          (error => {       
            this.location.back();
          })
        )

    }
  }

  public cancelar = () => {
    this.location.back();
  }

  keyPressNumber(event: any) {
    const pattern = /^\s*(?=.*[0-9])\d*(?:\.\d{1,15})?\s*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {    
        event.preventDefault();
    }
  }
  
  keyPressAlphanumeric(event: any) {
    const pattern = /[a-zA-Z0-9 ]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {    
        event.preventDefault();
    }
  }

}
