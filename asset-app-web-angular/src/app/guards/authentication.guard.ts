import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AppStateService} from "../services/app-state.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private appState: AppStateService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.appState.authState.isAuthenticated) {
      console.log('User is authenticated');
      return true;
    } else {
      console.log('User is not authenticated');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
