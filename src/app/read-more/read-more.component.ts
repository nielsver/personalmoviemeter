import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap} from '@angular/router';
import { Film } from '../film';
import { FilmsService } from '../films.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent {
  bewerken: boolean = false;
  film: Film = new Film();
  commentForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private filmservice: FilmsService,private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
  }) 
};
ngOnInit(): void {
  this.route.paramMap.subscribe((params: ParamMap) => {
    const id = params?.get('id');
    if (id) {
      this.onLoadFilm(+id);
    }
  });
}
  Back() {
    this.filmservice.updateFilm(this.film).subscribe(
      (response: Film) => {
        console.log('film updated', response);
        window.history.back();
      }
    )
    
  }
  ratingChanged(event: CustomEvent<number>) {
    this.film.stars = event.detail;
  }
  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  addComment() {
    const newComment = this.commentForm.get('comment')?.value;
    console.log(newComment);
    this.film.opmerkingen.push(newComment);
    this.commentForm.reset();
  }
  onLoadFilm(id: number) {
    this.filmservice.getFilm(id).subscribe({
      next: (response: Film) => {
        console.log('film ingeladen: ', response);
        this.film = response;
        if (!this.film.opmerkingen) {
          this.film.opmerkingen = [];
        }
      }
    })
  }
  delete(){
    this.filmservice.deleteFilm(this.film.id).subscribe(
      (response: any) => {
        console.log('deleted', response); 
        window.history.back();
      }
    )
  }
  home() {
    this.router.navigate(['/']);
  }

}