import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadMoreComponent } from '../read-more/read-more.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

const route: Routes = [
  { path: 'readMore/:id', component: ReadMoreComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(route)
  ],
  exports: [
    RouterModule
  ]
})
export class ReadmoreModule { }
