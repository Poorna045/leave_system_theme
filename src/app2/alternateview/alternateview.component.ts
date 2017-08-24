import { Component, OnInit } from '@angular/core';
import { AppService } from "app/Services/app.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
declare var $;
@Component({
  selector   : 'app-alternateview',
  templateUrl: './alternateview.component.html',
  styleUrls  : ['./alternateview.component.css']
})
export class AlternateviewComponent implements OnInit {
  allmails = [];
  usermail: any;
  dept    : string;
  college : string;
  emails   = [];
  roleData = [];
  uid  : any;
  uname: any;
  removespc = ''
  today: any;
  delegateReason = '';
  role: string;
  data = [];
  id   = localStorage.getItem('emp_id');
  lid
                                                                                                                                                                                                                                                                     toasterid   = 0
                                                                                                                                                                                                                                                                     name        = localStorage.getItem('empName');
                                                                                                                                                                                                                                                              public filterQuery = "";
                                                                                                                                                                                                                                                              public date1       = ''
                                                                                                                                                                                                                                                              public date2       = ''
                                                                                                                                                                                                                                                              public rowsOnPage  = 5;
                                                                                                                                                                                                                                                              public sortBy      = "from_date";
                                                                                                                                                                                                                                                              public sortOrder   = "desc";

  private toasterService: ToasterService

  public toasterconfig: ToasterConfig = 
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss   : true,
    timeout        : 2000

  });
  constructor(private service: AppService, toasterService: ToasterService) {

    this.toasterService = toasterService;

  }

  status(lid, status) {
    console.log(lid, '<== lid ', this.delegateReason, ' <== reason check');
    this.emails.push(localStorage.getItem('email'))
    this.emails.push(this.usermail)
    for(var i=0;i<this.allmails.length;i++){
      this.emails.push(this.allmails[i]);
    }


    this.service.statusAlternate(lid, status, this.delegateReason, this.name, this.uname, this.uid, this.emails).subscribe(data => {

      console.log(data, 'alternate status')
      this.service.alternateData(this.id)
        .subscribe(data => {
          this.removespc      = ''
          this.delegateReason = ''

          const val = {
            utype: 'adm',

          }
          this.service.getStaffData(val).subscribe(dats => {
            // this.data=data.data.data
            this.service.getroleslist().subscribe(role => {

              this.emails   = []
              this.allmails = []
              this.roleData = role
              for (var d = 0; d < dats.data.data.length; d++) {
                let check = 0;
                for (var k = 0; k < role.length; k++) {


                  if (dats.data.data[d].reg_no == role[k].reg_no) {
                    dats.data.data[d].role = role[k].role;



                    check = 1
                    break;

                  }
                }
                if (check == 0) {
                  dats.data.data[d].role = 'Staff';

                }
              }
              this.service.staffclgdata = dats.data.data
              this.data                 = []
               for (var j = 0; j < dats.data.data.length; j++) {
              for (var i = 0; i < data.length; i++) {

               

                  if (data[i].reg_no == dats.data.data[j].reg_no) {

                    data           [i].dispname    = dats.data.data[j].name;
                    data           [i].college     = dats.data.data[j].college;
                    data           [i].department  = dats.data.data[j].department;
                    data           [i].designation = dats.data.data[j].designation;
                    data           [i].email       = dats.data.data[j].email
                    dats.data.data[j].dp           = ''
                    this.data.push(data[i])
                    break;
                  }
                }

              }

             for (var i = 0; i < this.data.length; i++) {
              this.data[i].emails = []
              for (var j = 0; j < dats.data.data.length; j++) {

                  if( ( (dats.data.data[j].role=='HOD' && dats.data.data[j].department==this.dept) || dats.data.data[j].role=='Principal') && dats.data.data[j].college==this.college )   {          

                  this.data[i].emails.push(dats.data.data[j].email)
                  
                }
              }

            }
              // this.data = data
              console.log('clg data testing', dats);
              console.log(this.data,'rolee data');
            })
          })
          console.log(data, 'alterate data test');
          if (this.toasterid == 0) {
            this.accepted();
          }
          if (this.toasterid == 1) {
            this.rejected();
            this.toasterid = 0;
          }

        });
    });
  }
  accepted() {
    this.toasterService.pop('success', '', 'Accepted ');
  }
  rejected() {
    this.toasterService.pop('warning', '', 'Rejected');
  }
  reject(a) {
    this.lid   = a.leave_id;
    this.uname = a.dispname;
    this.uid   = a.reg_no;
    console.log('reject option');
    this.toasterid = 1;
    this.usermail  = a.email
    this.allmails  = a.emails
  }
  accept(a) {
    this.uname = a.dispname;
    this.lid   = a.leave_id;
    this.uid   = a.reg_no;
    console.log('accept option');
    this.toasterid = 0;
    this.usermail  = a.email
    this.allmails  = a.emails
  }
  removespaces(e) {
    this.removespc = e.replace(/\s+/g, '');
  }
  ngOnInit() {

       setTimeout(function () {
      $(function () {
        $("#sidebar-toggle").click(function (e) {
          e.preventDefault();
          $(".navbar-side").toggleClass("collapsed");
          $("#page-wrapper").toggleClass("collapsed");
        });
      });
    }, 1000)
    
    this.college = localStorage.getItem('empcolg')
    this.dept    = localStorage.getItem('empdept')
    this.role    = localStorage.getItem('empRole');

    this.service.alternateData(this.id)
      .subscribe(data => {

        const val = {
          utype: 'adm',


        }
        this.service.getStaffData(val).subscribe(dats => {
          // this.data=data.data.data
          this.service.getroleslist().subscribe(role => {


            this.roleData = role
            for (var d = 0; d < dats.data.data.length; d++) {
              let check = 0
              for (var k = 0; k < role.length; k++) {


                if (dats.data.data[d].reg_no == role[k].reg_no) {
                  dats.data.data[d].role = role[k].role;


                  check = 1
                  break
                }
              }
              if (check == 0) {
                dats.data.data[d].role = 'Staff';

              }
            }
            this.service.staffclgdata = dats.data.data
            this.data                 = []
            for (var j = 0; j < dats.data.data.length; j++) {
            for (var i = 0; i < data.length; i++) {

              

                if (data[i].reg_no == dats.data.data[j].reg_no) {


                  data[i].dispname    = dats.data.data[j].name;
                  data[i].college     = dats.data.data[j].college;
                  data[i].department  = dats.data.data[j].department;
                  data[i].designation = dats.data.data[j].designation;
                  data[i].email       = dats.data.data[j].email
                  this.data.push(data[i])
                  break;
                }
              }

            }

             
            for (var i = 0; i < this.data.length; i++) {
              this.data[i].emails = []
              for (var j = 0; j < dats.data.data.length; j++) {

                  if( ( (dats.data.data[j].role=='HOD' && dats.data.data[j].department==this.dept) || dats.data.data[j].role=='Principal') && dats.data.data[j].college==this.college )   {          

                  this.data[i].emails.push(dats.data.data[j].email)
                  
                }
              }

            }
            // this.data = data
            console.log('clg data testing', dats);
            console.log(this.data,'rolee data');
          })
        })
      });
    this.service.getTodayDate().subscribe(data => {
      this.today = data[0].todayDate;
      console.log(this.today, 'data today');

    });
 
  }
}
