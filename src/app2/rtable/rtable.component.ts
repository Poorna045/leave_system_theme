import { Component, OnInit } from '@angular/core';
import { AppService } from "app/Services/app.service";
import { IMyOptions, IMyDateModel } from "mydatepicker";
declare var $;

@Component({
  selector   : 'app-rtable',
  templateUrl: './rtable.component.html',
  styleUrls  : ['./rtable.component.css']
})
export class RtableComponent implements OnInit {
  alldetails: any;
  totaldept = 0;
  Deptdata  = [];
  Clgdata   = [];

  cols     : string;
  empid    : string;
  depts    : string;
  todaydate: any;
  sh       : any;
  bpharmacy: boolean;
  mpharmacy: boolean;
  test  = 'Day'
  cse   = false;
  mech  = false;
  ece   = false;
  eee   = false;
  civil = false;
  bphar = false;
  mphar = false;
  color    : string;
  Count    : any;
  college  : string;
  tablename: string;
  leaves   : any;
  count    : number;
  details  : any;
  colg
  inst
  dept
  role
  report   = false
  depttype = ''
  staff
  dean
  Dean
  principal

  public filterQuery = "";
  public date1       = "";
  public date2       = "";
  public rowsOnPage  = 5;
  public sortBy      = "firstname";
  public sortOrder   = "asc";

  prove = {
    role: '',
    dept: '',
    colg: '',
    date: ''
  }
  proveyear = {
    role: '',
    dept: '',
    colg: '',
    year: ''
  }
  todayDetails = false
  show    : boolean;
  response: any;
  date = new Date();
  model     : any
  department: string
  year  = '1992'
  month = ''
  day   = ''
  data  = {
    type_of_leave: '',
    from_date    : '',
    to_date      : '',
    reason       : '',
    status       : '',
    days         : ''
  }

