import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { DeAuthguard, cancomponentDeactivate } from '../deauth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
    `
    :host {
      display:block;
      background: radial-gradient(at right top, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234));
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9999;
    }
  `,
  ],
})
export class LoginComponent implements DeAuthguard {
  invalidLogin: boolean = false;
  loginForm: FormGroup;
  return: boolean = false;
  deactiveren: boolean = false;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      'email' : [null,{ validators:  [Validators.required, Validators.email]
      }], 
      'password': [null,{validators:  [Validators.required, Validators.minLength(6)]}] 
    });
  }
  ngOnInit() {
    this.invalidLogin = false;
  }
  onLogin() {
    if(this.loginForm.invalid) {
      return;
    }
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (emailControl && passwordControl) {
      const email = emailControl.value;
      const password = passwordControl.value;

    this.authService.login(email, password)
      .then((response) => {
        if(!response) {
          this.invalidLogin = true;
        } else {
          this.invalidLogin = false;
          this.deactiveren = true;
          this.router.navigate(['/']);
        }
      })
    }
  }
  goto() {
    this.deactiveren = true;
    this.router.navigate(['/signUp']);
  }
  goToHome() {
    this.router.navigate(['/']); 
    
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.deactiveren) {
      return true; 
    }

    if (!this.deactiveren) {
      if (confirm('You are not yet logged in. Do you want to return?')) {
        this.goToHome();
        this.deactiveren = true; 
        return true;
      } else {
        this.deactiveren = false; 
        return false;
      }
    }

    return true; 
  }
}
