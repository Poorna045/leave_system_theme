import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $;


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  pagetype: string;


  colg: string;
  dept: string;
  role=localStorage.getItem('empRole');
  utype=localStorage.getItem('utype');
  title = 'app works!';
  maindashboard
  applyleave 
  leavedash
  leavehistory 
  leaveapproval
  empleavesdata
   hoddashboard
  hdashboard
    dmdashboard
  today
   alternate
 reportdashboard
name


  constructor(){
    this.name=localStorage.getItem('empName');
     this.role = localStorage.getItem('empRole');
     this.dept = localStorage.getItem('empdept');
      this.colg = localStorage.getItem('empsurcolg');
    console.log(this.role, 'role type');
     console.log(this.dept, 'department type');
          console.log(this.colg, 'colg type');
this.pagetype='dmdashboard'
  }
ngOnInit(){
this.pagetype='dmdashboard'
 //history.replaceState('data to be passed', 'LeaveSyastem', 'http://localhost:4200/dashboard/'+this.pagetype);

console.log(this.pagetype);
setTimeout(function () {
      $(function () {
        $("#sidebar-toggle").click(function (e) {
          e.preventDefault();
          $(".navbar-side").toggleClass("collapsed");
          $("#page-wrapper").toggleClass("collapsed");
        });
      });
    }, 1000)
}
goCNN() {
//   console.log(window.location,'location test');
  
//  //  window.location.update_path('http://localhost:4200/dashboard/leavehistory')
//   // window.notify(false)
// var s = window.location.pathname;
// var n = s.indexOf('dashboard/');
//  s = s.substring(0, n != -1 ? n : s.length);
//  var new_str = s.split("dashboard/")[0];
// console.log(new_str);

//   history.replaceState('data to be passed', 'LeaveSystem', s+this.pagetype);
  
}

}
