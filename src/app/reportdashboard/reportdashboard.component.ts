import { Component, OnInit } from '@angular/core';
import { AppService } from "app/Services/app.service";
import { IMyOptions, IMyDateModel } from "mydatepicker";
declare var $;
@Component({
  selector: 'app-reportdashboard',
  templateUrl: './reportdashboard.component.html',
  styleUrls: ['./reportdashboard.component.css']
})
export class ReportdashboardComponent implements OnInit {

 cols: string;
  empid: string;
  depts: string;
  todaydate: any;
  sh: any;
  bpharmacy: boolean;
  mpharmacy: boolean;
  test='Day'
  cse = false;
  mech = false;
  ece = false;
  eee = false;
  civil = false;
  bphar=false;
  mphar=false;
  color: string;
  Count: any;
  college: string;
  tablename: string;
  leaves: any;
  count: number;
  details: any;
  colg
  inst
  dept
  role
  report=false

staff
dean 
Dean
principal

   public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "dispname";
    public sortOrder = "asc";

  prove={
   role:'',
      dept:'',
      colg:'',
      date:''
    }
     proveyear={
   role:'',
      dept:'',
      colg:'',
      year:''
    }
todayDetails=false
  show: boolean;
  response: any;
  date = new Date();
model:any
department:string
year='1992'
month=''
day=''
  data={
        type_of_leave:'',
        from_date:'',
        to_date:'',
        reason:'',
        status:'',
        days:''
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
    this.todaydate=event.formatted ;
  console.log(this.todaydate,'date check');
  
      // this.today=event.jsdate.toLocaleDateString();
        
    }
    onYearChange(value){
      console.log(value,'year changed');
      this.year=value
      console.log(this.year)
      
    }
     onMonthChange(value){
      console.log(value,'month changed');
      this.month=value
    }


