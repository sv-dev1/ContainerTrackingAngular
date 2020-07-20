import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searching'
})
export class SearchingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.origin.toLocaleLowerCase().includes(args)) || (val.origin.toLocaleUpperCase().includes(args)) || (val.container_no.toLocaleLowerCase().includes(args)) || (val.container_no.toLocaleUpperCase().includes(args)) || (val.destination.toLocaleUpperCase().includes(args)) || (val.destination.toLocaleLowerCase().includes(args)) || (val.po_no.toLocaleLowerCase().includes(args));
      return rVal;
    })


  }
}
