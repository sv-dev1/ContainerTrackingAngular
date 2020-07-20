import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(elements: Array<Object>, args?: any): any {
    if (elements != null) {
      return elements.sort(function (a, b) {
        if (a[args.property] === '' || a[args.property] === null || typeof a[args.property] === 'undefined') {
          return 1 * args.direction;
        }
        if (b[args.property] === '' || b[args.property] === null || typeof b[args.property] === 'undefined') {
          return -1 * args.direction;
        }
        if (a[args.property] < b[args.property]) {
          return -1 * args.direction;
        }
        else if (a[args.property] > b[args.property]) {
          return 1 * args.direction;
        }
        else {
          return 0;
        }
      });
    }
  };
}
