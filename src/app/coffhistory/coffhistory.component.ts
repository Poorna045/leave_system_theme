import { Component, OnInit } from '@angular/core';
import { AppService } from "app/Services/app.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from "@angular/router";
declare var $;
@Component({
  selector: 'app-coffhistory',
  templateUrl: './coffhistory.component.html',
  styleUrls: ['./coffhistory.component.css']
})
export class CoffhistoryComponent implements OnInit {
  roleData = [];
  reg_no: string;
  dept: string;
  college: string;
  emails = [];

  role: any;
  today;
  empty: string = ''
  day;
  more: any;
  month;
  year;
  lid
  title = 'app works!';
  data
  date = new Date();
  public filterQuery = "";
  public date1 = "";
  public date2 = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";

  private toasterService: ToasterService;
  constructor(private service: AppService, toasterService: ToasterService, private route: ActivatedRoute) {
    this.role = localStorage.getItem('empRole');
    this.toasterService = toasterService;
    console.log(localStorage.getItem('emp_id'), 'reg_no test');

    this.route.params.subscribe(params => {
      // do something
      var data = params
      console.log(params, 'url testing');

    });
  }

  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: true,
    timeout: 5000
  });

  popToast() {
    this.toasterService.pop('warning', '', 'You are Cancelled your leave request');
  }

  ngOnInit() {
    this.college = localStorage.getItem('empcolg')
    this.dept = localStorage.getItem('empdept')
    this.role = localStorage.getItem('empRole');
    this.reg_no = localStorage.getItem('emp_id');
    this.service.getHistoryBYIdcoff().subscribe(data => {
      console.log(data, 'data ');

      const val = {
        utype: 'adm',

      }
      this.service.getStaffData(val).subscribe(dats => {

        this.service.getroleslist().subscribe(role => {


          this.roleData = role
          console.log(this.roleData, 'DJ');
          console.log(dats.data.data, 'DJdata');
          console.log(this.dept, 'DJdept');
          console.log(this.college, 'DJcolg');
          for (var d = 0; d < dats.data.data.length; d++) {
            let check = 0
            for (var k = 0; k < role.length; k++) {


              if (dats.data.data[d].reg_no == role[k].reg_no) {

                dats.data.data[d].role = role[k].role;



                if (this.role == 'HOD' || this.role == 'Staff') {
                  if (((role[k].role == 'HOD' && dats.data.data[d].department == this.dept) || (role[k].role == 'Principal')) && this.college == dats.data.data[d].college) {
                    this.emails.push(dats.data.data[d].email)


                  }
                } else if (this.role == 'Principal') {
                  if (role[k].role == 'Principal' && this.college == dats.data.data[d].college) {
                    this.emails.push(dats.data.data[d].email)


                  }
                } else if (this.role == 'Dean') {
                  if (((role[k].role == 'Dean' && dats.data.data[d].department == this.dept) || (role[k].role == 'Principal')) && this.college == dats.data.data[d].college) {
                    this.emails.push(dats.data.data[d].email)


                  }
                }


                check = 1
                break
              }
            }
            if (check == 0) {
              dats.data.data[d].role = 'Staff';

            }
          }
          if (this.role == 'Staff') {
            this.emails.push(localStorage.getItem('email'))
          }
        })
      })


      this.data = data
      console.log(this.data, 'data history');
    });
    this.service.getTodayDate().subscribe(data => {
    this.today = data[0].todayDate;
      console.log(this.today, 'data today');

    });

  }

  cancelRequest(cid) {
    console.log(this.more, 'object data');

    let data = {
      type: 'Cancelled',
      reason: '',
      days: this.more.days,
      eid: this.more.reg_no,
      cid: cid,
      username: localStorage.getItem('empName'),
      dept: localStorage.getItem('empdept'),
      colg: localStorage.getItem('empcolg'),
      role: localStorage.getItem('empRole'),
      name: localStorage.getItem('empName'),
      email: this.emails
    }

    this.service.upRejectcoff(data).subscribe(datas => {
      console.log(datas, 'lop test');

      this.service.getHistoryBYIdcoff().subscribe(data => {


        const val = {
          utype: 'adm',

        }
        this.service.getStaffData(val).subscribe(dats => {

          this.service.getroleslist().subscribe(role => {


            this.roleData = role
            console.log(this.roleData, 'DJ');
            console.log(dats.data.data, 'DJdata');
            console.log(this.dept, 'DJdept');
            console.log(this.college, 'DJcolg');

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



            for (var i = 0; i < data.length; i++) {

              for (var j = 0; j < dats.data.data.length; j++) {

                if (data[i].alternateId == dats.data.data[j].reg_no) {


                  data[i].Altername = dats.data.data[j].name;
                  break;
                }
              }

            }
            this.data = data
          })
        })




        console.log(this.data, 'data history');
        this.popToast();
      });
    })
  }

}
