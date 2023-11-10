import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Film } from '../Film';
import { FilmsService } from '../films.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
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
      overflow: auto;
    }
  `,
  ],
})
export class ResultComponent {
  title: string = '';
  filter: string = '';
  searchfield: string = '';
  filterOption: string = '*';
  categories: string[] = ['Action', 'Comedy', 'Drama', 'Thriller','Adventure'];
  movies: Film[] = [];
  display: boolean = false;
  Filmsubscription!: Subscription;

  constructor(private route: ActivatedRoute,private router: Router, private filmservice: FilmsService){}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.filter = params['filter'];
      this.searchfield = this.title;
      this.filterOption = this.filter;
      this.onGetfilms();
  })
}
  onEnter(){
    const inputValue = this.searchfield;
    this.router.navigate(['/result'],{ queryParams: { title: this.searchfield,filter: this.filterOption } });
    this.ngOnInit;
  }
  goTo(){
    this.router.navigate(['/newMovie']);
  }
  Back(){
    this.router.navigate(['/']);
  }
  onGetfilms() {
    this.Filmsubscription = this.filmservice.getFilms().subscribe({
      next: (response: Film[]) => {
        this.movies = response;
        if (this.searchfield == '' && this.filterOption == '*') {
          this.movies = response;
        } else if (this.searchfield != '' && this.filterOption == '*') {
          this.movies = response.filter(movie => movie.moviename.toLowerCase().includes(this.searchfield.toLowerCase()));
        } else if (this.searchfield == '' && this.filterOption != '*') {
          this.movies = response.filter(movie => movie.category.toLowerCase().includes(this.filterOption.toLowerCase()));
        } else {
          this.movies = response.filter(movie => {
            const naam = movie.moviename.toLowerCase().includes(this.searchfield.toLowerCase());
            const optie = movie.category.toLowerCase().includes(this.filterOption.toLowerCase());
            return naam && optie;
          });
        }
        if(this.movies.length == 0) {
          this.display = true;
        }
        else {
          this.display = false;
        }
      }
    });
  }
  onFilterChange() {
    this.onEnter();
  }
  ngOnDestroy() {
    if(this.Filmsubscription){
      this.Filmsubscription.unsubscribe();
    }
    
  }
  
}


