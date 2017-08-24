import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "app/Services/app.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role: any;

 data: any;
  title = 'app works!';

userData={
    username:'',
    password:''
};

   public toasterconfig : ToasterConfig = 
        new ToasterConfig({
           
            showCloseButton: true, 
            tapToDismiss: true, 
            timeout: 2000
            
        });
public toasterService: ToasterService

constructor(toasterService: ToasterService,private router:Router,private service:AppService){
    this.toasterService = toasterService;  
}
accepted() {
        this.toasterService.pop('success', '', "Login Succesful !");
    } 
    rejected() {
        this.toasterService.pop('warning', '', 'You Entered invalid credentials !');
    }
log(){

console.log(this.userData.username,'login user data test');


this.service.login(this.userData).subscribe(data=>{
this.data=data;
console.log(data,'data tests');
//if(data.success){
if(data.success){

   localStorage.setItem('empName',data.name);
   localStorage.setItem('name',data.name);

localStorage.setItem('currentUser',data.token);
       
      localStorage.setItem('utype',data.utype);

      localStorage.setItem('emp_id',data.reg_no);
      localStorage.setItem('reg_no',data.reg_no);


localStorage.setItem('todaystatus','1');
localStorage.setItem('dp',data.dp);
localStorage.setItem('gender',data.gender);

   this.service.empId=data.reg_no;
   this.service.role=data.role; 
   console.log(this.service.empId,'service id data');
   console.log(this.service.role,'service role data');
    console.log(localStorage.getItem('empRole'),'local storage role data');
      console.log(localStorage.getItem('emp_id'),'local storage id data');
    this.router.navigate(['dashboard']);
}else{
this.userData.username=''
   this.userData.password=''
this.rejected();
 
}


})


 
}

  ngOnInit() {
   
    }

}

