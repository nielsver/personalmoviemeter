import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Administrator } from '../Film';
import { FilmsService } from '../films.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;
  admin: Administrator[] = [];
  Filmsubscription!: Subscription;

  constructor(private router: Router, private auth: Auth, private filmservice: FilmsService) { 
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
  }



  signup(email: string, passwd: string): Promise<string> {
    return createUserWithEmailAndPassword(this.auth, email, passwd)
      .catch(error => {
        console.log(error);
        return error;
      })
      .then(() => {
        return 'success';
      });
  }
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        return this.auth.currentUser?.getIdToken()
          .then(
            (token: string) => {
              this.token = token;
              localStorage.setItem('token', token);
              return true;
            }
          );
      })
      .catch((error) =>{
        console.error('Error during login:', error);
        const errorCode = error.code;

        switch (errorCode) {
          case 'auth/wrong-password':
            console.log('Wrong password. Please try again.');
            return false;

          case 'auth/user-not-found':
            console.log('User not found. Please sign up.');
            return false;

          default:
            console.log('Login failed. Please try again later.');
            return false;
        }
      });
  }
  logout() {
    this.auth.signOut();  
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  isLoggedIn(): boolean {
    return this.token != null;
  }

  async isAdmin(): Promise<boolean> {
    if (!this.isLoggedIn()) {
      return false;
    }

    return new Promise<boolean>((resolve, reject) => {
      this.Filmsubscription = this.filmservice.getAdministrators().subscribe({
        next: (response: Administrator[]) => {
          this.admin = response;
          for (let i = 0; i < this.admin.length; i++) {
            if (this.admin[i].id == this.auth.currentUser?.uid) {
              resolve(true);
              return;
            }
          }
          resolve(false);
        },
        error: (error) => {
          console.error('Error:', error);
          reject(error);
        }
      });
    });
  }
   

    ngOnDestroy() {
      if(this.Filmsubscription){
        this.Filmsubscription.unsubscribe();
      }
      
    }
  }
 

