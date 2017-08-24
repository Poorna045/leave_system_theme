import { Component, OnInit,ViewChild } from '@angular/core';
import { AppService } from "app/Services/app.service";
import { Popup } from "ng2-opd-popup";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { IMyDpOptions, IMyDateModel } from "mydatepicker";
declare var $;
@Component({
  selector   : 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls  : ['./assign-roles.component.css']
})
export class AssignRolesComponent implements OnInit {
  upto = '';
  reg_nos: any;
  college: any;
  staffdata = []
  role: any;
  typesss  = 'Select';
  reg_no   = '';
  rolename = '';
  roleid   = '';
  typess   = 'Select'
  roles    = []
  status   = 'Select'
  todate   = ''

@ViewChild('popup3') popup3: Popup;
@ViewChild('popup2') popup2: Popup;
@ViewChild('popup1') popup1: Popup;

 title = 'app works!';
    data

   public filterQuery = "";
   public rowsOnPage  = 5;
   public sortBy      = "emp_id";
   public sortOrder   = "asc";
    

     public toasterconfig: ToasterConfig = 
    new ToasterConfig({

        showCloseButton: true,
        tapToDismiss   : true,
        timeout        : 5000

    });
     public toasterService: ToasterService;
  constructor(private service:AppService, public popup: Popup, toasterService: ToasterService){
      this.toasterService = toasterService;
   

  
  }
  public items = [];

     onDateChanged(event: IMyDateModel) {
   this.upto = event.formatted;
        console.log(event, 'event testing => ',this.upto);

    }

  public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat       : 'yyyy-mm-dd',
        editableDateField: true,
        disableWeekends  : false,
        // disableDays: this.service.holidays,
        // disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 }
        // disableUntil: {year: , month: 5 , day: 17}

    };

  ngOnInit() {
this.role    = localStorage.getItem('empRole')
this.reg_nos = localStorage.getItem('reg_no')
this.college = localStorage.getItem('empcolg')
      this.service.getStaffData(localStorage.getItem('utype')).subscribe(dats=>{

        for(var i=0;i<dats.data.data.length;i++){
          this.items[i] = new Object();
          if(this.role=='admin'){
          this.items[i].name   = dats.data.data[i].name
          this.items[i].reg_no = dats.data.data[i].reg_no
        }else if(this.role=='Principal' && dats.data.data[i].college==this.college && dats.data.data[i].reg_no!=this.reg_nos){
           this.items[i].name   = dats.data.data[i].name
           this.items[i].reg_no = dats.data.data[i].reg_no
        }
        }
        console.log(this.items,'items test');
        
       this.staffdata = dats.data.data;
        // setTimeout(function () {
           
        // }, 3000)
  console.log(dats,'data in assign roles table');
    this.service.getRolename().subscribe(data=>{
      if(this.role=='admin'){
      this.roles = data;
      }else if(this.role=='Principal'){
       for(var i=0;i<data.length;i++){
         if(data[i].rname=='admin' || data[i].rname=='Management' || data[i].rname=='Principal'){
           data.splice(i,1)
           i = i-1
         }
       }
        this.roles = data
      }
      console.log(data,' roles in role table');

      this.service.getroleslist().subscribe(dat=>{
        
        if(this.role=='admin'){
      this.data = dat
      }else if(this.role=='Principal'){
        this.data = []
        for(var j=0;j<this.staffdata.length;j++){
        
       for(var i=0;i<dat.length;i++){
         if(dat[i].reg_no==this.staffdata[j].reg_no && this.staffdata[j].college==this.college && (dat[i].role=='HOD' || dat[i].role=='Dean') ){
           this.data.push(dat[i])
           break;
         }
       }
        
      }
      
        }
        
    
  console.log(dat,'data in roles table');
 
    
  });
    })
 
});
  
      
}


Types(a){
  this.reg_no  = a.reg_no
  this.typesss = a.name
}
popToast() {
        this.toasterService.pop('warning', '', 'please ensure that unique reg_no !');

    }
     popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');

  }

delete(){
 
  const value={
    role_id: this.roleid
  }
  this.service.deleteuserRole(value).subscribe(data=>{
    this.typess = 'Select'
     this.service.getroleslist().subscribe(dat=>{
      
        if(this.role=='admin'){
      this.data = dat
      }else if(this.role=='Principal'){
        this.data = []
        for(var j=0;j<this.staffdata.length;j++){
        
       for(var i=0;i<dat.length;i++){
         if(dat[i].reg_no==this.staffdata[j].reg_no && this.staffdata[j].college==this.college &&  (dat[i].role=='HOD' || dat[i].role=='Dean')  ){
           this.data.push(dat[i])
           break;
         }
       }
        
      }
      
        }
   
  });
  })
this.popup3.hide();

}



