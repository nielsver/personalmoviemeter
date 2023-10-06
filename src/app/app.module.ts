import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ResultComponent } from './result/result.component';
import { MovieComponent } from './movie/movie.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReadMoreComponent } from './read-more/read-more.component';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CapfirstletterPipe } from './capfirstletter.pipe';

defineComponents(IgcRatingComponent);


const routes: Routes = [
  { path: '', component: HomeComponent }, 
  
  { path: 'result', component: ResultComponent },
  { path: 'newMovie', component: NewMovieComponent},
  { path: 'readMore/:id', component: ReadMoreComponent},
  { path: '**', component: PagenotfoundComponent }

]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagenotfoundComponent,
    ResultComponent,
    MovieComponent,
    NewMovieComponent,
    ReadMoreComponent,
    CapfirstletterPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){}
  ngOnInit() {
    console.log("loaded");
  }
}
