import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}
  ngOnInit(){

  }
  onEnter(){
    const inputValue = this.searchfield;
    console.log(inputValue);
    this.router.navigate(['/result'],{ queryParams: { title: this.searchfield,filter: this.filterOption } });
  }
}
