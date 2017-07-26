import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from "app/Services/app.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Popup } from "ng2-opd-popup";
declare var $;

@Component({
  selector   : 'app-coffapproval',
  templateUrl: './coffapproval.component.html',
  styleUrls  : ['./coffapproval.component.css']
})
export class CoffapprovalComponent implements OnInit {
  usermail: any;
  emails = [];
  reg_no : string;
  dept   : any;
  college: string;

  alterid: any;
  removespc = '';
i
  uname: any;
  show = false;
  sid: any;
                                     role    = localStorage.getItem('empRole');
                     backgroundColor: string = "#f7a35c";
  dash: any;
  title = 'app works!';
  data  = []
  id
  days
  eid
  lid
  tol
  avlid
  typeofL
  reasoninfo
  roleData = []

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;

  public filterQuery = '';
  public date1       = "";
  public date2       = "";
  public rowsOnPage  = 5;
  public sortBy      = "";
  public sortOrder   = "asc";

  leaves = {
    sick_leave        : '',
    prevelege_leave   : '',
    compensatory_leave: '',
    study_leave       : '',
    casual_leave      : '',
    lop               : 0
  }



  public toasterconfig: ToasterConfig = 
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss   : true,
    timeout        : 5000

  });


  private toasterService: ToasterService


  constructor(private service: AppService, toasterService: ToasterService, private popup: Popup) {

    this.toasterService = toasterService;
  

  }


  ngOnInit() {
    this.college = localStorage.getItem('empcolg')
    this.dept    = localStorage.getItem('empdept')
    this.role    = localStorage.getItem('empRole');
    this.reg_no  = localStorage.getItem('emp_id');
      this.service.getHistoryBYCoffStatus().subscribe(data => {

      console.log(data, 'data approval');

     

      const val = {
        utype  : 'adm',
        college: localStorage.getItem('empcolg'),
        dept   : localStorage.getItem('empdept')

      }
      this.service.getStaffData(val).subscribe(dats => {
        // this.data=data.data.data
        this.service.getroleslist().subscribe(role=>{
             
             this.roleData = role
              for(var d=0;d<dats.data.data.length;d++){
                let check = 0
             for(var k=0;k<role.length;k++){
            
               
               if(dats.data.data[d].reg_no==role[k].reg_no){
                 dats.data.data[d].role = role[k].role;


                    if(this.role=='HOD'){
                 if(((role[k].role=='HOD' &&  dats.data.data[d].department==this.dept) ||( role[k].role=='Principal')) && this.college==dats.data.data[d].college ){
                   this.emails.push(dats.data.data[d].email)
                  
                   
                 }
                 }else if(this.role=='Principal'){
                    if( role[k].role=='Principal' && this.college==dats.data.data[d].college ){
                   this.emails.push(dats.data.data[d].email)
                   
                   
                 }
                }
                else if(this.role=='Management'){
                    if( role[k].role=='Principal' ){
                   this.emails.push(dats.data.data[d].email)
                   
                   
                 }
                }

               check = 1
                break
                 
          
               }
             }
             if(check==0){
                 dats.data.data[d].role = 'Staff';

               }
            }
            
              
        this.service.staffclgdata = dats.data.data
        if (this.role == 'HOD') {
          
          for (var i = 0; i < data.length; i++) {
 for (var j = 0; j < dats.data.data.length; j++) {
           

              
                if (data[i].reg_no == dats.data.data[j].reg_no && dats.data.data[j].college == this.college && data[i].status=='Pending' && dats.data.data[j].department == this.dept && data[i].reg_no!=this.reg_no && dats.data.data[j].role=='Staff' ) {
                  data[i].dispname    = dats.data.data[j].name;
                  data[i].college     = dats.data.data[j].college;
                  data[i].department  = dats.data.data[j].department;
                  data[i].designation = dats.data.data[j].designation;
                  data[i].role        = dats.data.data[j].role;
                  data[i].email       = dats.data.data[j].email
        this.data.push(data[i])
   break
             
              }
            }


          }
        }else if(this.role=='Principal'){

for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < dats.data.data.length; j++) {

      
               if (data[i].reg_no == dats.data.data[j].reg_no && dats.data.data[j].college==this.college && data[i].status=='Pending' && data[i].reg_no!=this.reg_no && ( dats.data.data[j].role=='HOD' || dats.data.data[j].role=='Dean' ) ) {
                  data[i].dispname    = dats.data.data[j].name;
                  data[i].college     = dats.data.data[j].college;
                  data[i].department  = dats.data.data[j].department;
                  data[i].designation = dats.data.data[j].designation;
                  data[i].role        = dats.data.data[j].role;
                  data[i].email       = dats.data.data[j].email
                    this.data.push(data[i])
                    break

                }
              
            }


          }
          

        }else if(this.role=='Management'){
          for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < dats.data.data.length; j++) {

      
               if (data[i].reg_no == dats.data.data[j].reg_no && data[i].status=='Pending' && dats.data.data[j].role=='Principal') {
                  data[i].dispname    = dats.data.data[j].name;
                  data[i].college     = dats.data.data[j].college;
                  data[i].department  = dats.data.data[j].department;
                  data[i].designation = dats.data.data[j].designation;
                  data[i].role        = dats.data.data[j].role;
                  data[i].email       = dats.data.data[j].email
                    this.data.push(data[i])
                    break
        
                }
              
            }


          }
        }


        
        console.log('clg data testing', dats.data.data);
        console.log(this.service.staffclgdata);
      })
      })
    });
   }

  assignData(data) {
    this.days     = data.days
    this.eid      = data.reg_no
    this.lid      = data.cid
    this.sid      = data.dispname
    this.usermail = data.email
  }