    recCount=0
    ritCount=0
    rcpCount=0
    mechCount=0
    cseCount=0
    civilCount=0
    eceCount=0
    eeeCount=0
    bpharCount=0
    mpharCount=0
    totalCount=0
   
    

 
  constructor(private service:AppService) { 
    this.role=localStorage.getItem('realRole');
    console.log(this.role,'role test');

          this.empid=localStorage.getItem('emp_id');
                 this.depts=localStorage.getItem('empdept');
        localStorage.getItem('empinstitute');
         this.college=localStorage.getItem('empcolg');
  

   
}
getEmployeeData(){
  this.report=false;
  if(this.test=='Day')
  {  
    console.log(this.college,'college test');
    
     var onedata = {
      role:'Principal',
      dept:'',
      colg:this.college,
      date: this.todaydate
    }
    console.log(this.todaydate,'date testing');
     this.service.getTodayReal(onedata).subscribe(data=>{
      this.details=data;
                 console.log(this.details,'testing clg');
   if(this.college!='RCP'){
      this.mechCount=data.MECH
      this.cseCount=data.CSE
      this.civilCount=data.CIVIL
      this.eceCount=data.ECE
      this.eeeCount=data.EEE
  console.log(this.details,'testing clg');
           }
          else if(this.college=='RCP'){   
      this.bpharCount=data.bPHAR
      this.mpharCount=data.mPHAR
      
           }
    
   this.count=data.data
console.log('here');

   var nedata = {
      role:'Dean',
      dept:'',
      colg:'',
      date:this.todaydate
    }
console.log(this.todaydate,'date testing');

     this.service.getTodayReal(nedata).subscribe(data=>{
      this.details=data;
     
 
      this.recCount=data.REC
      this.ritCount=data.RIT
      this.rcpCount=data.RCP
           
         
    
   this.count=data.data
      
    
console.log(data,'current log');
console.log(this.count,'current length');
     })
})
  }
else if(this.test=='Year')
  {
    this.proveyear = {
      role:'Principal',
      dept:'',
      colg:this.college,
      year: this.year
    }
     this.service.getAllyearData(this.proveyear).subscribe(data=>{
            this.details=data;
            console.log(this.details)
      if(this.college!='RCP'){
      this.mechCount=data.MECH
      this.cseCount=data.CSE
      this.civilCount=data.CIVIL
      this.eceCount=data.ECE
      this.eeeCount=data.EEE
   
           }
           else if(this.college=='RCP'){   
      this.bpharCount=data.bPHAR
      this.mpharCount=data.mPHAR
      
           }
    
   this.count=data.data
  var proveyea = {
      role:'Dean',
      dept:'',
      colg:'',
      year:this.year
    }

     this.service.getAllyearData(proveyea).subscribe(data=>{
      this.details=data;
     
 
      this.recCount=data.REC
      this.ritCount=data.RIT
      this.rcpCount=data.RCP
           
         
    
   this.count=data.data
      
    
console.log(data,'current college');
console.log(this.count,'current length');
     })
})
  }else if(this.test=='Month'){
console.log(this.college,'clg test');

    var proveyear = {
      role:'Principal',
      dept:'',
      colg:this.college,
      year: this.year,
      month:this.month
    }
     this.service.getAllmonthData(proveyear).subscribe(data=>{
            this.details=data;
            console.log(this.details)
      if(this.college!='RCP'){
      this.mechCount=data.MECH
      this.cseCount=data.CSE
      this.civilCount=data.CIVIL
      this.eceCount=data.ECE
      this.eeeCount=data.EEE
   
           }
           else if(this.college=='RCP'){   
      this.bpharCount=data.bPHAR
      this.mpharCount=data.mPHAR
      
           }
    
   this.count=data.data
  var proveyea = {
      role:'Dean',
      dept:'',
      colg:'',
      year:this.year,
      month:this.month
    }

     this.service.getAllmonthData(proveyea).subscribe(data=>{
      this.details=data;
     
 
      this.recCount=data.REC
      this.ritCount=data.RIT
      this.rcpCount=data.RCP
           
         
    
   this.count=data.data
      
    
console.log(data,'current college');
console.log(this.count,'current length');
     })
})
    
  }


}
reports(dept){
  this.department=dept
if(dept=='CSE'){
this.details=this.cseCount
this.cse=true
this.mech=false
this.ece=false
this.eee=false
this.civil=false
this.mphar=false
this.bphar=false
this.tablename="Computer Science And Engineering";
this.report=true}
if(dept=='ECE'){
this.details=this.eceCount
this.tablename="Elcetronics And Communication Engineering";
this.cse=false
this.mech=false
this.ece=true
this.eee=false
this.civil=false
this.mphar=false
this.bphar=false
this.report=true}
if(dept=='MECH'){
this.details=this.mechCount
this.tablename="Mechanical Engineering";
this.cse=false
this.mech=true
this.ece=false
this.eee=false
this.civil=false
this.mphar=false
this.bphar=false
this.report=true}
if(dept=='CIVIL'){
this.details=this.civilCount
this.tablename="Civil Engineering";
this.cse=false
this.mech=false
this.ece=false
this.eee=false
this.civil=true
this.report=true}
if(dept=='EEE'){
this.details=this.eeeCount
this.tablename="Electriacal And Electronic Engineering";
this.cse=false
this.mech=false
this.ece=false
this.eee=true
this.civil=false
this.mphar=false
this.bphar=false
this.report=true}
if(dept=='MPHARM'){
this.details=this.mpharCount
this.tablename="MPHARMACY";
this.cse=false
this.mech=false
this.ece=false
this.eee=false
this.civil=false
this.mpharmacy=true
this.bpharmacy=false
this.report=true}
if(dept=='BPHARM'){
this.details=this.bpharCount
this.tablename="BPHARMACY";
this.cse=false
this.mech=false
this.ece=false
this.eee=false
this.civil=false
this.mpharmacy=false
this.bpharmacy=true
this.report=true}

}
 
College(clg){
this.college=clg
localStorage.setItem('recentclg',clg);
localStorage.setItem('recentdept','');
localStorage.setItem('recentinst','1');
localStorage.setItem('recentRole','Principal');
localStorage.setItem('todaystatus','0');

 if(this.test=='Day')
  {  
    console.log(clg,'college test');
    
     var onedata = {
      role:'Principal',
      dept:'',
      colg:clg,
      date: this.todaydate
    }
    console.log(this.todaydate,'date testing');
     this.service.getTodayReal(onedata).subscribe(data=>{
      this.details=data;
                 console.log(this.details,'testing clg');
   if(clg!='RCP'){
      this.mechCount=data.MECH
      this.cseCount=data.CSE
      this.civilCount=data.CIVIL
      this.eceCount=data.ECE
      this.eeeCount=data.EEE
  console.log(this.details,'testing clg');
           }
          else if(clg=='RCP'){   
      this.bpharCount=data.bPHAR
      this.mpharCount=data.mPHAR
      
           }
    
   this.count=data.data
console.log('here');

   var onedata = {
      role:'Dean',
      dept:'',
      colg:'',
      date:this.todaydate
    }
console.log(this.todaydate,'date testing');

     this.service.getTodayReal(onedata).subscribe(data=>{
      this.details=data;
     
 
      this.recCount=data.REC
      this.ritCount=data.RIT
      this.rcpCount=data.RCP
           
         
    
   this.count=data.data
      
    
console.log(data,'current log');
console.log(this.count,'current length');
     })
})
  }
else if(this.test=='Year')
  {
    console.log(clg,'college test');
    this.proveyear = {
      role:'Principal',
      dept:'',
      colg:clg,
      year: this.year
    }
     this.service.getAllyearData(this.proveyear).subscribe(data=>{
            this.details=data;
            console.log(this.details)
      if(clg!='RCP'){
      this.mechCount=data.MECH
      this.cseCount=data.CSE
      this.civilCount=data.CIVIL
      this.eceCount=data.ECE
      this.eeeCount=data.EEE
   
           }
           else if(clg=='RCP'){   
      this.bpharCount=data.bPHAR
      this.mpharCount=data.mPHAR
      
           }
    
   this.count=data.data
  this.proveyear = {
      role:'Dean',
      dept:'',
      colg:'',
      year:this.year
    }

     this.service.getAllyearData(this.proveyear).subscribe(data=>{
      this.details=data;
     
 
      this.recCount=data.REC
      this.ritCount=data.RIT
      this.rcpCount=data.RCP
           
         
    
   this.count=data.data
      
    
console.log(data,'current log');
console.log(this.count,'current length');
     })
})
  }else if(this.test=='Month'){
console.log(this.college,'clg test');

    var proveyear = {
      role:'Principal',
      dept:'',
      colg:this.college,
      year: this.year,
      month:this.month
    }
     this.service.getAllmonthData(proveyear).subscribe(data=>{
            this.details=data;
            console.log(this.details)
      if(this.college!='RCP'){
      this.mechCount=data.MECH
      this.cseCount=data.CSE
      this.civilCount=data.CIVIL
      this.eceCount=data.ECE
      this.eeeCount=data.EEE
   
           }
           else if(this.college=='RCP'){   
      this.bpharCount=data.bPHAR
      this.mpharCount=data.mPHAR
      
           }
    
   this.count=data.data
  var proveyea = {
      role:'Dean',
      dept:'',
      colg:'',
      year:this.year,
      month:this.month
    }

     this.service.getAllmonthData(proveyea).subscribe(data=>{
      this.details=data;
     
 
      this.recCount=data.REC
      this.ritCount=data.RIT
      this.rcpCount=data.RCP
           
         
    
   this.count=data.data
      
    
console.log(data,'current college');
console.log(this.count,'current length');
     })
})
    
  }


    this.principal=true
    this.dean=false
    this.Dean=false
    this.staff=false
 
}

private selectedLink: string="";        
  
