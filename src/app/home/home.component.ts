import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [
    `
    :host {
      display:block;
      background-color: black;
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
export class HomeComponent {
  searchfield: string = '';
  filterOption: string = '*';
  categories: string[] = ['Action', 'Comedy', 'Drama', 'Thriller','Adventure'];
  bool: boolean = true;
  admin: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit(){
    this.bool = this.authService.isLoggedIn();
    try {
      this.admin = await this.authService.isAdmin();
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  }
  onEnter(){
    const inputValue = this.searchfield;
    console.log(inputValue);
    this.router.navigate(['/result'],{ queryParams: { title: this.searchfield,filter: this.filterOption } });
  }
  redirectToLogin() {
    this.router.navigate(['/login']); 
  }
  redirectToLogout() {
    this.authService.logout();
    this.bool = false;
  }
  toadminpage() {
    this.router.navigate(['/admin']);
  }
}
