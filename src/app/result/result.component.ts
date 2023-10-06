import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Film } from '../film';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  title: string = '';
  filter: string = '';
  searchfield: string = '';
  filterOption: string = '*';
  categories: string[] = ['Action', 'Comedy', 'Drama', 'Thriller','Adventure'];
  movies: Film[] = [];
  display: boolean = false;

  constructor(private route: ActivatedRoute,private router: Router, private filmservice: FilmsService){}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.filter = params['filter'];
      this.searchfield = this.title;
      this.filterOption = this.filter;
      console.log(this.title,this.filter);
      this.onGetfilms();
  })
}
  onEnter(){
    const inputValue = this.searchfield;
    console.log(inputValue);
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
    this.filmservice.getFilms().subscribe({
      next: (response: Film[]) => {
        console.log('received films', response);
        this.movies = response;
        console.log('received films', response);
        if (this.searchfield == '' && this.filterOption == '*') {
          console.log("geen filters");
          this.movies = response;
        } else if (this.searchfield != '' && this.filterOption == '*') {
          console.log("alleen naam");
          this.movies = response.filter(movie => movie.moviename.toLowerCase().includes(this.searchfield.toLowerCase()));
        } else if (this.searchfield == '' && this.filterOption != '*') {
          console.log("alleen de categoire");
          this.movies = response.filter(movie => movie.category.toLowerCase().includes(this.filterOption.toLowerCase()));
        } else {
          console.log("beiden filters");
          this.movies = response.filter(movie => {
            const naam = movie.moviename.toLowerCase().includes(this.searchfield.toLowerCase());
            const optie = movie.category.toLowerCase().includes(this.filterOption.toLowerCase());
            return naam && optie;
          });
        }
        console.log("Films", this.movies.length);
        if(this.movies.length == 0) {
          this.display = true;
        }
        else {
          this.display = false;
        }
      }
    });
  }
  
}


