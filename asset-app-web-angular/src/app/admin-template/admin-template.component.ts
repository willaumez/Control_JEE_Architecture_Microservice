import {Component, signal} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.scss'
})
export class AdminTemplateComponent {

  constructor(public appState: AppStateService, private router: Router) {
  }

  logout(){
    this.appState.setAuthState({
      isAuthenticated: false,
      username: undefined,
      roles: undefined,
      token: undefined,
    });
    this.router.navigate(['/login']);
  }

  login(){
    this.router.navigate(['/login']);
  }

}
