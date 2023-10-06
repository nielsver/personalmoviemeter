import { Component, Input } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { Film } from '../film';
import { FilmsService } from '../films.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input('Film') Movie: Film = new Film();

  film: Film = new Film();
  agkleur: string = '';
  commentForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private filmservice: FilmsService, private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    })
  }

  ngOnInit() {
    console.log("kijk naar hier", this.Movie);
    this.film.id = this.Movie.id;
    console.log('movieid',this.Movie.id)
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = this.film.id;
      if (id !== null) {
        const filmId = this.film.id;
        console.log("filmId", filmId);
        this.onLoadFilm(filmId);
      }
    });

    if (this.film.id % 2 == 0) {
      this.agkleur = 'rgb(176, 0, 0)';
    } else {
      this.agkleur = 'rgb(0, 180, 0)';
    }
  }

  readMore() {
    this.router.navigate(['/readMore', this.film.id]);
  }

  onLoadFilm(id: number) {
    this.filmservice.getFilm(id).subscribe({
      next: (response: Film) => {
        console.log('film ingeladen: ', response);
        this.film = response;
      }
    })
  }
}