import { Component } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FilmsService } from '../films.service';
import { user } from 'rxfire/auth';
import { Observable } from 'rxjs';
import { Administrator } from '../Film';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
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
export class AdminComponent {

  Users: Administrator[] = []; 
  usersSubscription!: Observable<Administrator[]>;

  constructor(private router: Router, private service: FilmsService,private auth: Auth){}

  ngOnInit() {
    this.usersSubscription = this.service.getAdministrators();
    this.usersSubscription.subscribe((users: Administrator[]) => {
      this.Users = users;
      console.log(this.Users);
    });
  }

  toHome() {
    this.router.navigate(['/'])
  }
  getCurrentUser(): Administrator | undefined {
    return this.Users.find((user) => user.id === this.auth.currentUser?.uid);
  }

}