    setbutton(e: string): void   
  {  
    this.test=e;
    console.log(e,'day');
    
  
        this.selectedLink = e;  
          
  }  
  
    isSelected(name: string): boolean   
  {  
  
        if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
            return false;  
  }  
  
        return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
    }   

    back()
    {
      if(this.report==true){
      this.Dean=false 
      this.principal=true
      this.report = false}
     else if(this.principal==true)
      {
         this.Dean=true
      this.principal=false
      this.report = false
    

    }

    }

  ngOnInit() {
      
 this.service.getTodayDate().subscribe(data=>{this.todaydate=data[0].todayDate;
  console.log(this.todaydate,'data today');
   
if(this.role=='Principal'){
      this.principal=true
       this.prove = {
      role:'Principal',
      dept:this.depts,
      colg:this.college,
      date:this.todaydate
    }
}
    else{
      this.Dean=true
 this.prove = {
      role:'Dean',
      dept:'',
      colg:'',
      date:this.todaydate
    }
    }
  

     this.service.getTodayReal(this.prove).subscribe(data=>{
      this.details=data;
      console.log(data,'data test in reports');
      
     if(this.role=='Dean' || this.role=='Management'){
 
      this.recCount=data.REC
      this.ritCount=data.RIT
      this.rcpCount=data.RCP
           
         
     }
     else if(this.role=='Principal'){
       if(this.college!='RCP'){
      this.mechCount=data.MECH
      this.cseCount=data.CSE
      this.civilCount=data.CIVIL
      this.eceCount=data.ECE
      this.eeeCount=data.EEE
  console.log(this.details,'testing clg');
           }
          else if(this.college=='RCP'){   
      this.bpharCount=data.bPHAR
      this.mpharCount=data.mPHAR
      
           }
     }
   this.count=data.data
      
    
console.log(data,'current log');
console.log(this.count,'current length');
     })
     console.log(this.todaydate,'date jkgk');
  });
  }

}
