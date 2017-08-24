import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tohalf'
})
export class RemovespacesPipe implements PipeTransform {

   transform(value: string){

   if(value)   {
     var str=value
     var check=new Date(value);
     var HH=check.getHours()
     var mm=check.getMinutes();
     var onlydate=check.toLocaleDateString()
     if(HH==12){
        var tm='1st Half'
     }else if(HH==17){
        var tm='2nd Half' 
     }
     //console.log(HH,mm, check.toLocaleDateString() ,'date tohalf check');
     
     return tm;
   }       
  
  }
}
