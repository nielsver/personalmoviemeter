import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent {
  title: string = '';
  imageUrl: string = '';
  editing: boolean = false;
  description: string='';
  ratingValue: number = 0;
  comments: string[] = [];
  commentForm: FormGroup;
  filterOption: string = '';
  categories: string[] = ['Action', 'Comedy', 'Drama', 'Thriller','Adventure'];

  constructor(private router: Router,private formBuilder: FormBuilder,private filmservice: FilmsService){
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
  }) 
  }
  ngOnInit() {}

  Back(){
    this.router.navigate(['/']);
  }
  imageinput(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log("Selected file:", file);
    this.imageUrl = "assets/images/" + file.name;
  }
  ratingChanged(event: CustomEvent<number>) {
    this.ratingValue = event.detail;
  }
  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  addComment() {
    const newComment = this.commentForm.get('comment')?.value;
    this.comments.push(newComment);
    this.commentForm.reset();
  }
  addMovie() {
    const film = {
      id: 0,
      moviename: this.title,
      stars: this.ratingValue,
      image:this.imageUrl,
      category:this.filterOption,
      beschrijving: this.description,
      opmerkingen:this.comments,
      
    };
    this.filmservice.addFilm(film).subscribe({
      next: (respnse) => {
        console.log('film toegevoegd', respnse);
      },
    })

    this.router.navigate(['/']);
  }

}
