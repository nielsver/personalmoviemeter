import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ResultComponent } from './result/result.component';
import { MovieComponent } from './movie/movie.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CapfirstletterPipe } from './capfirstletter.pipe';
import { OnHoverDirective } from './on-hover.directive';
import { LoginComponent } from './auth/login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore} from '@angular/fire/firestore';
import { firebaseConfig } from './environment/environment';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminGuard, AuthGuard } from './auth/auth.guard';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AdminComponent } from './admin/admin.component';
import { DeAuthguard } from './auth/deauth.guard';
import { ReadmoreModule } from './readmore/readmore.module';






defineComponents(IgcRatingComponent);


const routes: Routes = [
  { path: '', component: HomeComponent }, 

  { path: 'readMore/:id', loadChildren: () => import('./readmore/readmore.module').then(m => m.ReadmoreModule)},
  { path: 'result', component: ResultComponent },
  { path: 'newMovie', component: NewMovieComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canDeactivate: [DeAuthguard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: 'signUp', component: SignupComponent},
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
    CapfirstletterPipe,
    OnHoverDirective,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    ReadMoreComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    ReadmoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){}
  ngOnInit() {
  }
}
