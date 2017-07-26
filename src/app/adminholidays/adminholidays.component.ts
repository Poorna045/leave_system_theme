import { Component, OnInit,ViewChild } from '@angular/core';
import { AppService } from "app/Services/app.service";
import { Popup } from "ng2-opd-popup";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
declare var $;
@Component({
  selector: 'app-adminholidays',
  templateUrl: './adminholidays.component.html',
  styleUrls: ['./adminholidays.component.css']
})
export class AdminholidaysComponent implements OnInit {
  dateshow: any;
  sno: any;
  holname='';
  holdate='';
  holtype='';

@ViewChild('popup3') popup3: Popup;
@ViewChild('popup2') popup2: Popup;
@ViewChild('popup1') popup1: Popup;

 title = 'app works!';
    data
  role
  dept
  todate=''
   public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "emp_id";
    public sortOrder = "asc";
    

     public toasterconfig: ToasterConfig =
    new ToasterConfig({

        showCloseButton: true,
        tapToDismiss: true,
        timeout: 5000

    });
     public toasterService: ToasterService;
  constructor(private service:AppService, public popup: Popup, toasterService: ToasterService){
      this.toasterService = toasterService;
       this.role = localStorage.getItem('empRole');
     this.dept = localStorage.getItem('empdept');
    console.log(this.role, 'role type');
     console.log(this.dept, 'department type');
  
  }

  ngOnInit() {
      this.service.getHolidaylist().subscribe(data=>{this.data=data

       
  console.log(data,'data in holidays table');
 
    
  });
}

popToast() {
        this.toasterService.pop('warning', '', 'This Date is already exist in the Holidays Table . please enter unique Date');

    }
    popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');

  }
     onDateChanged(event: IMyDateModel) {
   this.holdate=event.formatted;
        console.log(event, 'event testing => ',this.holdate);

    }

     public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
        editableDateField: true,
        disableWeekends: false,
        // disableDays: this.service.holidays,
        // disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 }
        // disableUntil: {year: , month: 5 , day: 17}

    };

delete(){
  const value={
    sno:this.sno
  }
  this.service.deleteholiday(value).subscribe(dat=>{
     this.service.getHolidaylist().subscribe(data=>{
       this.data=data
   
  });
  })
this.popup3.hide();
}

add(){

  
  
if(this.holdate=='' || this.holtype=='' || this.holname==''){
this.popToast2();
}else{
  const value={
   holname:this.holname,
   holdate:this.holdate,
   holtype:this.holtype

  }
  this.service.addholiday(value).subscribe(dat=>{
    console.log(dat,'dat testing');
    
    if(dat==''){
     this.service.getHolidaylist().subscribe(data=>{
       this.data=data
       this.popup1.hide();
  });
    }else if(dat!=''){
      this.popToast();
    }
})
}


}
edit(){
if(this.holdate=='' || this.holtype=='' || this.holname==''){
this.popToast2();
}else{
  const value={
   holname:this.holname,
   holdate:this.holdate,
   holtype:this.holtype

  }
  this.service.editholiday(value).subscribe(dat=>{
     this.service.getHolidaylist().subscribe(data=>{
       this.data=data
   
  });
})
this.popup2.hide();

}
}
addpopup(){

    this.holdate='';
    this.holname='';
    this.holtype='';

   this.popup1.options = {
    header: "Add New Holiday",
   color:'#34495e', 
    widthProsentage: 40, // The with of the popou measured by browser width 
    animationDuration: 1, // in seconds, 0 = no animation 
    showButtons: true, // You can hide this in case you want to use custom buttons 
       cancleBtnContent: "Cancel", // the text on your cancel button 
    confirmBtnContent: "Add", // The text on your confirm button 
    confirmBtnClass: "btn btn-default btn-square", // your class for styling the confirm button 
    cancleBtnClass: "btn btn-danger btn-square", // you class for styling the cancel button 
    animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
};
 
  this.popup1.show(this.popup1.options);
}
  delpopup(sno,date){
    this.dateshow=date;
    this.sno=sno;
    this.popup3.options = {
    header: "Delete holiday",
   color:'#34495e', 
    widthProsentage: 40, // The with of the popou measured by browser width 
    animationDuration: 1, // in seconds, 0 = no animation 
    showButtons: true, // You can hide this in case you want to use custom buttons 
       cancleBtnContent: "Cancel", // the text on your cancel button 
    confirmBtnContent: "Delete", // The text on your confirm button 
    confirmBtnClass: "btn btn-default btn-square", // your class for styling the confirm button 
    cancleBtnClass: "btn btn-danger btn-square", // you class for styling the cancel button 
    animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
};
 
  this.popup3.show(this.popup3.options);
}

  editpopup(details){
    this.holdate=details.holdate;
    this.holname=details.holname;
    this.holtype=details.holtype;

    this.popup2.options = {
    header: "Edit holiday",
   color:'#34495e', 
    widthProsentage: 40, // The with of the popou measured by browser width 
    animationDuration: 1, // in seconds, 0 = no animation 
    showButtons: true, // You can hide this in case you want to use custom buttons 
       cancleBtnContent: "Cancel", // the text on your cancel button 
    confirmBtnContent: "Edit", // The text on your confirm button 
    confirmBtnClass: "btn btn-default btn-square", // your class for styling the confirm button 
    cancleBtnClass: "btn btn-danger btn-square", // you class for styling the cancel button 
    animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
};
 
  this.popup2.show(this.popup2.options);
}


}
