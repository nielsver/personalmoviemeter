import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
export class SignupComponent {
  signupForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder){
    this.signupForm = this.fb.group({
      'email' : ['',{
        validators:  [Validators.required, Validators.email],
        asyncValidators: [this.userNameExists], 
        updateOn:'change'}],
      'password' : [null, {validators: [Validators.required, Validators.minLength(6)]
      }],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
    this.authService.signup(email, password)
      .then((res) => {
        if(res == 'success') {
          this.router.navigate(['login']);
        }else {
          alert(res);
        }
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        alert('Signup failed. Please try again later.');
      });
    }
  }
  goToHome() {
    this.router.navigate(['/login'])
  }
  userNameExists(control: FormControl): Promise<any> |Observable<any> {
    const answer = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'nielsvervoort@gmail.com') {
          resolve({'usernameTaken': true});
        } else {
          resolve(null);
        }
      }, 1500)
    });
    return answer;
  }

}
