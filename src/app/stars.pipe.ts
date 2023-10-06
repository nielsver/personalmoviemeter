import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  transform(stars: number): string {
    const starSymbol = '&#9733;';
    const ster = stars.toFixed(0);

    return ster + ' ' + starSymbol;
  }

}
