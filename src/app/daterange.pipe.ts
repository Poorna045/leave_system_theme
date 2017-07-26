import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daterange'
})
export class DaterangePipe implements PipeTransform {
  day: number;
  month: number;
  year: number;
  date = new Date();
  from
  to
  date1
  date2
  transform(array: any[], date1?: any,date2?: any): any {
    var keys=[];
  //console.log(array[0].from_date,'date',new Date(date1));
      let days1 = new Date(date2).getDate();
        let months1 = new Date(date2).getMonth();
        let years1 = new Date(date2).getFullYear();
        this.year = years1;
        this.month = months1 + 1;
        this.day = days1;
        this.date2=this.day + '-' + this.month + '-' + this.year;

            let days = new Date(date1).getDate();
        let months = new Date(date1).getMonth();
        let years = new Date(date1).getFullYear();
        this.year = years;
        this.month = months + 1;
        this.day = days;
        this.date1=this.day + '-' + this.month + '-' + this.year;


  // console.log(this.date1,' >= ',this.date2,this.date1>=this.date2);
  
    if(date1=='' || date2=='' || array.length==0 || array==undefined || array==null || date1==null || date1==undefined){
 return array;
  } else{
       for(var i=0;i<array.length;i++){

        let day1 = new Date(array[i].from_date).getDate();
        let month1 = new Date(array[i].from_date).getMonth();
        let year1 = new Date(array[i].from_date).getFullYear();
        this.year = year1;
        this.month = month1 + 1;
        this.day = day1;
        this.from=this.day + '-' + this.month + '-' + this.year;
     
         let day = new Date(array[i].to_date).getDate();
        let month = new Date(array[i].to_date).getMonth();
        let year = new Date(array[i].to_date).getFullYear();
        this.year = year;
        this.month = month + 1;
        this.day = day;
        this.to=this.day + '-' + this.month + '-' + this.year;
     
      let from=new Date(array[i].from_date);
      let to=new Date(array[i].to_date);
     if((this.from>=this.date1 && this.from<=this.date2) || (this.to>=this.date1 && this.to<=this.date2) ) {
      keys.push(array[i]);
     }
    }

    
  }
  return keys;
  }

}
