import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from "app/Services/app.service";
import { Popup } from 'ng2-opd-popup';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
declare var $;
@Component({
  selector   : 'app-adminleavetypes',
  templateUrl: './adminleavetypes.component.html',
  styleUrls  : ['./adminleavetypes.component.css']
})
export class AdminleavetypesComponent implements OnInit {
  showval = '';

  typels : any;
  typel  : any;
  statusl: any;
  ltype  : any;
  status     = 'Select';
  show       = 'Select';
  leavetypes = [];
  type       = ''
  typeval    = ''
  typename   = ''
  carryfwd   = ''
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4: Popup;

  public toasterconfig: ToasterConfig = 
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss   : true,
    timeout        : 5000

  });
  public toasterService: ToasterService;
  constructor(private service: AppService, public popup: Popup, toasterService: ToasterService) {

    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.service.getadminleavetypes().subscribe(data => {
      console.log(data, ' admin testing');
      this.leavetypes = data

    });
  
  }

  enabpopup(status, a) {
    this.statusl        = status;
    this.typel          = a.type
    this.typels         = a.typename
    this.typeval        = a.totaldays
    this.popup4.options = {
      header           : "Assign Leave",
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

    this.popup4.show(this.popup4.options);
  }

  go() {
  
    
if(this.typeval=='' || this.show=='Select'){
this.popToast2();
}else{
    const data = {
      lstatus : this.statusl,
      type    : this.typel,
      typename: this.typels,
      value   : this.typeval,
      carry   : this.showval
    }
    this.service.updateleavetype(data).subscribe(data => {

      this.service.getadminleavetypes().subscribe(dat => {

        this.leavetypes = dat
        this.show       = 'Select'
        this.typeval    = ''

      });
    })

    this.popup4.hide();

  }
  }
  godis(status, val) {
    console.log(status, val.type, ' status test');
    const data = {
      lstatus : status,
      type    : val.type,
      typename: val.typename,
      value   : 0,
      carry   : 0
    }
    this.service.updateleavetype(data).subscribe(data => {

      this.service.getadminleavetypes().subscribe(dat => {

        this.leavetypes = dat
        this.show       = 'Select'
        this.typeval    = ''
      });
    })

  }

  popToast() {
    this.toasterService.pop('warning', '', 'This Leave type is already exist. please enter unique leave type');

  }
  popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');

  }

  Type(a) {
    this.status = a;
    console.log(this.status, 'status checking');

  }
  Types(val,b){
    this.show    = b
    this.showval = val
  }

  addleavetype() {

    if(this.status=='Select' || this.type=='' || this.typeval=='' ||this.show=='Select'){
this.popToast2();
    }else{

    var   lower         = this.type.toLowerCase();
          this.typename = lower.replace(/ /g, "_");
    const data          = {

      lstatus : this.status,
      type    : this.type,
      typename: this.typename,
      value   : this.typeval,
      carry   : this.showval
    }
    console.log(data, 'data add new leave type ');


    this.service.addleavetype(data).subscribe(data => {
      
      if (data == '') {

        this.service.getadminleavetypes().subscribe(dat => {
           this.typeval = ''
           this.status  = 'Select'
           this.type    = ''
           this.show    = 'Select'

          this.leavetypes = dat

        });

        this.popup1.hide();
      } else if (data != '') {
        this.popToast();
      }
    })
    }
  }
  delete(type) {
    this.ltype          = type
    this.popup3.options = {
      header           : "Delete Leave Type",
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

  deleteleavetype() {

    const data = {
      type: this.ltype
    }
    console.log(data, 'data add new leave type ');


    this.service.deleteleavetype(data).subscribe(data => {

      this.service.getadminleavetypes().subscribe(dat => {

        this.leavetypes = dat

      });
    })
    this.popup3.hide();
  }
  get() {
    this.type           = ''
    this.popup1.options = {
      header           : "Add New Leave Type",
      color            : '#34495e',
      widthProsentage  : 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons      : true,                           // You can hide this in case you want to use custom buttons 
      cancleBtnContent : "Cancel",                       // the text on your cancel button 
      confirmBtnContent: "OK",                           // The text on your confirm button 
      confirmBtnClass  : "btn btn-default btn-square",   // your class for styling the confirm button 
      cancleBtnClass   : "btn btn-danger btn-square",    // you class for styling the cancel button 
      animation        : "fadeInDown"                    // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup1.show(this.popup1.options);
  }

}
