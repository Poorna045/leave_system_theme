import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "app/Services/app.service";
import { Popup } from 'ng2-opd-popup';

@Component({
  selector: 'app-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  img: string;
  leaves = [];
  staffclgdata = [];
  staffdeptdata=[];
  pagetype: string;

enable=false
  colg: string;
  dept: string;
  role='';
  utype=localStorage.getItem('utype');
  realrole=localStorage.getItem('realRole');
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
name=localStorage.getItem('name');
  dp = localStorage.getItem('dp');
  gender = localStorage.getItem('gender');

 @ViewChild('popup1') popup1: Popup;
  constructor(private router:Router,private service:AppService, public popup: Popup){
  
//this.pagetype='dmdashboard'
//this.name=localStorage.getItem('empName')
console.log(this.name,'name testingb    ');

  }
  goPopup() {
        //myModal.open()

        this.popup1.options = {
            header: "Warning!",
            color: "#34495e", // red, blue.... 
            widthProsentage: 50, // The with of the popou measured by browser width 
            animationDuration: 1, // in seconds, 0 = no animation 
            showButtons: false, // You can hide this in case you want to use custom buttons 
            confirmBtnContent: "ok", // The text on your confirm button 
            cancleBtnContent: "Cancel", // the text on your cancel button 
            confirmBtnClass: "btn btn-default btn-square", // your class for styling the confirm button 
            cancleBtnClass: "btn btn-danger btn-square", // you class for styling the cancel button 
            animation: "bounceInDown",// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
        };
          this.popup1.show(this.popup1.options);
          
  }

ngOnInit(){
 // this.name=localStorage.getItem('name')
  console.log(localStorage.getItem('reg_no'),'emp id test');
    console.log(localStorage.getItem('empName'),'emp names test');
  let reg_no=localStorage.getItem('reg_no')  //if login from raghu erp getItem('reg_no')
  localStorage.setItem('emp_id',reg_no)
  let utype=localStorage.getItem('utype')
   
    const value={
      reg_no:localStorage.getItem('emp_id'),//if login from raghu erp getItem('reg_no')
      utype:localStorage.getItem('utype')
    }
     
  if(utype!='adm'){
      this.service.checkvalid().subscribe(data => {
      this.leaves = data
      if(this.leaves.length==0 ){
          this.pagetype=''
          this.enable=true
      localStorage.setItem('enable','false')
      this.goPopup();
    }
      })
}
    this.service.getuserRole(value).subscribe(data=>{
      const vals={
        utype:localStorage.getItem('utype'),
        reg_no:reg_no
      }

      this.service.getStaffDataById(vals).subscribe(dats=>{
console.log(dats.data.data[0],'data staff ');

      

      console.log(data,'role testing in service');
      this.role=data.role;
    
      localStorage.setItem('empRole',data.role)
      localStorage.setItem('realRole',data.role)
       localStorage.setItem('recentRole',data.role)
       if(utype=='adm'){
    localStorage.setItem('empName',localStorage.getItem('name'));  
       }else{
         localStorage.setItem('empName',dats.data.data[0].name); 
         
        //  this.name= dats.data.data[0].name
    
       localStorage.setItem('empdept',dats.data.data[0].department);
  
         localStorage.setItem('empcolg',dats.data.data[0].college);
      
             localStorage.setItem('empsurcolg',dats.data.data[0].college);

localStorage.setItem('recentdept',dats.data.data[0].department);
localStorage.setItem('recentclg',dats.data.data[0].college);
localStorage.setItem('email',dats.data.data[0].email);
       }

//          localStorage.setItem('empName',dats.data.data[0].name);  
    
//        localStorage.setItem('empdept',dats.data.data[0].department);
  
//          localStorage.setItem('empcolg',dats.data.data[0].college);
      
//              localStorage.setItem('empsurcolg',dats.data.data[0].college);

// localStorage.setItem('recentdept',dats.data.data[0].department);
// localStorage.setItem('recentclg',dats.data.data[0].college);
 this.name=localStorage.getItem('name');
     this.role = localStorage.getItem('empRole');
     this.dept = localStorage.getItem('empdept');
      this.colg = localStorage.getItem('empsurcolg');
    console.log(this.role, 'role type');
     console.log(this.dept, 'department type');
          console.log(this.colg, 'colg type');
          if(this.role=='admin'){
    this.pagetype='adminleavetypes'
  }else{
this.pagetype='dmdashboard'

  }
  console.log(this.pagetype);
  this.service.getholidays();
  const val={
    utype:this.utype,
    college:localStorage.getItem('empcolg'),
    dept:localStorage.getItem('empdept')
  }
  this.service.getStaffDataByCollege(val).subscribe(data=>{
    this.staffclgdata=data.data.data
    this.service.staffclgdata=data.data.data
    console.log('clg data testing',data);
    
  })
 
  this.service.getStaffDataByDept(val).subscribe(data=>{
    this.staffdeptdata=data.data.data
    this.service.staffdeptdata=data.data.data
       console.log('dept data testing',data);
  
  })
    })
     })

      if (this.dp != '' && this.dp != 'null') {
        this.img = "http://210.16.79.137/raghuerp/server/img/dps/" + this.dp;
      }
      else {
        if (this.gender == 'M') {
          this.img = "http://210.16.79.137/raghuerp/server/img/dps/M.png";
        }
        else if (this.gender == 'F') {
          this.img = "http://210.16.79.137/raghuerp/server/img/dps/F.png";
        }
        else {
          this.img = "http://210.16.79.137/raghuerp/server/img/dps/no_dp.jpg";
        }
      }

      
       
  
 //history.replaceState('data to be passed', 'LeaveSyastem', 'http://localhost:4200/dashboard/'+this.pagetype);


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
logout() {
    localStorage.removeItem('currentUser');

    console.log(window.location,'window tesing');
 //this.router.navigate(['dashboard']);
    // window.location.href='http://localhost:4200/login'
     window.location.href='http://210.16.79.137/raghuerp'

  
}
gotohome(){
 console.log(window.location,'window tesing');
  
 window.location.href='http://210.16.79.137/raghuerp/dashboard'
}
goto(){
window.location.href='http://210.16.79.137/raghuerp/dashboard'
}

}
