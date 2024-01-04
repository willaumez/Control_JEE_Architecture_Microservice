import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {filter, map, Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  //products : Array<Product> = []
  products$!: Observable<Array<Product>>;

  public keyword: string = '';
  totalPages: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  //Les colonnes à afficher dans le tableau material-angular
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'description', 'checked', 'action'];

  //Le constructeur
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.keyword, this.currentPage, this.pageSize).subscribe( {
      next: (response) => {
        let body   = response.body as Array<Product>;
        this.products$ = of(body);

        let totalPage: number = Number(response.headers.get('X-Total-Count'));
        this.totalPages = Math.floor(totalPage / this.pageSize);
        if (totalPage % this.pageSize != 0) {
          this.totalPages++;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
    //this.products$ = this.productService.getProducts();
  }

  checkProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: value => {
        product.checked = !product.checked;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe({
      next: value => {
        this.getProducts();
        //Supprimer le produit de la liste des produits
        /*this.products$ = this.products$.pipe(
          map(products => products.filter(p => p.id !== product.id))
        );*/
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  searchProducts(): void {
    this.currentPage = 1;
    this.totalPages = 0;
    this.productService.getProducts(this.keyword, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        let body   = response.body as Array<Product>;
        this.products$ = of(body);

        let totalPage: number = Number(response.headers.get('X-Total-Count'));
        this.totalPages = Math.floor(totalPage / this.pageSize);
        if (totalPage % this.pageSize != 0) {
          this.totalPages++;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  handleGotoPage(page: number) {
    this.currentPage = page;
    this.getProducts();
  }
  editProduct(product: Product) {
    this.router.navigateByUrl('/admin/edit-product/' + product.id);
  }




}