  today = new Date();

  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    // disableUntil: {year: , month: 5 , day: 17}

  };
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    console.log('onDateChanged(): ', event.date, ' - jsdate: ', event.jsdate.toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.todaydate = event.formatted;
    console.log(this.todaydate, 'date check');

    // this.today=event.jsdate.toLocaleDateString();

  }
  onYearChange(value) {
    console.log(value, 'year changed');
    this.year = value
    console.log(this.year)

  }
  onMonthChange(value) {
    console.log(value, 'month changed');
    this.month = value
  }

  constructor(private service: AppService) {
    this.role = localStorage.getItem('realRole');
    console.log(this.role, 'role test');

    this.empid = localStorage.getItem('emp_id');
    this.depts = localStorage.getItem('empdept');
    localStorage.getItem('empinstitute');
    this.college = localStorage.getItem('empcolg');



  }
  getEmployeeData() {
    this.report   = false;
    this.depttype = ''
    if (this.test == 'Day') {
      console.log(this.college, 'college test');

      var onedata = {
        role: 'Principal',
        dept: '',
        colg: this.college,
        date: this.todaydate
      }
      console.log(this.todaydate, 'date testing');
      this.service.getTodayReal(onedata).subscribe(datas => {
       // this.details = data;
   
          this.totaldept = 0
        for (var i = 0; i < datas.depts.length; i++) {
          this.totaldept = JSON.parse(datas.depts[i].y) + this.totaldept;
        }
        this.Deptdata   = datas.depts
        this.alldetails = datas.data
        
        console.log('here');

        var nedata = {
          role: 'Dean',
          dept: '',
          colg: '',
          date: this.todaydate
        }
        console.log(this.todaydate, 'date testing');

        this.service.getTodayReal(nedata).subscribe(data => {

         this.Clgdata = data


          console.log(data, 'current log');
          console.log(this.count, 'current length');
        })
      })
    }
    else if (this.test == 'Year') {
      this.proveyear = {
        role: 'Principal',
        dept: '',
        colg: this.college,
        year: this.year
      }
      this.service.getAllyearData(this.proveyear).subscribe(datas => {
       

        this.totaldept = 0
        for (var i = 0; i < datas.depts.length; i++) {
          this.totaldept = JSON.parse(datas.depts[i].y) + this.totaldept;
        }
        this.Deptdata   = datas.depts
        this.alldetails = datas.data
      
        var proveyea = {
          role: 'Dean',
          dept: '',
          colg: '',
          year: this.year
        }

        this.service.getAllyearData(proveyea).subscribe(data => {
         // this.details = data;


        this.Clgdata = data


          console.log(data, 'current college');
          console.log(this.count, 'current length');
        })
      })
    } else if (this.test == 'Month') {
      console.log(this.college, 'clg test');

      var proveyear = {
        role : 'Principal',
        dept : '',
        colg : this.college,
        year : this.year,
        month: this.month
      }
      this.service.getAllmonthData(proveyear).subscribe(datas => {
     

        this.totaldept = 0
        for (var i = 0; i < datas.depts.length; i++) {
          this.totaldept = JSON.parse(datas.depts[i].y) + this.totaldept;
        }
        this.Deptdata   = datas.depts
        this.alldetails = datas.data

        var proveyea = {
          role : 'Dean',
          dept : '',
          colg : '',
          year : this.year,
          month: this.month
        }

        this.service.getAllmonthData(proveyea).subscribe(data => {
         
          this.Clgdata = data


          console.log(data, 'current college');
          console.log(this.count, 'current length');
        })
      })

    }


  }
  reports(dept) {
    if (dept != 'ALL') {
      this.depttype   = dept
      this.department = dept
      this.details    = this.alldetails[dept]
    } 
    //else {
      // this.details = []
      // this.totaldept = 0
      // var i = 0
      // let name = ''
      // console.log(this.alldetails, 'rolee all details', this.alldetails[this.Deptdata[4].name]);

      // for (var j = 0; j < this.Deptdata.length; j++) {
      //   name = this.Deptdata[i].department
      //   if (this.alldetails[name].length != 0) {
      //     for (var k = 0; this.alldetails[name].length; k++) {
      //       this.details.push(this.alldetails[name][k])
      //     }

      //   }
      //   this.totaldept = this.totaldept + this.alldetails[name].length
      //   i = i + 1;
      //   console.log(this.alldetails[name], 'rolee for');

      // }

      // console.log(this.details, 'rolee');

    //}
    this.tablename = dept
    this.report    = true

  }

  College(clg) {
    this.college = clg
    localStorage.setItem('recentclg', clg);
    localStorage.setItem('recentdept', '');
    localStorage.setItem('recentinst', '1');
    localStorage.setItem('recentRole', 'Principal');
    localStorage.setItem('todaystatus', '0');

    if (this.test == 'Day') {
      console.log(clg, 'college test');

      var onedata = {
        role: 'Principal',
        dept: '',
        colg: clg,
        date: this.todaydate
      }
      console.log(this.todaydate, 'date testing');
      this.service.getTodayReal(onedata).subscribe(datas => {

        // this.details=data.data[];
        console.log(this.details, 'testing clg');
        this.totaldept = 0
        for (var i = 0; i < datas.depts.length; i++) {
          this.totaldept = JSON.parse(datas.depts[i].y) + this.totaldept;
        }
        this.Deptdata   = datas.depts
        this.alldetails = datas.data

        //  this.count=datas.data
        console.log('rolee here', this.Deptdata);

        var onedata = {
          role: 'Dean',
          dept: '',
          colg: '',
          date: this.todaydate
        }
        console.log(this.todaydate, 'date testing');

        this.service.getTodayReal(onedata).subscribe(data => {
          // this.details=data;


          this.Clgdata = data


          console.log(data, 'current log');
          console.log(this.count, 'current length');
        })
      })
    }
    else if (this.test == 'Year') {
      console.log(clg, 'college test');
      this.proveyear = {
        role: 'Principal',
        dept: '',
        colg: clg,
        year: this.year
      }
      this.service.getAllyearData(this.proveyear).subscribe(datas => {
        
this.totaldept = 0
        for (var i = 0; i < datas.depts.length; i++) {
          this.totaldept = JSON.parse(datas.depts[i].y) + this.totaldept;
        }
        this.Deptdata   = datas.depts
        this.alldetails = datas.data

        this.proveyear = {
          role: 'Dean',
          dept: '',
          colg: '',
          year: this.year
        }

        this.service.getAllyearData(this.proveyear).subscribe(data => {
          
            this.Clgdata = data

          console.log(data, 'current log');
          console.log(this.count, 'current length');
        })
      })
    } else if (this.test == 'Month') {
      console.log(this.college, 'clg test');

      var proveyear = {
        role : 'Principal',
        dept : '',
        colg : this.college,
        year : this.year,
        month: this.month
      }
      this.service.getAllmonthData(proveyear).subscribe(datas => {
       

        this.totaldept = 0
        for (var i = 0; i < datas.depts.length; i++) {
          this.totaldept = JSON.parse(datas.depts[i].y) + this.totaldept;
        }
        this.Deptdata   = datas.depts
        this.alldetails = datas.data


        var proveyea = {
          role : 'Dean',
          dept : '',
          colg : '',
          year : this.year,
          month: this.month
        }

        this.service.getAllmonthData(proveyea).subscribe(data => {
          
          this.Clgdata = data


          console.log(data, 'current college');
          console.log(this.count, 'current length');
        })
      })

    }


    this.principal = true
    this.dean      = false
    this.Dean      = false
    this.staff     = false

  }

  private selectedLink: string = "";

  setbutton(e: string): void {
    this.test = e;
    console.log(e, 'day');


    this.selectedLink = e;

  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }

  back() {
    if (this.report == true) {
      this.Dean      = false
      this.principal = true
      this.report    = false
    }
    else if (this.principal == true) {
      this.Dean      = true
      this.principal = false
      this.report    = false
      this.depttype  = ''


    }

  }

  ngOnInit() {
this.college = localStorage.getItem('empcolg')
    this.service.getTodayDate().subscribe(data => {
    this.todaydate = data[0].todayDate;
      console.log(this.todaydate, 'data today');

      if (this.role == 'Principal') {
        this.principal = true
       
      }
      else {
        this.Dean = true
       
      }
       this.prove = {
          role: 'Dean',
          dept: '',
          colg: '',
          date: this.todaydate
        }

 this.service.getTodayReal(this.prove).subscribe(datas => {
        //this.details=data;
        //console.log(data,'data test in reports');



          this.Clgdata = datas

 

        console.log(data, 'current log');
        console.log(this.count, 'current length');
     

         this.prove = {
          role: 'Principal',
          dept: this.depts,
          colg: this.college,
          date: this.todaydate
        }

      this.service.getTodayReal(this.prove).subscribe(datas => {
        //this.details=data;
        //console.log(data,'data test in reports');

 
           this.totaldept = 0
        for (var i = 0; i < datas.depts.length; i++) {
          this.totaldept = JSON.parse(datas.depts[i].y) + this.totaldept;
        }
        this.Deptdata   = datas.depts
        this.alldetails = datas.data
        console.log('data rolee',this.Deptdata);

        console.log(data, 'current log');
        console.log(this.count, 'current length');
      })
       })
      console.log(this.todaydate, 'date jkgk');
    });
  }

}
