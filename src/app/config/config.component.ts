import { Component, OnInit,ViewChild } from '@angular/core';
import { AppService } from "app/Services/app.service";
import { Popup } from "ng2-opd-popup";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
declare var $;
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  sno='';
  email='';
  designation='';
  emails = [];


  typesss='Select';
  reg_no = '';
  rolename='';
  roleid='';
typess='Select'
roles=[]

@ViewChild('popup3') popup3: Popup;
@ViewChild('popup2') popup2: Popup;
@ViewChild('popup1') popup1: Popup;

 title = 'app works!';
    data

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
   

  
  }
  public items = [];
 
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;
 
  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public selected(value:any):void {
    console.log('Selected value is: ', value);
    this.reg_no=value.id
  }
 
  public removed(value:any):void {
    //console.log('Removed value is: ', value);
  }
 
  public typed(value:any):void {
   // console.log('New search input: ', value);
  }
 
  public refreshValue(value:any):void {
    this.value = value;
  }

  ngOnInit() {

      this.service.getStaffData(localStorage.getItem('utype')).subscribe(dats=>{

        for(var i=0;i<dats.data.data.length;i++){
          this.items[i]=new Object();
          this.items[i].name=dats.data.data[i].name
          this.items[i].reg_no=dats.data.data[i].reg_no
        }
        console.log(this.items,'items test');
        
       
        // setTimeout(function () {
           
        // }, 3000)
  console.log(dats,'data in assign roles table');
 
});
    this.service.getmails().subscribe(data => {
            this.emails = data;
    
})
  }


Types(a){
  this.reg_no=a.reg_no
  this.typesss=a.name
}
popToast() {
        this.toasterService.pop('warning', '', 'please ensure that unique email and designation !');

    }
 popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');

  }

delete(){
  const value={
    sno:this.sno
  }
  this.service.deleteconfig(value).subscribe(dat=>{
     this.service.getmails().subscribe(data => {
            this.emails = data;
    
})
  })
this.popup3.hide();
}

assign(){
if(this.designation=='' || this.email==''){
  this.popToast2()
}else{
  const value={
   designation:this.designation,
   email:this.email,
  }
  this.service.addconfig(value).subscribe(dat=>{
    console.log(dat,'dat testing');
    
    if(dat!='already exists'){
      this.designation=''
      this.email=''
       this.service.getmails().subscribe(data => {
            this.emails = data;
            console.log(this.emails,'emailtrest');
            
            this.popup1.hide();
    
})
    }else if(dat=='already exists'){
      this.popToast();
    }
})

}
}
change(){
if(this.email==''){
  this.popToast2()
}else{
 const value={
   designation:this.designation,
   email:this.email,
   sno:this.sno
  }
  this.service.changeconfig(value).subscribe(dat=>{
    this.email=''
    this.service.getmails().subscribe(data => {
            this.emails = data;
    this.popup2.hide()
})
})

}
}
addpopup(){

    this.designation='';
    this.email='';
    //this.typess='Select'
    
   this.popup1.options = {
    header: "Add New User",
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
  delpopup(details){
this.designation=details.designation;
    this.email=details.email;
    this.sno=details.sno;
    this.popup3.options = {
    header: "Delete User",
   color:'#34495e', 
    widthProsentage: 40, // The with of the popou measured by browser width 
    animationDuration: 1, // in seconds, 0 = no animation 
    showButtons: true, // You can hide this in case you want to use custom buttons 
       cancleBtnContent: "Cancel", // the text on your cancel button 
    confirmBtnContent: "Delete", // The text on your confirm button 
    confirmBtnClass: "btn btn-danger btn-square", // your class for styling the confirm button 
    cancleBtnClass: "btn btn-default btn-square", // you class for styling the cancel button 
    animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
};
 
  this.popup3.show(this.popup3.options);
}

  changepopup(details){
    console.log(details,'det');
    
    this.designation=details.designation;
    this.email=details.email;
    this.sno=details.sno;

    this.popup2.options = {
    header: "Change User Details",
   color:'#34495e', 
    widthProsentage: 40, // The with of the popou measured by browser width 
    animationDuration: 1, // in seconds, 0 = no animation 
    showButtons: true, // You can hide this in case you want to use custom buttons 
       cancleBtnContent: "Cancel", // the text on your cancel button 
    confirmBtnContent: "Change", // The text on your confirm button 
    confirmBtnClass: "btn btn-default btn-square", // your class for styling the confirm button 
    cancleBtnClass: "btn btn-danger btn-square", // you class for styling the cancel button 
    animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
};
 
  this.popup2.show(this.popup2.options);
}
Type(role){
this.rolename=role;
this.typess=role;
}


}
