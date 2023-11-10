import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface cancomponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable({
  providedIn: 'root'
})

export class DeAuthguard implements CanDeactivate<cancomponentDeactivate> {
  canDeactivate(component: cancomponentDeactivate, 
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): 
                Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}