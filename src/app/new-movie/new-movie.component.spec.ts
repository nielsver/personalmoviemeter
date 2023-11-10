import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { NewMovieComponent } from './new-movie.component';

describe('NewMovieComponent', () => {
  let component: NewMovieComponent;
  let fixture: ComponentFixture<NewMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMovieComponent ]
    })
    .compileComponents();


    fixture = TestBed.createComponent(NewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  });

  // positive
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // negative
  it('should disable the "Opslaan" button when the form is invalid', () => {
    component.form.controls['title'].setValue('');
    component.form.controls['category'].setValue('');
    component.form.controls['description'].setValue('');

    expect(component.form.valid).toBe(false);
    const submitButton = fixture.nativeElement.querySelector('#submit');
    expect(submitButton.getAttribute('disabled')).not.toBeNull();
  });

  // positive
  it('should enable the "Opslaan" button when the form is valid', () => {
    component.form.controls['title'].setValue('Valid Title');
    component.form.controls['category'].setValue('Valid Category');
    component.form.controls['description'].setValue('valid description');
 

    expect(component.form.valid).toBe(true);
    const submitButton = fixture.nativeElement.querySelector('#submit');
    expect(submitButton.getAttribute('disabled')).toBeNull();
  });

  // positive
  it('should call onSubmit() when the form is submitted with valid data', () => {
    spyOn(component, 'onSubmit');

    component.form.controls['title'].setValue('Valid Title');
    component.form.controls['category'].setValue('Valid Category');
    component.form.controls['description'].setValue('valid description');
  

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  // negative
  it('should not call onSubmit() when the form is submitted with invalid data', () => {
    spyOn(component, 'onSubmit');

    component.form.controls['title'].setValue('');
    component.form.controls['category'].setValue('');
    component.form.controls['description'].setValue('');

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.onSubmit).not.toHaveBeenCalled();
  });
});