assign(){
  if(this.status=='Permanent'){
    this.todate=' ';
  }
if(this.typess=='Select' || this.typesss=='Select' || this.status=='Select'||this.upto=='' || this.todate==''){
  this.popToast2();
}
else{
  const value={
   reg_no: this.reg_no,
   role  : this.rolename,
   type  : this.status,
   upto  : this.upto
  }
  this.service.adduserrole(value).subscribe(data=>{
    console.log(data,'dat testing');
    
    if(data==''){
      this.typess  = 'Select'
      this.typesss = 'Select'
      this.status=='Select'
      this.upto   = ''
      this.todate = ''
     this.service.getroleslist().subscribe(dat=>{
       
         
        if(this.role=='admin'){
      this.data = dat
      }else if(this.role=='Principal'){
        this.data = []
        for(var j=0;j<this.staffdata.length;j++){
        
       for(var i=0;i<dat.length;i++){
         if(dat[i].reg_no==this.staffdata[j].reg_no && this.staffdata[j].college==this.college &&  (dat[i].role=='HOD' || dat[i].role=='Dean') ){
           this.data.push(dat[i])
           break;
         }
       }
        
      }
      
        }
       this.popup1.hide();
  });
    }else if(data!=''){
      this.popToast();
    }
})

}
}
change(){
  if(this.typess=='Select'){
    this.popToast2()
  }else{

  

 const value={
   reg_no : this.reg_no,
   role   : this.rolename,
   role_id: this.roleid
  }
  this.service.changeroles(value).subscribe(data=>{
    if(data==''){
      this.typess = 'Select'
     this.service.getroleslist().subscribe(dat=>{
         
        if(this.role=='admin'){
      this.data = dat
      }else if(this.role=='Principal'){
         this.data = []
        for(var j=0;j<this.staffdata.length;j++){
        
       for(var i=0;i<dat.length;i++){
         if(dat[i].reg_no==this.staffdata[j].reg_no && this.staffdata[j].college==this.college &&  (dat[i].role=='HOD' || dat[i].role=='Dean') ){
           this.data.push(dat[i])
           break;
         }
       }
        
      }
      
        }
   
  });
  this.popup2.hide();
    }else if(data!=''){
      this.popToast();
    }
})

  }
}
addpopup(){

    this.rolename = '';
    this.reg_no   = '';
    this.typess   = 'Select'
    
   this.popup1.options = {
    header           : "Assign new role",
    color            : '#34495e',
    widthProsentage  : 40,                             // The with of the popou measured by browser width 
    animationDuration: 1,                              // in seconds, 0 = no animation 
    showButtons      : true,                           // You can hide this in case you want to use custom buttons 
    cancleBtnContent : "Cancel",                       // the text on your cancel button 
    confirmBtnContent: "Assign",                       // The text on your confirm button 
    confirmBtnClass  : "btn btn-default btn-square",   // your class for styling the confirm button 
    cancleBtnClass   : "btn btn-danger btn-square",    // you class for styling the cancel button 
    animation        : "fadeInDown"                    // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
};
 
  this.popup1.show(this.popup1.options);
}
  delpopup(details){
    this.roleid         = details.role_id;
    this.rolename       = details.role;
    this.reg_no         = details.reg_no;
    this.popup3.options = {
    header           : "Delete User Role",
    color            : '#34495e',
    widthProsentage  : 40,                             // The with of the popou measured by browser width 
    animationDuration: 1,                              // in seconds, 0 = no animation 
    showButtons      : true,                           // You can hide this in case you want to use custom buttons 
    cancleBtnContent : "Cancel",                       // the text on your cancel button 
    confirmBtnContent: "Delete",                       // The text on your confirm button 
    confirmBtnClass  : "btn btn-danger btn-square",    // your class for styling the confirm button 
    cancleBtnClass   : "btn btn-default btn-square",   // you class for styling the cancel button 
    animation        : "fadeInDown"                    // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
};
 
  this.popup3.show(this.popup3.options);
}

  changepopup(details){
    this.roleid   = details.role_id;
    this.rolename = details.role;
    this.reg_no   = details.reg_no;

    this.popup2.options = {
    header           : "Change User Role",
    color            : '#34495e',
    widthProsentage  : 40,                             // The with of the popou measured by browser width 
    animationDuration: 1,                              // in seconds, 0 = no animation 
    showButtons      : true,                           // You can hide this in case you want to use custom buttons 
    cancleBtnContent : "Cancel",                       // the text on your cancel button 
    confirmBtnContent: "Change",                       // The text on your confirm button 
    confirmBtnClass  : "btn btn-default btn-square",   // your class for styling the confirm button 
    cancleBtnClass   : "btn btn-danger btn-square",    // you class for styling the cancel button 
    animation        : "fadeInDown"                    // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
};
 
  this.popup2.show(this.popup2.options);
}
Type(role){
this.rolename = role;
this.typess   = role;
}
userType(type){
this.status = type
}

}
