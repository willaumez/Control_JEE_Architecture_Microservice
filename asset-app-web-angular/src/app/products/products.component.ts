import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {NgIf} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {HttpClient} from "@angular/common/http";
import {normalizeExtraEntryPoints} from "@angular-devkit/build-angular/src/tools/webpack/utils/helpers";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatTableModule,
    NgIf,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent  implements OnInit{
  products : Array<any> = []

  //Les colonnes à afficher dans le tableau material-angular
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'description', 'checked'];

  //Le constructeur
  constructor(private http:HttpClient) {
    this.http.get<Array<any>>('http://localhost:8090/products').subscribe( {
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }


  checkProduct(product: any) {
    product.checked = !product.checked;
    this.http.patch('http://localhost:8090/products/' + product.id,
      {checked: !product.checked}).subscribe({
      next: ():updatedProduct => {
        this.products.map((p) => {
          if (p.id === product.id) {
            return updatedProduct;
            p.checked = !p.checked;
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
