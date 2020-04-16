import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './REST/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class Authentication implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {

    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

