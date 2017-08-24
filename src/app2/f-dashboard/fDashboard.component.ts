import { Component, OnInit, ViewChild, Output, EventEmitter, Input, Directive } from '@angular/core';
import { AppService } from "app/Services/app.service";
declare var $;
@Component({
  selector   : 'app-fDashboard',
  templateUrl: './fDashboard.component.html',
  styleUrls  : ['./fDashboard.component.css']
})

export class FDashboardComponent implements OnInit {
                                  lsleaves       = [];
                          @Output() leavehistory = new EventEmitter()

  testingfrom
  deptdata = [];
  dashdata: any;
  clg     : string;
  inst    : string;
  dept    : string;
  details : any;
  colg    : string;
  viewdata = false;
  dash     = true
  data;
  role  = localStorage.getItem('realRole');
  utype = localStorage.getItem('utype');
  // leaves = {

  //   LOP: "0",
  //   casual_leave: "0",
  //   compensatory_leave: "",
  //   reg_no: "",
  //   emp_name: "",
  //   prevelege_leave: "0",
  //   sick_leave: "0",
  //   study_leave: "0",
  //   Total: "0",
  //   Remaining: "0"
  // }
  leaves = []

  options  : Object;
  overall  : Object;
  bardetail: Object;
  dataa    : any;

  public colors: Array<any> = [{
    backgroundColor: ["#90ed7d", "#f7a35c", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
  }]
  public colors2: Array<any> = [{
    backgroundColor: ["#95ceff", "#ed87a6", "#FAFFF2"]
  }]
  public colors3: Array<any> = [{
    backgroundColor: ["#bf463d", "#f8a13f", "#FAFFF2"]
  }]


  constructor(private service: AppService) {
    this.colg = localStorage.getItem('empsurcolg');

    console.log(this.colg, 'colg name');


    this.role = localStorage.getItem('realRole');
    this.dept = localStorage.getItem('empdept');
    this.inst = localStorage.getItem('empinstitute');
    this.clg  = localStorage.getItem('empcolg');


  }
  go() {
    console.log(this.testingfrom, 'date testing from table');
    // (click)="testingfrom=$event.target.textContent; go()"
  }
  getValue(event: any) {
    let value = event.target.innerHTML;
    console.log("date test", value);
  }
  ngOnInit() {

    const onedata = {
      role  : this.role,
      dept  : this.dept,
      inst  : this.inst,
      colg  : this.clg,
      instid: localStorage.getItem('instituteID')
    }
    if (this.role == 'Management') {

      this.service.getColg().subscribe(clgdata => {


        console.log(clgdata, 'clg data test');
        var colgs = []
        var depts = []
        for (var i = 0; i < clgdata['colg'].length; i++) {
          colgs[i] = clgdata['colg'][i].colg;
        }
        // for(var j=0;j<colgs.length;j++){
        // var data+j=[]
        // for(var i=0;i<clgdata['colgdata'].length;i++){

        //   if(clgdata['colgdata'][i].colg==colgs[j]){}

        // }
        // }
        this.service.dashboardData().subscribe(dashdata => {

          this.dashdata = dashdata;

          // for(var i=0;i<dashdata['clgpm'];i++){
          //   dashdata['clgpm'][i].drilldown=true;
          //   dashdata['clgam'][i].drilldown=true;
          // }
          let clgam     = dashdata['clgam'];
          let clgpm     = dashdata['clgpm'];
          let drilldata = dashdata['oal']
          console.log(this.dashdata, 'dashboard data');


          this.bardetail = {
            chart: {
              type               : 'column',
              height             : 220,
              width              : 770,
              borderWidth        : 1,
              borderRadius       : 4,
              borderColor        : '#2C3E50 ',
              plotBackgroundColor: null,
              plotBorderWidth    : null,
              plotShadow         : false,
              zoomType           : 'xy'
            },
            credits: {
              enabled: false
            },
            title: {
              text: 'REI Leaves '
            },

            xAxis: {
              type: 'category',
              // categories: ['REC', 'RIT', 'RCP'],

            },
            yAxis: {
              min  : 0,
              max  : 10,
              title: {
                text: 'Leaves'
              }

            },
            legend: {
              enabled: false
            },
            plotOptions: {

              series: {
                borderWidth: 0,
                dataLabels : {
                  enabled: true,
                  format : '{point.y}'
                }
              }
            },

            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat : '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> Leaves<br/>'
            },

            series: [{
              name: 'am',
              data: clgam
            },
            {
              name: 'pm',

              data: clgpm
            }],
            drilldown: {
              series: drilldata

            }
          }


        });
      })
    }
    if (this.role == 'Principal') {
      this.service.getDept(this.colg).subscribe(datas => {

        console.log(datas, 'dastest');

        let deptdata   = datas
        let deptdataPM = datas
        var am         = []
        var pm         = []
        for (var i = 0; i < deptdata.length; i++) {
          am[i] = 0
          pm[i] = 0
        }
        console.log(deptdata, 'rec dept2');
        this.service.getprinc(this.colg, this.dept).subscribe(data => {
          console.log(data['am'], 'princi data');
          // var testdata=[]
          //  testdata=data
          console.log(data['am'], '=>', data['pm'], 'test data');
          var deptAm = data['am']
          var deptPm = data['pm']
          var depts  = []
          for (var i = 0; i < deptAm.length; i++) {
            depts.push(deptAm[i].name);
            deptAm[i].y = JSON.parse(deptAm[i].y)
            deptPm[i].y = JSON.parse(deptPm[i].y)
          }
         

     
          const shows = data
          console.log(data, 'principal data');

          this.bardetail = {
            chart: {
              type               : 'column',
              height             : 220,
              width              : 770,
              borderWidth        : 1,
              borderRadius       : 4,
              borderColor        : '#2C3E50 ',
              plotBackgroundColor: null,
              plotBorderWidth    : null,
              plotShadow         : false,
              zoomType           : 'xy'
            },
            credits: {
              enabled: false
            },
            title: {
              text: this.colg + ' Leaves '
            },

            xAxis: {
              categories: depts,
            },
            yAxis: {
              min  : 0,
              max  : 10,
              title: {
                text: 'Leaves'
              }

            },
            legend: {
              enabled: false
            },
            plotOptions: {

              series: {
                borderWidth: 0,
                dataLabels : {
                  enabled: true,
                  format : '{point.y}'
                }
              }
            },

            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat : '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> Leaves<br/>'
            },

            // series: [{
            //   name: this.colg,
            //   colorByPoint: true,
            //   data: data
            // }],
            series: [{
              name: 'AM',
              data: deptAm

            }, {
              name: 'PM',
              data: deptPm

            }],

          }
        })
      })
    }


