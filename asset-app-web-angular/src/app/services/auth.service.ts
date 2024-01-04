import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppStateService} from "./app-state.service";
import {firstValueFrom} from "rxjs";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private appState: AppStateService) {
  }

  async login(username: string, password: string) {
    let user: any = await firstValueFrom(this.http.get("http://localhost:8089/users/" + username))

    if (password == atob(user.password)) {
      let decodedToken: any = jwtDecode(user.token);
      this.appState.setAuthState({
        isAuthenticated: true,
        username: decodedToken.sub,
        roles: decodedToken.roles,
        token: user.token
      });
      return Promise.resolve(true);
    } else {
      return Promise.reject("Username or password is incorrect");
    }
  }


}
