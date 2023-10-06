import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capfirstletter'
})
export class CapfirstletterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }

    const zinnen = value.split(/([.?!])\s+/);

    for (let i = 0; i < zinnen.length; i++) {
      const zin = zinnen[i];

      if (zin.length > 0) {
        const trimzin = zin.trim();
        const eersteletter = trimzin.charAt(0).toUpperCase();
        const overschot = trimzin.slice(1).toLowerCase();

        zinnen[i] = eersteletter + overschot;
      }
    }

    return zinnen.join(' ');
  }
}
