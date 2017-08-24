import { Component, OnInit } from '@angular/core';
import { AppService } from "app/Services/app.service";
declare var $;
@Component({
  selector: 'app-empleaves',
  templateUrl: './empleavesdata.component.html',
  styleUrls: ['./empleavesdata.component.css']
})
export class EmpleavesdataComponent implements OnInit {
  college: string;

  title = 'app works!';
  data = []
  role
  dept
  leaves = []
  columns = []

  public filterQuery = "";
  public date1 = "";
  public date2 = "";
  public rowsOnPage = 5;
  public sortBy = "emp_id";
  public sortOrder = "asc";

  constructor(private service: AppService) {
    this.role = localStorage.getItem('empRole');
    this.dept = localStorage.getItem('empdept');
    console.log(this.role, 'role type');
    console.log(this.dept, 'department type');

  }

  ngOnInit() {
    this.role = localStorage.getItem('empRole');
    this.dept = localStorage.getItem('empdept');
    this.college = localStorage.getItem('empcolg');
    // this.service.getempData().subscribe(data => {
    const value = localStorage.getItem('reg_no');
    const onedata = {
      emp_id: value,

    }
    this.service.getonceData(onedata).subscribe(column => {

      let columns = []
      for (var f = 0; f < column.length; f++) {
        columns[f] = column[f].type
      }


      columns.splice(0, 0, 'reg_no')
      columns.splice(1, 0, "Emp Name")
      columns.splice(2, 0, "college")
      columns.splice(3, 0, "department")
      columns.splice(4, 0, "designation")
      columns.splice(columns.length - 2, 2)


      console.log(columns, 'columns');
      this.columns = columns

      this.service.empOneleaves().subscribe(leave => {
        this.leaves = leave
        console.log(leave, 'leave test in emp data');


        const val = {
          utype: 'adm',
          college: localStorage.getItem('empcolg'),
          dept: localStorage.getItem('empdept')

        }
        this.service.getStaffData(val).subscribe(dats => {
          // this.data=data.data.data

          this.service.staffclgdata = dats.data.data
          if (this.role == 'HOD') {
            for (var i = 0; i < leave.length; i++) {

              for (var j = 0; j < dats.data.data.length; j++) {


                if (leave[i][0] == dats.data.data[j].reg_no && dats.data.data[j].college == this.college && dats.data.data[j].department == this.dept) {
                  // leave[i].push(dats.data.data[j].name);
                  // leave[i].push(dats.data.data[j].college);
                  // leave[i].push(dats.data.data[j].department);
                  // leave[i].push(dats.data.data[j].designation);
                  //leave[i].splice(0,0,'reg_no')
                  leave[i].splice(1, 0, dats.data.data[j].name)
                  leave[i].splice(2, 0, dats.data.data[j].college)
                  leave[i].splice(3, 0, dats.data.data[j].department)
                  leave[i].splice(4, 0, dats.data.data[j].designation)

                  console.log(leave[i], 'leave data test');

                  this.data.push(leave[i])
                }
              }


            }
          } else if (this.role == 'Principal') {

            for (var i = 0; i < leave.length; i++) {

              for (var j = 0; j < dats.data.data.length; j++) {


                if (leave[i][0] == dats.data.data[j].reg_no && dats.data.data[j].college == this.college) {
                  leave[i].splice(1, 0, dats.data.data[j].name)
                  leave[i].splice(2, 0, dats.data.data[j].college)
                  leave[i].splice(3, 0, dats.data.data[j].department)
                  leave[i].splice(4, 0, dats.data.data[j].designation)

                  console.log(leave[i], 'pri data');

                  this.data.push(leave[i])
                  break;
                }

              }


            }

            // console.log(dats.data.data,'pri data');


          } else {
            for (var i = 0; i < leave.length; i++) {

              for (var j = 0; j < dats.data.data.length; j++) {


                if (leave[i][0] == dats.data.data[j].reg_no) {
                  leave[i].splice(1, 0, dats.data.data[j].name)
                  leave[i].splice(2, 0, dats.data.data[j].college)
                  leave[i].splice(3, 0, dats.data.data[j].department)
                  leave[i].splice(4, 0, dats.data.data[j].designation)

                  this.data.push(leave[i])
                }

              }


            }
          }



          console.log('clg data testing', dats);
          console.log(this.service.staffclgdata);
        })
        // var check=Object.keys(this.data[0]).map(key=>this.data[0][key]);
        // console.log(data, 'data in employees table');
        //console.log(check,'object to array check in employees table');

      });
    });
  }

}
