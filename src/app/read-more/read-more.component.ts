import { Component, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap} from '@angular/router';
import { Film } from '../Film';
import { FilmsService } from '../films.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css'],
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
      overflow:auto;
    }
  `,
  ],

})
export class ReadMoreComponent {
  bewerken: boolean = false;
  commentForm!: FormGroup;
  film: Film = new Film();
  Filmsubscription!: Subscription;
  change: boolean = false;
  admin: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,private authservice: AuthService, private filmservice: FilmsService,private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
};
 async ngOnInit(): Promise<void>{
  this.commentForm = this.formBuilder.group({
    'comment': [null, {
      validators: [Validators.required]
    }]
  })  
    this.Filmsubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params?.get('id');
      if (id) {
        this.filmservice.getFilm(id).subscribe({
          next: (response: Film) => {
            console.log('Film loaded: ', response);
            this.film = response; 
            this.cdr.detectChanges();
            this.film.id = id;
            if (!this.film.opmerkingen) {
              this.film.opmerkingen = [];
            }
          }
        });
      }
    });
    try {
      this.admin = await this.authservice.isAdmin();
    } catch (error) {
      
      console.error('Error checking admin status:', error);
    }
  }

  Back() {
    if(this.authservice.isLoggedIn() == true){
      console.log('Film ID:', this.film.id);
      this.Filmsubscription = this.filmservice.updateFilm(this.film, this.film.id).subscribe({
        error: (error) => {
          console.error('Error updating film:', error);
        }
      });
      this.router.navigate(['/result'],{ queryParams: { title: '',filter: '*' } });
    }
    else {
      if (this.change == true){
        alert("U moet ingelogd zijn om de film te updaten");
        this.router.navigate(['/result'],{ queryParams: { title: '',filter: '*' } });
      }else {
        this.router.navigate(['/result'],{ queryParams: { title: '',filter: '*' } });
      }
      
    }

    
    
  }
  ratingChanged(event: CustomEvent<number>) {
    this.film.stars = event.detail;
    this.change = true;
  }
 

  addComment() {
    const newComment = this.commentForm.get('comment')?.value;
    console.log(newComment);
    this.film.opmerkingen.push(newComment);
    this.commentForm.reset();
    this.change = true;
  }
  delete(){
    console.log(this.film.id);
    this.Filmsubscription = this.filmservice.deleteFilm(this.film.id).subscribe({
      next: () => {
        console.log('Film deleted successfully.');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error deleting film:', error);
      }
    });
    
  }
  bewerke() {
    if(this.bewerken == false) {
      this.bewerken = true;
    }
    else {
      this.bewerken = false;
    }
  }

  home() {
    this.router.navigate(['/']);
  }
  ngOnDestroy() {
    if(this.Filmsubscription){
      this.Filmsubscription.unsubscribe();
    }
  }

}