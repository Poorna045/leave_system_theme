import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "app/Services/app.service";
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { Popup } from 'ng2-opd-popup';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
declare var $;

@Component({
  selector: 'app-coff',
  templateUrl: './coff.component.html',
  styleUrls: ['./coff.component.css']
})
export class CoffComponent implements OnInit {
    dept: string;
    college: string;
    emailss = [];


    except: any;
    weekends: any;
    removespc = '';


    @Output() applyleave = new EventEmitter()

    check: boolean;
    emails = []
    staffmail=[]
    am = ''
    pm = ''

    aid: any;
    leavetype: any;
    show = false
    disp = 'Your Selected Days are below 0 days'
    disp1 = "Please select Morning/Afternoon"
    disp2 = "Please select Afternoon/Evening"
    from1 = ''
    to1 = ''
    ddd = '';
    diff = 0;
    value: any;
    date = new Date();
    current
    year
    month
    day
    lastActivityTime: Date;
    types = 'SELECT'
    title = 'app works!';
    optionsModel: number[];
    days: any
    count = 0;
    from = ''
    to = ''
    fromdate = ''
    todate = ''
    response = ''
    reg_no = localStorage.getItem('emp_id');
    inst_id = localStorage.getItem('instituteID');

    starting = {
        from: '',
        to: ''
    }

    role
    holidays = []
    collegeInfo = []
    departmentInfo = []
    personInfo = []
    College = "College"
    Department = "Department"
    Person = "Person"


    coff = {
        from: '',
        to: '',
        days: '',
        reason: '',   
        reg_no: localStorage.getItem('emp_id'),       
        status: 'Pending',
        emails: [],
        dept:localStorage.getItem('empdept'),
        colg:localStorage.getItem('empcolg'),
        name:localStorage.getItem('empName')

    }

    @ViewChild('popup1') popup1: Popup;
    @ViewChild('popup2') popup2: Popup;


    public toasterconfig: ToasterConfig =
    new ToasterConfig({

        showCloseButton: true,
        tapToDismiss: true,
        timeout: 2000

    });


    checkemail(event) {

        event.selected = (event.selected) ? true : false;

        if (event.selected == true) {
           this.staffmail.push(event.email);
           
        } else if (event.selected == false) {
            for (var i = 0; i < this.staffmail.length; i++) {
                if (this.staffmail[i] == event.email) {
                    var index = this.staffmail.indexOf(event.email);

                    this.staffmail.splice(index, 1);
                }
            }
        }
        console.log(this.staffmail,'staff mail testing');
        

    }


