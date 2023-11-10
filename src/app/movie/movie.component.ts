import { Component, Input } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { Film } from '../Film';
import { FilmsService } from '../films.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input('Film') Movie: Film = new Film();
  @Input('index') index: number = 0;

  film: Film = new Film();
  agkleur: string = '';
  commentForm: FormGroup;
  Filmsubscription!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private filmservice: FilmsService, private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.film.id = this.Movie.id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id !== null) {
        this.onLoadFilm(id);
      }
    });

    if (this.index % 2 == 0) {
      this.agkleur = 'rgb(176, 0, 0)';
    } else {
      this.agkleur = 'rgb(0, 180, 0)';
    }
  }

  readMore() {
    this.router.navigate(['/readMore', this.film.id]);
  }

  onLoadFilm(id: string) {
    this.Filmsubscription = this.filmservice.getFilm(id).subscribe({
      next: (response: Film) => {
        this.film = response;
        
      }
    })
  }
  ngOnDestroy() {
    if(this.Filmsubscription){
      this.Filmsubscription.unsubscribe();
    }
  }
}