    if (this.role != 'Management') {
      const value   = localStorage.getItem('reg_no');
      const onedata = {
        emp_id: value,

      }
      this.service.getonceData(onedata).subscribe(data => {


        let totalval     = JSON.parse(data[data.length - 2].val)
        let remainingval = JSON.parse(data[data.length - 1].val)
        // for(var p=0;p<data.length-3;p++){
        //   remainingval=remainingval+JSON.parse(data[p].val);
        //   console.log(JSON.parse(data[p].val),'vallll');

        // }



        console.log(remainingval, 'remaining value');

        console.log('datasss');
        console.log(this.leaves, 'leaves')
        this.options = {
          credits: {
            enabled: false
          },

          colors: ['#90ee7e', '#f7a35c', "#FAFFF2", "#ed87a6", '#2f7ed8', '#8bbc21', '#0d233a',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
          chart: {

            height             : 220,
            width              : 250,
            borderWidth        : 1,
            borderRadius       : 4,
            borderColor        : '#2C3E50 ',
            plotBackgroundColor: null,
            plotBorderWidth    : null,
            plotShadow         : false,
            type               : 'pie',

          },
          exporting: {


            enabled: false
          },
          title  : false,
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              size            : 150,
              allowPointSelect: true,
              cursor          : 'pointer',
              dataLabels      : {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            name        : 'Total',
            colorByPoint: true,
            data        : [{
              name: 'Utilized',
              y   : totalval - remainingval,
            }, {
              name    : 'Remaining',
              y       : remainingval,
              sliced  : true,
              selected: true
            }]
          }]
        };



      });
    }
    if (this.role == 'Principal' || this.role == 'Management') {
      const edata = {
        role: this.role,
        dept: this.dept,
        colg: this.clg,

      }
      this.service.empCount(edata).subscribe(data => {
        this.details = data;
        console.log(data, 'current log emp count <===');

        this.overall = {
          credits: {
            enabled: false
          },


          chart: {

            height             : 220,
            width              : 250,
            borderWidth        : 1,
            borderRadius       : 4,
            borderColor        : '#2C3E50 ',
            plotBackgroundColor: null,
            plotBorderWidth    : null,
            plotShadow         : false,
            type               : 'pie',

          },
          exporting: {


            enabled: false
          },
          title  : false,
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          colors: ['#1aadce', '#910000', "#FAFFF2", "#ed87a6", '#2f7ed8', '#8bbc21', '#0d233a',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
          plotOptions: {
            pie: {
              size            : 150,
              allowPointSelect: true,
              cursor          : 'pointer',
              dataLabels      : {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            name        : 'Total',
            colorByPoint: true,
            data        : [{
              name: 'Presents',
              y   : JSON.parse(this.details[0].empcount) - JSON.parse(this.details[0].leavesLength),

            }, {
              name    : 'Leaves',
              y       : JSON.parse(this.details[0].leavesLength),
              sliced  : true,
              selected: true
            }]
          }]
        };


        console.log(this.details[0].leavesLength, 'data length');

      });

    }
    console.log('getting');
    if (this.role != 'Management') {
      const value   = localStorage.getItem('reg_no');
      const onedata = {
        emp_id: value,

      }
      this.service.getonceData(onedata).subscribe(data => {

        console.log(data.length, 'daaaaa', data);

        data.splice(data.length - 2, 2)
        console.log(data.length, 'daaaaa', data);
                        this.leaves = data
                    let gender      = localStorage.getItem('gender');
        for (var i = 0; i < this.leaves.length; i++) {
          if(this.leaves[i].type=='Maternaty Leave' && gender=='M'){
                // nothing
          }
          else if (this.leaves[i].type != 'LOP' ) {
            this.lsleaves.push(this.leaves[i])
          }
        }

        console.log(this.leaves, 'leaves test')
        this.service.getHistoryBYId().subscribe(data => {
          console.log(data, 'data test');


          this.data = data
          console.log(this.data, 'data history');

        });


      });
    }

  
  }
  getFulldata() {
    // this.dash = false
    // this.viewdata = true;
    this.leavehistory.emit(false);

  }

}
