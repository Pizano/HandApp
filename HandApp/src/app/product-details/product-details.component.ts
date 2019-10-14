import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service'
import { Product } from '../product';
import { Location } from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  public ownerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getProductId(this.route.snapshot.paramMap.get('id'));

    this.ownerForm = new FormGroup({
      model: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.maxLength(100)]),
      brand: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      price: new FormControl('', [Validators.required, ]),
      kilometers: new FormControl('', [Validators.required, ]),
      year: new FormControl('', []),
    });
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  getProductId(id) {
    this.service.getProductId(id).subscribe(response => this.product = response);
  }

  public actualizar = () => {
    if (this.ownerForm.valid) {
      let model: Product = {
        year: this.product.year,
        description: this.product.description,
        model: this.product.model,
        brand: this.product.brand,
        kilometers: this.product.kilometers,
        price: this.product.price,
        id: this.product.id
      }
      this.service.UpdateProduct(model)
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
