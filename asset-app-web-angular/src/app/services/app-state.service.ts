import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productsState: any = {
    keyword: "",
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalProducts: 0,
    status: "",
    errorMessages: "",
    products: [],
  }

  public authState: any = {
    isAuthenticated: false,
    username: undefined,
    roles: undefined,
    token: undefined,
  }
  constructor() { }

  public setProductsState(productsState: any) {
    this.productsState = ({...this.productsState, ...productsState});
  }

  public setAuthState(authState: any) {
    this.authState = ({...this.authState, ...authState});
  }


}
