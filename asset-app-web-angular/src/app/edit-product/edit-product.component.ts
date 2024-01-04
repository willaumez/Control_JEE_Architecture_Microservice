import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  productId!: number;
  productFormGroup!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
    });
    //this.activatedRoute.snapshot.paramMap.get('id');
    //this.activatedRoute.snapshot.params['id'];

    this.productFormGroup = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      checked: ['']
    });

    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productFormGroup.patchValue(product);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  /*updateProduct() {
    this.productService.updateProduct(this.productId).subscribe({
      next: (product) => {
        console.log(product);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }*/
  updateProduct(){
    if (this.productFormGroup.valid) {
      const product = this.productFormGroup.value;
      this.productService.updateProduct(product).subscribe({
        next: (result) => {
          console.log('Product updated:', result);
          //alert(JSON.stringify(result));
          this.productFormGroup.reset();
          //Redirection vers la page des produits
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          console.error('Failed to update product:', err);
        }
      });
    }
  }

}
