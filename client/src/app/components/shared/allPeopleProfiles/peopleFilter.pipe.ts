import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdata'
})

export class FilterdataPipe implements PipeTransform {

  transform(people: Array<any>, arg: string): any { 
    return people.filter(function(pro){ 
           return pro.gender.toLowerCase().includes(arg.toLowerCase());
    })
  }
}