    public model: Object = { date: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 } };

    public toasterService: ToasterService;
    constructor(private service: AppService, toasterService: ToasterService, private router: Router, public popup: Popup) {
        //  this.toastr.setRootViewContainerRef(vcr);
        this.toasterService = toasterService;
        this.role = localStorage.getItem('realRole');
        console.log(this.inst_id, 'inst id', this.role, 'role type')



    }
 

    removespaces(e) {
        this.removespc = e.replace(/\s+/g, '');
    }

    ngOnInit() {

this.college=localStorage.getItem('empcolg')
    this.dept=localStorage.getItem('empdept')
    this.role=localStorage.getItem('empRole');
    this.reg_no=localStorage.getItem('emp_id');
        this.service.getmails().subscribe(data => {
            this.emails = data;
            for(var i=0;i<data.length;i++){
            this.coff.emails.push(data[i].email);
            
            }
console.log(data, 'emails test');
        })
        // let day = this.date.getDate();
        // let month = this.date.getMonth();
        // let year = this.date.getFullYear();
        // this.year = year;
        // this.month = month + 1;
        // this.day = day;
        // console.log(this.day + '-' + this.month + '-' + this.year + ' current date');
        const das = {
            utype: 'adm'
        }
         this.service.getStaffData(das).subscribe(dats => {
            console.log(dats.data.data, 'staff data testing');
             this.service.getroleslist().subscribe(role=>{
             
             console.log(role,'roletest');
             
         for(var d=0;d<dats.data.data.length;d++){
             let check=0
             for(var k=0;k<role.length;k++){
            
               
               if(dats.data.data[d].reg_no==role[k].reg_no){
                 dats.data.data[d].role=role[k].role;


                 if(this.role=='HOD'||this.role=='Staff'){
                 if(((role[k].role=='HOD' &&  dats.data.data[d].department==this.dept ) ||( role[k].role=='Principal')) && this.college==dats.data.data[d].college ){
                   this.emailss.push(dats.data.data[d].email)
                  
                   
                 }
                 }else  if(this.role=='Principal'){
                 if( role[k].role=='Principal' && this.college==dats.data.data[d].college ){
                   this.emailss.push(dats.data.data[d].email)
                 
                   
                 }
                 }else  if(this.role=='Dean'){
                    if(((role[k].role=='Dean' &&  dats.data.data[d].department==this.dept) ||( role[k].role=='Principal')) && this.college==dats.data.data[d].college ){
                   this.emailss.push(dats.data.data[d].email)
                 
                   
                 }
                 }


                check=1
                 
          break
               }
             }
             if(check==0){
                 dats.data.data[d].role='Staff'
             }
            }
            console.log(this.emailss,'ssss');
            
            // for(var i=0;i<data.data.colleges.length;i++){
            //     this.collegeInfo[i]=data.data.colleges[i].college

            // }
            //  console.log(this.collegeInfo.length);
})
        })

    }

    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
        editableDateField: false,
        disableWeekends: false,
        disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 }
        // disableUntil: {year: , month: 5 , day: 17}

    };
    public myDatePickerOptions2: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
        editableDateField: false,
        disableWeekends: false,  
        disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 }
        // disableUntil: {year: , month: 5 , day: 17}

    };



    opt() {
        console.log('coming');

    }

    onPropertyChange(test) {

        console.log(this.from, '<== from', this.to, '<== to');
        if (test == 'from') {
            this.from1 = 'a'
        }
        if (test == 'to') {
            this.to1 = 'a'
        }
        this.checkDays();

    }

    onDateChanged(event: IMyDateModel) {

        if (this.from1 == '') {
            this.from1 = 'r'
        }

        console.log(this.fromdate, 'from date test');
        console.log(event, 'event testing');

        this.myDatePickerOptions2.disableUntil.year = event.date.year
        this.myDatePickerOptions2.disableUntil.month = event.date.month
        this.myDatePickerOptions2.disableUntil.day = event.date.day - 1


        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.epoc != 0) {
            this.from = event.formatted
            this.service.from = this.from
            console.log(this.from, 'dasss');

            this.checkDays();
        } else if (event.epoc == 0) {
            this.from = '';
        }


    }

    onDateChanged2(event: IMyDateModel) {
        if (this.to1 == '') {
            this.to1 = 'r'
        }

        console.log(this.todate, 'from date test');

        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.epoc != 0) {
            this.to = event.formatted
            console.log(this.to, 'date checking');

            this.checkDays();
        } else if (event.epoc == 0) {
            this.to = '';
        }

    }
    Type(a) {

        this.types = a;
        console.log(this.types, 'type');


    }
    submitLeave(value) {

        console.log(this.from, this.to, 'from to date tests');

        console.log(value, 'valueee');
        console.log(this.starting.from, 'date from');
        console.log(this.starting.to, 'to date');

        console.log(new Date(value.jsdate).toLocaleDateString(), '===> date');
        console.log(value.startdate.formatted, 'hsj');


        console.log(value.startdate.formatted, '<== from', value.enddate.formatted, '<== to', this.types, '<==type', this.count, '<==days', value.reason, '<== reason');

        this.coff.from = value.startdate.formatted + ' ' + this.am;
        this.coff.to = value.enddate.formatted + ' ' + this.pm;
        this.coff.reason = value.reason;
        this.coff.days = this.count.toString();
        if(this.role=='Staff'){
             for(var i=0;i<this.staffmail.length;i++){
              
              this.coff.emails.push(this.staffmail[i])
                 
            }       
        }
    
     for(var i=0;i<this.emailss.length;i++){
        this.coff.emails.push(this.emailss[i])
         
         }
        console.log(this.coff, 'total data in leave apply');

        this.service.coffapply(this.coff)
            .subscribe(data => {
                console.log(data, 'data from sql');
                const show = data;
                if (show['info'] == 'lop') {

                    this.value = JSON.parse(show['send']);
                    console.log('lop popup');
                    this.diff = this.count - this.value;
                    this.goPopup();
                }
                else if (show['info'] == 'Already Exists') {

                    console.log('exists popup');

                    this.goPopup2();
                }
                else if (show['info'] == 'insert') {
                    console.log('insert popup');

                    this.coff.reason = ''
                    this.starting.from = ''
                    this.starting.to = ''
                    this.from = ''
                    this.to = ''
                
                    this.count = 0
                 
                    this.popToast();


                    console.log('show');

                    this.applyleave.emit(false);

                }
            })
    }

    ok() {
        console.log('hello');
        this.popup2.hide();


    }
    reset() {
        this.coff.reason = ''
        this.starting.from = ''
        this.starting.to = ''
        this.from = ''
        this.to = ''
        this.count = 0
        this.from1 = ''
        this.to1 = ''
        this.fromdate = ''
        this.todate = ''
    }


    checkDays() {


            var start = new Date(this.from);
            var finish = new Date(this.to);
            var dayMilliseconds = 1000 * 60 * 60 * 24;

            var date1_ms = start.getTime();
            var date2_ms = finish.getTime();

            // var weekendDays = 0;
            // while (start.getTime() <= finish.getTime()) {
            //     var day = start.getDay();
            //     if (day == 0) {
            //         weekendDays++;
            //     }
            //     start = new Date(+start + dayMilliseconds);
            // }


            // this.weekends = weekendDays;

            console.log(date2_ms, 'date ms');

            var diff_ms = date2_ms - date1_ms + dayMilliseconds;

            var final = Math.round(diff_ms / dayMilliseconds);

            final = final;
            console.log(final, "  <=== time");

            if (this.starting.from == 'morning' && this.starting.to == 'afternoon') {
                if (final != 0) {
                    final = final - 0.5;
                    this.count = final;
                } else if (final == 0) {
                    this.count = final;
                }
                this.am = '09:00:00'
                this.pm = '12:00:00'
            }
            else if (this.starting.from == 'morning' && this.starting.to == 'evening') {

                this.count = final;
                this.am = '09:00:00'
                this.pm = '17:00:00'

            }
            else if (this.starting.from == 'afternoon' && this.starting.to == 'afternoon') {
                if (final != 0) {
                    final = final - 1;
                    this.count = final;
                } else if (final == 0) {
                    this.count = final;
                }
                this.am = '12:00:00'
                this.pm = '12:00:00'

            }
            else if (this.starting.from == 'afternoon' && this.starting.to == 'evening') {
                if (final != 0) {
                    final = final - 0.5;
                    this.count = final;
                } else if (final == 0) {
                    this.count = final;
                }

                this.am = '12:00:00'
                this.pm = '17:00:00'

            }
   


    }


    goPopup() {
        //myModal.open()

        this.popup1.options = {
            header: "Warning!",
            color: "#34495e", // red, blue.... 
            widthProsentage: 50, // The with of the popou measured by browser width 
            animationDuration: 1, // in seconds, 0 = no animation 
            showButtons: true, // You can hide this in case you want to use custom buttons 
            confirmBtnContent: "ok", // The text on your confirm button 
            cancleBtnContent: "Cancel", // the text on your cancel button 
            confirmBtnClass: "btn btn-default btn-square", // your class for styling the confirm button 
            cancleBtnClass: "btn btn-danger btn-square", // you class for styling the cancel button 
            animation: "bounceInDown",// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
        };






        this.popup1.show(this.popup1.options);

        //this.popup1.show();

    }
    goPopup2() {
        //myModal.open()

        this.popup2.options = {
            header: "Warning!",
            color: "#34495e", // red, blue.... 
            widthProsentage: 50, // The with of the popou measured by browser width 
            animationDuration: 1,
            showButtons: false, // You can hide this in case you want to use custom buttons 
            animation: "bounceInDown",// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
        };






        this.popup2.show(this.popup2.options);

        //this.popup1.show();

    }


    popToast() {
        this.toasterService.pop('success', '', 'Successfully submitted your leave Request');

    }

    onChange(value) {

        console.log(value, 'options value');
        console.log(this.optionsModel, 'options model');

    }

}
