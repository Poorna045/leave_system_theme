import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leavesassignsearch'
})
export class LeavesassignsearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === undefined) return value;

      else {
        return value.filter(function (data){
              return value.mission.toLowerCase().includes(args.toLowerCase());
        })
      }
  }

}