cancelreason(){
    this.reasoninfo = ''
  }
  ResponseR(type) {
    console.log(type, this.reasoninfo, 'type of apply');

  this.emails.push(this.usermail)

    let data = {
      type      : type,
      reason    : this.reasoninfo,
      days      : this.days,
      eid       : this.eid,
      cid       : this.lid,
      username  : this.sid,
      rejectedBy: this.role,
      dept      : localStorage.getItem('empdept'),
      colg      : localStorage.getItem('empcolg'),
      role      : localStorage.getItem('empRole'),
      name      : localStorage.getItem('empName'),
      email     : this.emails

    }

    this.service.upRejectcoff(data).subscribe(datass => {
   this.emails.slice(this.emails.length-1,1)
      console.log(this.leaves, 'leaves')
      if (type == 'Rejected') {
        this.rejected()
      }
      else {
        this.alter();
      }
      this.service.getHistoryBYCoffStatus().subscribe(data => {
                              this.removespc = ''
                              this.data      = []
                        const val            = {
        utype  : 'adm',
        college: localStorage.getItem('empcolg'),
        dept   : localStorage.getItem('empdept')

      }
      this.service.getStaffData(val).subscribe(dats => {
        // this.data=data.data.data
        this.service.getroleslist().subscribe(role=>{
             
             this.roleData = role
             for(var d=0;d<dats.data.data.length;d++){
               let check = 0
             for(var k=0;k<role.length;k++){
             
               
               if(dats.data.data[d].reg_no==role[k].reg_no){
                 dats.data.data[d].role = role[k].role;
                 
         check = 1
         break
               }
             }
             if(check==0){
                    dats.data.data[d].role = 'Staff';

             }
            }
            
              
        this.service.staffclgdata = dats.data.data
        if (this.role == 'HOD') {
          for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < dats.data.data.length; j++) {

              
                if (data[i].reg_no == dats.data.data[j].reg_no && dats.data.data[j].college == this.college && data[i].status=='Pending' && dats.data.data[j].department == this.dept && data[i].reg_no!=this.reg_no && dats.data.data[j].role=='Staff' ) {
                  data[i].dispname    = dats.data.data[j].name;
                  data[i].college     = dats.data.data[j].college;
                  data[i].department  = dats.data.data[j].department;
                  data[i].designation = dats.data.data[j].designation;
                  data[i].role        = dats.data.data[j].role;
                  data[i].email       = dats.data.data[j].email

  
               break
              }
            }


          }
        }else if(this.role=='Principal'){

for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < dats.data.data.length; j++) {

      
               if (data[i].reg_no == dats.data.data[j].reg_no && dats.data.data[j].college==this.college && data[i].status=='Pending' && data[i].reg_no!=this.reg_no && (dats.data.data[j].role=='HOD' || dats.data.data[j].role=='Dean') ) {
                  data[i].dispname    = dats.data.data[j].name;
                  data[i].college     = dats.data.data[j].college;
                  data[i].department  = dats.data.data[j].department;
                  data[i].designation = dats.data.data[j].designation;
                  data[i].role        = dats.data.data[j].role;
                  data[i].email       = dats.data.data[j].email
                   break
  
                }
              
            }


          }
          

        }else if(this.role=='Management'){
          for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < dats.data.data.length; j++) {

      
               if (data[i].reg_no == dats.data.data[j].reg_no && data[i].status=='Pending' && dats.data.data[j].role=='Principal') {
                  data[i].dispname    = dats.data.data[j].name;
                  data[i].college     = dats.data.data[j].college;
                  data[i].department  = dats.data.data[j].department;
                  data[i].designation = dats.data.data[j].designation;
                  data[i].role        = dats.data.data[j].role;
                  data[i].email       = dats.data.data[j].email
                   break
        
                }
              
            }


          }
        }


        
        console.log('clg data testing', dats.data.data);
        console.log(this.service.staffclgdata);
      })
      })
      });
    }
    );

  }
  go(name) {
    this.uname = name;
    console.log(this.typeofL, 'type of leave sss');



    this.service.getoneAvail(this.id, this.avlid).subscribe(data => {
      this.leaves     = data
      this.leaves.lop = parseInt(data.lop);


      this.popup2.options = {
        header           : this.uname+"'  Available Leaves",
        color            : "#34495e",                          // red, blue.... 
        widthProsentage  : 40,                                 // The with of the popou measured by browser width 
        animationDuration: 1,                                  // in seconds, 0 = no animation 
        showButtons      : false,                              // You can hide this in case you want to use custom buttons 
        confirmBtnContent: "OK",                               // The text on your confirm button 
        cancleBtnContent : "Cancel",                           // the text on your cancel button 
        confirmBtnClass  : "btn btn-default btn-square",       // your class for styling the confirm button 
        cancleBtnClass   : "btn btn-danger btn-square",        // you class for styling the cancel button 
        animation        : "fadeInDown"                        // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
      };

      this.popup2.show(this.popup2.options);
    }
    );
  }

  hoverout() {
    console.log('hover out');
    this.popup2.hide();
  }

  accept(id,un,type) {
    this.sid = un;
this.emails.push(this.usermail)
   let data = {
      eid       : this.eid,
      type      : type,
      days      : this.days,
      cid       : this.lid,
      username  : this.sid,
      dept      : localStorage.getItem('empdept'),
      colg      : localStorage.getItem('empcolg'),
      acceptedBy: localStorage.getItem('empRole'),
      name      : localStorage.getItem('empName'),
      email     : this.emails

    }



    this.service.updateAcceptCoffStatus(data).subscribe(data => {
     
     this.emails.slice(this.emails.length-1,1)
      console.log(this.data, 'leaves')
      this.service.getHistoryBYCoffStatus()
        .subscribe(data => {

                                     this.data = []
                               const val       = {
        utype  : 'adm',
        college: localStorage.getItem('empcolg'),
        dept   : localStorage.getItem('empdept')

      }
      this.service.getStaffData(val).subscribe(dats => {
        // this.data=data.data.data
        this.service.getroleslist().subscribe(role=>{
             
             this.roleData = role
             for(var d=0;d<dats.data.data.length;d++){
               let check = 0
             for(var k=0;k<role.length;k++){
             
               
               if(dats.data.data[d].reg_no==role[k].reg_no){
                 dats.data.data[d].role = role[k].role;
                 
         check = 1
         break
               }
             }
             if(check==0){
                    dats.data.data[d].role = 'Staff';

             }
            }
            
              
        this.service.staffclgdata = dats.data.data
        if (this.role == 'HOD') {
          for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < dats.data.data.length; j++) {

              
                if (data[i].reg_no == dats.data.data[j].reg_no && dats.data.data[j].college == this.college && data[i].status=='Pending' && dats.data.data[j].department == this.dept && data[i].reg_no!=this.reg_no && dats.data.data[j].role=='Staff' ) {
                  data[i].dispname    = dats.data.data[j].name;
                  data[i].college     = dats.data.data[j].college;
                  data[i].department  = dats.data.data[j].department;
                  data[i].designation = dats.data.data[j].designation;
                  data[i].role        = dats.data.data[j].role;
                  data[i].email       = dats.data.data[j].email
                  break

  
                
              }
            }


          }
        }else if(this.role=='Principal'){

for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < dats.data.data.length; j++) {

      
               if (data[i].reg_no == dats.data.data[j].reg_no && dats.data.data[j].college==this.college && data[i].status=='Pending' && data[i].reg_no!=this.reg_no && (dats.data.data[j].role=='HOD' || dats.data.data[j].role=='Dean') ) {
                  data[i].dispname    = dats.data.data[j].name;
                  data[i].college     = dats.data.data[j].college;
                  data[i].department  = dats.data.data[j].department;
                  data[i].designation = dats.data.data[j].designation;
                  data[i].role        = dats.data.data[j].role;
                  data[i].email       = dats.data.data[j].email
                  break

                }
              
            }


          }
          

        }else if(this.role=='Management'){
          for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < dats.data.data.length; j++) {

      
               if (data[i].reg_no == dats.data.data[j].reg_no && data[i].status=='Pending' && dats.data.data[j].role=='Principal') {
                  data[i].dispname    = dats.data.data[j].name;
                  data[i].college     = dats.data.data[j].college;
                  data[i].department  = dats.data.data[j].department;
                  data[i].designation = dats.data.data[j].designation;
                  data[i].role        = dats.data.data[j].role;
                  data[i].email       = dats.data.data[j].email
                  break
       
                }
              
            }


          }
        }


        
        console.log('clg data testing', dats.data.data);
        console.log(this.service.staffclgdata);
      })
      })

          this.accepted();


         
        });
    });
    //  this.popToast();
  }
  accepted() {
    this.toasterService.pop('success', '', " Succesfully Accepted " + this.sid + " ' s" + " request!");
  }
  rejected() {
    this.toasterService.pop('warning', '', 'Rejected c-off request Successful');
  }
  alter() {
    this.toasterService.pop('warning', '', 'Your Suggestion is Successful');
  }
  goPopup2() {
    //myModal.open()
    console.log('test');

    this.popup1.options = {
      header           : "Info!",
      color            : "#34495e",        // red, blue.... 
      widthProsentage  : 50,               // The with of the popou measured by browser width 
      animationDuration: 1,
      showButtons      : false,            // You can hide this in case you want to use custom buttons 
      animation        : "bounceInDown",   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

  }

   removespaces(e) {
        this.removespc = e.replace(/\s+/g, '');
    }



}
