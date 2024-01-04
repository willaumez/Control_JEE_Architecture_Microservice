import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent implements OnInit{
  public productForm!: FormGroup;


  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {}
  ngOnInit() {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      price: this.fb.control(0, [Validators.required, Validators.min(0)]),
      quantity: this.fb.control(0, [Validators.required, Validators.min(0)]),
      description: this.fb.control('Decsription'),
      checked: this.fb.control(false)
    });
  }

  // Fonction appelée lors du clic sur le bouton "Add Product"
  onAddProduct(): void {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;

      this.productService.addProduct(newProduct).subscribe({
        next: (result) => {
          console.log('Product added:', result);
          alert(JSON.stringify(result));
          this.productForm.reset();
          //Redirection vers la page des produits
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          console.error('Failed to add product:', err);
        }
      });
    }
  }

}
