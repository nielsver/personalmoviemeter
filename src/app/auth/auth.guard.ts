import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<boolean> | Promise<boolean> | boolean {
    if (this.authservice.isLoggedIn()) {
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isAdmin = await this.authService.isAdmin();
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
