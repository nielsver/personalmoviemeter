import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film } from '../Film';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css'],
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
export class NewMovieComponent {
  imageUrl: string ='';
  ratingValue: number = 3;
  comments: string[] = [];
  commentForm!: FormGroup;
  form!: FormGroup;
  Filmsubscription!: Subscription;
  filterOption: string = '';
  categories: string[] = ['Action', 'Comedy', 'Drama', 'Thriller','Adventure'];
  file: File | null = null;
  filmId: string = '';

  constructor(private router: Router,private formBuilder: FormBuilder,private filmservice: FilmsService){
  
  }
  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      'comment' : [null, {
        validators: Validators.required
      }]
      }); 
    this.form=this.formBuilder.group({
      'title': [null, {
        validators: Validators.required
      }],
      'description': [null, {
        validators: Validators.required
      }],
      'category': [this.categories[0], {
        validators: Validators.required
      }],

      });
  }

  Back(){
    this.router.navigate(['/result'],{ queryParams: { title: '',filter : '*' } });
  }
  imageinput(event: Event) {
    const target = event.target as HTMLInputElement;
    if(target.files && target.files[0]){
      this.file = target.files[0];
      console.log("Selected file:", this.file.name);
    }
  }
  ratingChanged(event: CustomEvent<number>) {
    this.ratingValue = event.detail;
  }

  addComment() {
    const newComment = this.commentForm.get('comment')?.value;
    this.comments.push(newComment);
    this.commentForm.reset();
  }
  async onSubmit() {
    const film = {
      id: '',
      moviename: this.form.get('title')?.value,
      stars: this.ratingValue,
      category:this.form.get('category')?.value,
      beschrijving: this.form.get('description')?.value,
      opmerkingen:this.comments,
      
    } as Film;
    if(this.file) {
      this.filmId = this.filmservice.createFilmId();
      film.id = this.filmId;
      const path = 'movies/' + this.filmId + '/' + this.file.name;
      film.image = await this.filmservice.uploadImg(path, this.file);
    }

    this.Filmsubscription = this.filmservice.addFilm(film).subscribe({
      next: (respnse) => {
        console.log('film toegevoegd', respnse);
      },
    })

    this.router.navigate(['/result'],{ queryParams: { title: '',filter : '*' } });
  }
  ngOnDestroy() {
    if(this.Filmsubscription){
      this.Filmsubscription.unsubscribe();
    }
  }
}
