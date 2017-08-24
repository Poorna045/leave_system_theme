import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from "app/Services/app.service";
import { Popup } from "ng2-opd-popup";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
declare var $;
@Component({
  selector   : 'app-assignleaves',
  templateUrl: './assignleaves.component.html',
  styleUrls  : ['./assignleaves.component.css']
})
export class AssignleavesComponent implements OnInit {
  types     = 'Select';
  leavetype = [];
  dispname: any;
  employment_type = '';
  designation: any;
  reg_no     : any;
  department : any;
  college    : any;

  dateshow: any;
  sno     : any;
  holname : any;
  holdate : any;
  holtype : any;

  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup1') popup1: Popup;

  title   = 'app works!';
  data    = []
  newdata = []
  role
  dept
  public filterQuery                  = '';
  public rowsOnPage                   = 5;
  public sortBy                       = "";
  public sortOrder                    = "asc";
         dropdownList                 = [];
         selectedItems                = [];
         dropdownSettings             = {};
  public toasterconfig: ToasterConfig = 
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss   : true,
    timeout        : 5000

  });
  public toasterService: ToasterService;
  constructor(private service: AppService, public popup: Popup, toasterService: ToasterService) {
    this.toasterService = toasterService;
    this.role           = localStorage.getItem('empRole');
    this.dept           = localStorage.getItem('empdept');
    this.college        = localStorage.getItem('empcolg');
    console.log(this.role, 'role type');
    console.log(this.dept, 'department type');

  }
  Type(type) {
    this.types = type;
  }
  test(a, value) {
    console.log(value, 'selected value');
    console.log(a, 'a test');

  }


  onItemSelect(item: any) {
    console.log(item);



  }
  OnItemDeSelect(item: any) {
    console.log(item);

  }


  ngOnInit() {

    //       this.service.getnewUserslist().subscribe(data=>{this.data=data

    //   console.log(data,'data in leaves assign table');

    // });


    this.service.getTypeleavesdata().subscribe(data => {


      this.service.getStaffData(localStorage.getItem('utype')).subscribe(dats => {

     var ds = 0
        for (var j = 0; j < dats.data.data.length; j++) {
          var check = 0;
          for (var i = 0; i < data.length; i++) {


        

            if (data[i].reg_no == dats.data.data[j].reg_no && this.role=='admin') {
              check = 1

              break;
            }else if(data[i].reg_no == dats.data.data[j].reg_no && this.role=='Principal' && dats.data.data[j].college==this.college){

              check = 1

              break;
            }

        
          }
          if (check == 0) {
            dats.data.data[j].dp = ''
            this.data.push(dats.data.data[j])
           ds++
          }


        }
        console.log(this.data, 'data test');



      })
    })



    this.service.leavestype().subscribe(data => {

      console.log(data, 'leave types');
      for (var i = 0; i < data.length; i++) {
        if (data[i].type == 'LOP') {
          data.splice(i, 1);
          break;
        }
      }
      for (var i = 0; i < data.length; i++) {
        if (data[i].typename == 'compensatory_leave') {
          data.splice(i, 1);
          break;
        }
      }
      this.leavetype = data
    })
    setTimeout(function () {

    }, 3000)
  }

  popToast() {
    this.toasterService.pop('warning', '', 'This Date is already exist in the Holidays Table . please enter unique Date');

  }
    popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');

  }

  delete() {
    const value = {
      sno: this.sno
    }
    this.service.deleteholiday(value).subscribe(dat => {
      this.service.getHolidaylist().subscribe(data => {
        this.data = data

      });
    })
    this.popup3.hide();
  }

  add() {

    const value = {
      holname: this.holname,
      holdate: this.holdate,
      holtype: this.holtype

    }
    this.service.addholiday(value).subscribe(dat => {
      console.log(dat, 'dat testing');

      if (dat == '') {
        this.service.getHolidaylist().subscribe(data => {
          this.data = data
          this.popup1.hide();
        });
      } else if (dat != '') {
        this.popToast();
      }
    })


  }
  assign() {
    console.log(this.leavetype, 'values testing in leave type array');

    const value = {
      reg_no: this.reg_no,
      leaves: this.leavetype,
      name  : this.dispname
    }

    this.service.assignleaves(value).subscribe(dat => {
     
      this.service.getTypeleavesdata().subscribe(data => {


      this.service.getStaffData(localStorage.getItem('utype')).subscribe(dats => {
                             this.data = []
                         var ds        = 0
        for (var j = 0; j < dats.data.data.length; j++) {
          var check = 0;
          for (var i = 0; i < data.length; i++) {


        

            if (data[i].reg_no == dats.data.data[j].reg_no && this.role=='admin') {
              check = 1

              break;
            }else if(data[i].reg_no == dats.data.data[j].reg_no && this.role=='Principal' && dats.data.data[j].college==this.college){

              check = 1

              break;
            }

        
          }
          if (check == 0) {
            dats.data.data[j].dp = ''
            this.data.push(dats.data.data[j])
           ds++
          }


        }
        console.log(this.data, 'data test');



      })
    })
    })
    this.popup2.hide();

  }
  addpopup() {

    this.holdate = '';
    this.holname = '';
    this.holtype = '';

    this.popup1.options = {
      header           : "Add New Holiday",
      color            : '#34495e',
      widthProsentage  : 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons      : true,                           // You can hide this in case you want to use custom buttons 
      cancleBtnContent : "Cancel",                       // the text on your cancel button 
      confirmBtnContent: "Add",                          // The text on your confirm button 
      confirmBtnClass  : "btn btn-default btn-square",   // your class for styling the confirm button 
      cancleBtnClass   : "btn btn-danger btn-square",    // you class for styling the cancel button 
      animation        : "fadeInDown"                    // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup1.show(this.popup1.options);
  }
  delpopup(sno, date) {
    this.dateshow       = date;
    this.sno            = sno;
    this.popup3.options = {
      header           : "Delete holiday",
      color            : '#34495e',
      widthProsentage  : 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons      : true,                           // You can hide this in case you want to use custom buttons 
      cancleBtnContent : "Cancel",                       // the text on your cancel button 
      confirmBtnContent: "Delete",                       // The text on your confirm button 
      confirmBtnClass  : "btn btn-default btn-square",   // your class for styling the confirm button 
      cancleBtnClass   : "btn btn-danger btn-square",    // you class for styling the cancel button 
      animation        : "fadeInDown"                    // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup3.show(this.popup3.options);
  }

  assignpopup(details) {
    this.college         = details.college;
    this.department      = details.department;
    this.reg_no          = details.reg_no;
    this.designation     = details.designation;
    this.employment_type = details.employment_type;
    this.dispname        = details.name;

    var hed                 = "Assign Leaves for " + this.dispname + " \xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0 emp type : " + this.employment_type;
        this.popup2.options = {
      header           : hed,
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

    this.popup2.show(this.popup2.options);
  }



}
