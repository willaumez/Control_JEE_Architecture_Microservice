import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AppStateService} from "../services/app-state.service";
import {Injectable} from "@angular/core";

@Injectable()
export class authorizationGuard implements CanActivate {
  constructor(private appState: AppStateService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.appState.authState.roles.includes('ADMIN')) {
      return true;
    } else {
      this.router.navigate(['/admin/not-authorized']);
      return false;
    };
  }
}
