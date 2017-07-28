import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import "rxjs";
import { Observable, Subscription } from 'rxjs/Rx';
import { IMyOptions, IMyDateModel } from 'mydatepicker';


@Injectable()


export class AppService {
  dropdownList     = [];
  dropdownSettings = {
    text          : "Assign Leaves",
    enableCheckAll: false,
    maxHeight     : 150,
    badgeShowLimit: 1,
    maxWidth      : 400
  };
  empId;
  holidays      = []
  staffclgdata  = []
  staffdeptdata = []
  role
  datas: any
  hist = {
    reg_no: ''
  }
  from
  year
  month
  day
  username;
  private getUrl  = "http://localhost/CI/getdata";
  private postUrl = "http://localhost/CI/postdata";


  //  private logUrl = "http://192.168.0.118/leaveconfigtheme/logstatus";



  // private logUrl  = "http://210.16.79.137/raghuerp/server/api/validLogin";
  // private getinfo = "http://192.168.0.118/leaveconfigtheme/getinfo";

  // private leaveapplyurl      = "http://192.168.0.118/leaveconfigtheme/leaveapply";
  // private leavehistoryurl    = "http://192.168.0.118/leaveconfigtheme/leavehistory";
  // private statusurl          = "http://192.168.0.118/leaveconfigtheme/status";
  // private empdataurl         = "http://192.168.0.118/leaveconfigtheme/empdata";
  // private emponeurl          = "http://192.168.0.118/leaveconfigtheme/empone";
  // private emponeavailurl     = "http://192.168.0.118/leaveconfigtheme/emponeavail";
  // private upAccepturl        = "http://192.168.0.118/leaveconfigtheme/upaccept";
  // private upreasonurl        = "http://192.168.0.118/leaveconfigtheme/upreason";
  // private todayurl           = "http://192.168.0.118/leaveconfigtheme/todaydata";
  // private emptwourl          = "http://192.168.0.118/leaveconfigtheme/emptwo";
  // private todaydate          = "http://192.168.0.118/leaveconfigtheme/currentdate";
  // private getdashUrl         = "http://192.168.0.118/leaveconfigtheme/getdash";
  // private leavetypeUrl       = "http://192.168.0.118/leaveconfigtheme/leavetype";
  // private alternateUrl       = "http://192.168.0.118/leaveconfigtheme/alternate";
  // private alternateAcceptUrl = "http://192.168.0.118/leaveconfigtheme/alternateaccept";
  // private cancelStatusUrl    = "http://192.168.0.118/leaveconfigtheme/cancelstatus";
  // private collegedataUrl     = "http://192.168.0.118/leaveconfigtheme/collegedata";
  // private departmentdataUrl  = "http://192.168.0.118/leaveconfigtheme/departmentdata";
  // private persondataUrl      = "http://192.168.0.118/leaveconfigtheme/persondata";
  // private empcounturl        = "http://192.168.0.118/leaveconfigtheme/empcount";
  // private getprincUrl        = "http://192.168.0.118/leaveconfigtheme/getprinc";
  // private alldataurl         = "http://192.168.0.118/leaveconfigtheme/alldata";
  // private allyeardataurl     = "http://192.168.0.118/leaveconfigtheme/allyeardata";
  // private allmonthdataurl    = "http://192.168.0.118/leaveconfigtheme/allmonthdata";
  // private getdeptUrl         = "http://192.168.0.118/leaveconfigtheme/getdept";
  // private getcolgUrl         = "http://192.168.0.118/leaveconfigtheme/getcolg";
  // private getholidayUrl      = "http://192.168.0.118/leaveconfigtheme/getholiday";
  // private checkholidayUrl    = "http://192.168.0.118/leaveconfigtheme/checkholiday";


  // private getemailUrl          = "http://192.168.0.118/leaveconfigtheme/getemail";
  // private coffapplyurl         = "http://192.168.0.118/leaveconfigtheme/applycoff";
  // private coffhistoryurl       = "http://192.168.0.118/leaveconfigtheme/coffhistory";
  // private upreasoncoffurl      = "http://192.168.0.118/leaveconfigtheme/upreasoncoff";
  // private coffstatusurl        = "http://192.168.0.118/leaveconfigtheme/coffstatus";
  // private upAcceptcoffurl      = "http://192.168.0.118/leaveconfigtheme/upAcceptcoff";
  // private getadmltypesUrl      = "http://192.168.0.118/leaveconfigtheme/getadmltypes";
  // private updateleavetypeUrl   = "http://192.168.0.118/leaveconfigtheme/updateleavetype";
  // private addleavetypeUrl      = "http://192.168.0.118/leaveconfigtheme/addleavetype";
  // private deleteleavetypeUrl   = "http://192.168.0.118/leaveconfigtheme/deleteleavetype";
  // private getholidaylistUrl    = "http://192.168.0.118/leaveconfigtheme/getholidaylist";
  // private deleteholidayUrl     = "http://192.168.0.118/leaveconfigtheme/deleteholiday";
  // private editholidayUrl       = "http://192.168.0.118/leaveconfigtheme/editholiday";
  // private addholidayUrl        = "http://192.168.0.118/leaveconfigtheme/addholiday";
  // private getroleslistUrl      = "http://192.168.0.118/leaveconfigtheme/getroleslist";
  // private deleteuserroleUrl    = "http://192.168.0.118/leaveconfigtheme/deleteuserrole";
  // private getrolesnameUrl      = "http://192.168.0.118/leaveconfigtheme/getrolesname";
  // private changeuserroleUrl    = "http://192.168.0.118/leaveconfigtheme/changeuserrole";
  // private adduserroleUrl       = "http://192.168.0.118/leaveconfigtheme/adduserrole";
  // private getnewUserslistUrl   = "http://192.168.0.118/leaveconfigtheme/getnewUserslist";
  // private assignleavesUrl      = "http://192.168.0.118/leaveconfigtheme/assignleaves";
  // private getroleUrl           = "http://192.168.0.118/leaveconfigtheme/getrole";
  // private getTypeleavesdataUrl = "http://192.168.0.118/leaveconfigtheme/getTypeleavesdata";
  // private empOneleavesUrl      = "http://192.168.0.118/leaveconfigtheme/empOneleaves";
  // private checkvalidurl        = "http://192.168.0.118/leaveconfigtheme/checkvalid";
  // private changeconfigUrl      = "http://192.168.0.118/leaveconfigtheme/changeconfig";
  // private deleteconfigUrl      = "http://192.168.0.118/leaveconfigtheme/deleteconfig";
  // private addconfigUrl         = "http://192.168.0.118/leaveconfigtheme/addconfig";



  private getStaffDataByCollegeUrl = "http://210.16.79.137/raghuerp/server/api/getStaffDataByCollege";
  private getStaffDataByDeptUrl    = "http://210.16.79.137/raghuerp/server/api/getStaffDataByDept";
  private getStaffDataUrl          = "http://210.16.79.137/raghuerp/server/api/getStaffData";
  private allCollegesAndDeptsUrl   = "http://210.16.79.137/raghuerp/server/api/collegeDeptDetails";
  private getStaffDataByIdUrl      = "http://210.16.79.137/raghuerp/server/api/getStaffDataById";


    //  private getStaffDataByCollegeUrl = "http://192.168.0.146/erpserver/api/getStaffDataByCollege";
    //  private getStaffDataByDeptUrl    = "http://192.168.0.146/erpserver/api/getStaffDataByDept";
    //  private getStaffDataUrl          = "http://192.168.0.146/erpserver/api/getStaffData";
    //  private getStaffDataByIdUrl      = "http://192.168.0.146/erpserver/api/getStaffDataById";
    //  private allCollegesAndDeptsUrl   = "http://192.168.0.146/erpserver/api/collegeDeptDetails";



     private logUrl             = "http://210.16.79.137/raghuerp/server/api/validLogin";
     private getinfo            = "http://210.16.79.137/raghuerp/leavesystem/server/getinfo";
     private leaveapplyurl      = "http://210.16.79.137/raghuerp/leavesystem/server/leaveapply";
     private leavehistoryurl    = "http://210.16.79.137/raghuerp/leavesystem/server/leavehistory";
     private statusurl          = "http://210.16.79.137/raghuerp/leavesystem/server/status";
     private empdataurl         = "http://210.16.79.137/raghuerp/leavesystem/server/empdata";
     private emponeurl          = "http://210.16.79.137/raghuerp/leavesystem/server/empone";
     private emponeavailurl     = "http://210.16.79.137/raghuerp/leavesystem/server/emponeavail";
     private upAccepturl        = "http://210.16.79.137/raghuerp/leavesystem/server/upaccept";
     private upreasonurl        = "http://210.16.79.137/raghuerp/leavesystem/server/upreason";
     private todayurl           = "http://210.16.79.137/raghuerp/leavesystem/server/todaydata";
     private emptwourl          = "http://210.16.79.137/raghuerp/leavesystem/server/emptwo";
     private todaydate          = "http://210.16.79.137/raghuerp/leavesystem/server/currentdate";
     private getdashUrl         = "http://210.16.79.137/raghuerp/leavesystem/server/getdash";
     private leavetypeUrl       = "http://210.16.79.137/raghuerp/leavesystem/server/leavetype";
     private alternateUrl       = "http://210.16.79.137/raghuerp/leavesystem/server/alternate";
     private alternateAcceptUrl = "http://210.16.79.137/raghuerp/leavesystem/server/alternateaccept";
     private cancelStatusUrl    = "http://210.16.79.137/raghuerp/leavesystem/server/cancelstatus";
     private collegedataUrl     = "http://210.16.79.137/raghuerp/leavesystem/server/collegedata";
     private departmentdataUrl  = "http://210.16.79.137/raghuerp/leavesystem/server/departmentdata";
     private persondataUrl      = "http://210.16.79.137/raghuerp/leavesystem/server/persondata";
     private empcounturl        = "http://210.16.79.137/raghuerp/leavesystem/server/empcount";
     private getprincUrl        = "http://210.16.79.137/raghuerp/leavesystem/server/getprinc";
     private alldataurl         = "http://210.16.79.137/raghuerp/leavesystem/server/alldata";
     private allyeardataurl     = "http://210.16.79.137/raghuerp/leavesystem/server/allyeardata";
     private allmonthdataurl    = "http://210.16.79.137/raghuerp/leavesystem/server/allmonthdata";
     private getdeptUrl         = "http://210.16.79.137/raghuerp/leavesystem/server/getdept";
     private getcolgUrl         = "http://210.16.79.137/raghuerp/leavesystem/server/getcolg";
     private getholidayUrl      = "http://210.16.79.137/raghuerp/leavesystem/server/getholiday";
     private checkholidayUrl    = "http://210.16.79.137/raghuerp/leavesystem/server/checkholiday";


   private getemailUrl          = "http://210.16.79.137/raghuerp/leavesystem/server/getemail";
   private coffapplyurl         = "http://210.16.79.137/raghuerp/leavesystem/server/applycoff";
   private coffhistoryurl       = "http://210.16.79.137/raghuerp/leavesystem/server/coffhistory";
   private upreasoncoffurl      = "http://210.16.79.137/raghuerp/leavesystem/server/upreasoncoff";
   private coffstatusurl        = "http://210.16.79.137/raghuerp/leavesystem/server/coffstatus";
   private upAcceptcoffurl      = "http://210.16.79.137/raghuerp/leavesystem/server/upAcceptcoff";
   private getadmltypesUrl      = "http://210.16.79.137/raghuerp/leavesystem/server/getadmltypes";
   private updateleavetypeUrl   = "http://210.16.79.137/raghuerp/leavesystem/server/updateleavetype";
   private addleavetypeUrl      = "http://210.16.79.137/raghuerp/leavesystem/server/addleavetype";
   private deleteleavetypeUrl   = "http://210.16.79.137/raghuerp/leavesystem/server/deleteleavetype";
   private getholidaylistUrl    = "http://210.16.79.137/raghuerp/leavesystem/server/getholidaylist";
   private deleteholidayUrl     = "http://210.16.79.137/raghuerp/leavesystem/server/deleteholiday";
   private editholidayUrl       = "http://210.16.79.137/raghuerp/leavesystem/server/editholiday";
   private addholidayUrl        = "http://210.16.79.137/raghuerp/leavesystem/server/addholiday";
   private getroleslistUrl      = "http://210.16.79.137/raghuerp/leavesystem/server/getroleslist";
   private deleteuserroleUrl    = "http://210.16.79.137/raghuerp/leavesystem/server/deleteuserrole";
   private getrolesnameUrl      = "http://210.16.79.137/raghuerp/leavesystem/server/getrolesname";
   private changeuserroleUrl    = "http://210.16.79.137/raghuerp/leavesystem/server/changeuserrole";
   private adduserroleUrl       = "http://210.16.79.137/raghuerp/leavesystem/server/adduserrole";
   private getnewUserslistUrl   = "http://210.16.79.137/raghuerp/leavesystem/server/getnewUserslist";
   private assignleavesUrl      = "http://210.16.79.137/raghuerp/leavesystem/server/assignleaves";
   private getroleUrl           = "http://210.16.79.137/raghuerp/leavesystem/server/getrole";
   private getTypeleavesdataUrl = "http://210.16.79.137/raghuerp/leavesystem/server/getTypeleavesdata";
   private empOneleavesUrl      = "http://210.16.79.137/raghuerp/leavesystem/server/empOneleaves";
   private checkvalidurl        = "http://210.16.79.137/raghuerp/leavesystem/server/checkvalid";

  private changeconfigUrl = "http://210.16.79.137/raghuerp/leavesystem/server/changeconfig";
  private deleteconfigUrl = "http://210.16.79.137/raghuerp/leavesystem/server/deleteconfig";
  private addconfigUrl    = "http://210.16.79.137/raghuerp/leavesystem/server/addconfig";


  
  data: any
  constructor(private http: Http) {
    // this.newData().subscribe(data => console.log(data, 'sql data in serviceee'))



  }
  getStaffDataById(val) {
    let bodyString = JSON.stringify(val);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.getStaffDataByIdUrl, 'post', val);
  }
  getStaffDataByCollege(val) {

    let bodyString = JSON.stringify(val);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.getStaffDataByCollegeUrl, 'post', val);
  }
  getStaffDataByDept(val) {

    let bodyString = JSON.stringify(val);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.getStaffDataByDeptUrl, 'post', val);
  }
  getStaffData(val) {
    let bodyString = JSON.stringify(val);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.getStaffDataUrl, 'post', val);
  }

  allCollegesAndDepts(val) {
    let bodyString = JSON.stringify(val);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.allCollegesAndDeptsUrl, 'post', val);
  }

  getTypeleavesdata() {
    const val = {}
    return this.callApi(this.getTypeleavesdataUrl, 'get', val);
  }

  getholidays() {
    this.getHolidays().subscribe(data2 => {

      for (var i = 0; i < data2.length; i++) {
        data2[i].year  = Number(data2[i].year);
        data2[i].month = Number(data2[i].month);
        data2[i].day   = Number(data2[i].day);
      }
      this.holidays = data2
      // console.log(data2,'holidays data');
    })
  }
  adduserrole(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.adduserroleUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }
  changeroles(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.changeuserroleUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }
   changeconfig(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.changeconfigUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }
     deleteconfig(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.deleteconfigUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }
     addconfig(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.addconfigUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }
  getuserRole(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.getroleUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  assignleaves(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.assignleavesUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }
  deleteuserRole(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.deleteuserroleUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }
  getRolename() {
    const value = {}
    return this.callApi(this.getrolesnameUrl, 'get', value);
  }

  getroleslist() {
    const value = {}
    return this.callApi(this.getroleslistUrl, 'get', value);
  }

  getnewUserslist() {
    const value = {}
    return this.callApi(this.getnewUserslistUrl, 'get', value);
  }



  deleteleavetype(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.deleteleavetypeUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  addholiday(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.addholidayUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  editholiday(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.editholidayUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  addleavetype(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.addleavetypeUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  updateleavetype(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.updateleavetypeUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }


  login(value) {

    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.logUrl, 'post', value);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  getadminleavetypes() {
    const value = {}
    return this.callApi(this.getadmltypesUrl, 'get', value);

  }

  getmails() {
    const value = {}
    return this.callApi(this.getemailUrl, 'get', value);

  }

  dashboardData() {
    const value = {}
    return this.callApi(this.getdashUrl, 'get', value);
    // return this.http.get(this.getdashUrl)
    //   .map((response: Response) => response.json());

  }
  newData() {

    const value = {}
    return this.callApi(this.getinfo, 'get', value);
    // return this.http.get(this.getinfo)
    //   .map((response: Response) => response.json())


  }

  chechHolidays(from, to) {
    var onedata = {
      from: from,
      to  : to
    }

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.callApi(this.checkholidayUrl, 'post', onedata);

  }
  getHolidays() {
    const value = {}
    return this.callApi(this.getholidayUrl, 'get', value);
  }
  getHolidaylist() {
    const value = {}
    return this.callApi(this.getholidaylistUrl, 'get', value);
  }

  deleteholiday(onedata) {


    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.callApi(this.deleteholidayUrl, 'post', onedata);

  }
  getAllData(onedata) {


    let role = localStorage.getItem('realRole');
    let dept = localStorage.getItem('recentdept');
    var inst = localStorage.getItem('recentinst');
    var colg = localStorage.getItem('recentclg');
    console.log('role => ', role, ' dept =>> ', dept, ' inst => ', inst, ' colg => ', colg);


    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');


    return this.callApi(this.alldataurl, 'post', onedata);
    // return this.http.post(this.alldataurl, bodyString, options)
    //   .map((res: Response) => res.json());



  }
  getAllyearData(onedata) {


    let role = localStorage.getItem('realRole');
    let dept = localStorage.getItem('recentdept');
    var inst = localStorage.getItem('recentinst');
    var colg = localStorage.getItem('recentclg');
    console.log('role => ', role, ' dept =>> ', dept, ' inst => ', inst, ' colg => ', colg);


    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.allyeardataurl, 'post', onedata);
    // return this.http.post(this.allyeardataurl, bodyString, options)
    //   .map((res: Response) => res.json());



  }
  getAllmonthData(onedata) {


    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.allmonthdataurl, 'post', onedata);
    // return this.http.post(this.allyeardataurl, bodyString, options)
    //   .map((res: Response) => res.json());



  }


  getColg() {

    const data = {}

    let bodyString = JSON.stringify(data);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');


    return this.callApi(this.getcolgUrl, 'get', data);
    // return this.http.post(this.getcolgUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  getDept(colg) {

    const data = {
      colg: colg,

    }

    let bodyString = JSON.stringify(data);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.getdeptUrl, 'post', data);
    // return this.http.post(this.getdeptUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }


  getprinc(colg, dept) {

    const data = {
      colg: colg,
      dept: dept
    }

    let bodyString = JSON.stringify(data);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.getprincUrl, 'post', data);
    // return this.http.post(this.getprincUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  postData(value: any) {



    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.postUrl, 'post', value);
    // return this.http.post(this.postUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  loginInfo(data: any) {


    let bodyString = JSON.stringify(data);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });
    return this.callApi(this.logUrl, 'post', data);
    // return this.http.post(this.logUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  leaveapply(value) {


    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.leaveapplyurl, 'post', value);
    // return this.http.post(this.leaveapplyurl, bodyString, options)
    //   .map((res: Response) => res.json());


  }
  coffapply(value) {


    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.coffapplyurl, 'post', value);
    // return this.http.post(this.coffapplyurl, bodyString, options)
    //   .map((res: Response) => res.json());


  }


  getHistoryBYIdcoff() {
    const reg_no           = localStorage.getItem('emp_id')
          this.hist.reg_no = reg_no;
    // console.log(value, 'local storage emp_id');


    let bodyString = this.hist;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');
    return this.callApi(this.coffhistoryurl, 'post', this.hist);

    // return this.http.post(this.leavehistoryurl, bodyString, options)
    //   .map((res: Response) => res.json());
  }


  getHistoryBYId() {
    const reg_no           = localStorage.getItem('emp_id')
          this.hist.reg_no = reg_no;
    // console.log(value, 'local storage emp_id');


    let bodyString = this.hist;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');
    return this.callApi(this.leavehistoryurl, 'post', this.hist);

    // return this.http.post(this.leavehistoryurl, bodyString, options)
    //   .map((res: Response) => res.json());
  }


  getHistoryBYCoffStatus() {

    let role = localStorage.getItem('empRole');
    let clg  = localStorage.getItem('empcolg');
    let dept = localStorage.getItem('empdept');


    const onedata = {
      role: role,
      dept: dept,
      colg: clg
    }
    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');
    return this.callApi(this.coffstatusurl, 'post', onedata);

  }

  getHistoryBYStatus() {

    let role = localStorage.getItem('empRole');
    let clg  = localStorage.getItem('empcolg');
    let dept = localStorage.getItem('empdept');


    const onedata = {
      role: role,
      dept: dept,
      colg: clg
    }
    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');
    return this.callApi(this.statusurl, 'post', onedata);

  }

  getTodayDate() {
    const dataone = {}
    return this.callApi(this.todaydate, 'get', dataone);
    // return this.http.get(this.todaydate)
    //   .map((response: Response) => response.json());
  }
  getempData() {


    const dataone = {
      role: localStorage.getItem('empRole'),
      dept: localStorage.getItem('empdept'),
      colg: localStorage.getItem('empcolg')
    }


    let bodyString = dataone;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.empdataurl, 'post', dataone);
    // return this.http.post(this.empdataurl, bodyString, options)
    //   .map((res: Response) => res.json());

  }


  updateAcceptCoffStatus(onedata) {


    console.log(onedata, 'local storage emp_id');


    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.upAcceptcoffurl, 'post', onedata);

    // return this.http.post(this.upAccepturl, bodyString, options)
    //   .map((res: Response) => res.json());

  }

  updateAccetpStatus(onedata) {


    console.log(onedata, 'local storage emp_id');


    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.upAccepturl, 'post', onedata);

    // return this.http.post(this.upAccepturl, bodyString, options)
    //   .map((res: Response) => res.json());

  }

  getoneData(id) {
    const value   = localStorage.getItem('emp_id');
    const onedata = {
      emp_id: id
    }
    console.log(onedata, 'local storage emp_id');


    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.emponeurl, 'post', onedata);
    // return this.http.post(this.emponeurl, bodyString, options)
    //   .map((res: Response) => res.json());

  }

  getoneAvail(id, lid) {
    const value   = localStorage.getItem('emp_id');
    const onedata = {
      emp_id  : id,
      leave_id: lid
    }
    console.log(onedata, 'local storage emp_id');


    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.emponeavailurl, 'post', onedata);
    // return this.http.post(this.emponeavailurl, bodyString, options)
    //   .map((res: Response) => res.json());

  }
  checkvalid(){
    const value   = localStorage.getItem('reg_no');
    const onedata = {
      emp_id: value
    }
    console.log(onedata, 'local storage emp_id');


    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.checkvalidurl, 'post', onedata);
  }

  getonceData(onedata) {
   
   
    console.log(onedata, 'local storage emp_id');


    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.emponeurl, 'post', onedata);
    // return this.http.post(this.emponeurl, bodyString, options)
    //   .map((res: Response) => res.json());

  }

  upRejectcoff(data) {

    let bodyString = data;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.upreasoncoffurl, 'post', data);
    // return this.http.post(this.upreasonurl, bodyString, options)
    //   .map((res: Response) => res.json());
  }


  empOneleaves() {

    const data       = {}
    let   bodyString = data;
    let   headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let   options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.empOneleavesUrl, 'get', data);
    // return this.http.post(this.upreasonurl, bodyString, options)
    //   .map((res: Response) => res.json());
  }
  upReject(data) {

    let bodyString = data;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.upreasonurl, 'post', data);
    // return this.http.post(this.upreasonurl, bodyString, options)
    //   .map((res: Response) => res.json());
  }


  getToday() {


    let role = localStorage.getItem('recentRole');
    let dept = localStorage.getItem('recentdept');
    var inst = localStorage.getItem('recentinst');
    var colg = localStorage.getItem('recentclg');
    console.log('role => ', role, ' dept =>> ', dept, ' inst => ', inst, ' colg => ', colg);

    const onedata = {
      role: role,
      dept: dept,
      inst: inst,
      colg: colg
    }
    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');


    return this.callApi(this.todayurl, 'post', onedata);
    // return this.http.post(this.todayurl, bodyString, options)
    //   .map((res: Response) => res.json());



  }
  empCount(onedata) {

    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.empcounturl, 'post', onedata);
    // return this.http.post(this.empcounturl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  getTodayReal(onedata) {


    let role = localStorage.getItem('realRole');
    let dept = localStorage.getItem('recentdept');
    var inst = localStorage.getItem('recentinst');
    var colg = localStorage.getItem('recentclg');
    console.log('role => ', role, ' dept =>> ', dept, ' inst => ', inst, ' colg => ', colg);

    // const onedata = {
    //   role:role,
    //   dept:dept,
    //   inst:inst,
    //   colg:colg
    // }
    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');
    return this.callApi(this.todayurl, 'post', onedata);

    // return this.http.post(this.todayurl, bodyString, options)
    //   .map((res: Response) => res.json());



  }

  getEmp1Data() {
    const value   = localStorage.getItem('emp_id');
    const onedata = {
      emp_id: value
    }
    console.log(onedata, 'local storage emp_id');


    let bodyString = onedata;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.emptwourl, 'post', onedata);
    // return this.http.post(this.emptwourl, bodyString, options)
    //   .map((res: Response) => res.json());

  }
  leavestype() {
    var value = {}
    return this.callApi(this.leavetypeUrl, 'get', value);
    // return this.http.get(this.leavetypeUrl)
    //   .map((response: Response) => response.json());
  }

  alternateData(id) {


    const value = {
      id: id
    }
    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.alternateUrl, 'post', value);
    // return this.http.post(this.alternateUrl, bodyString, options)
    //   .map((res: Response) => res.json());
  }

  statusAlternate(lid, status, reason, name, uname, uid,email) {

    const value = {
      lid   : lid,
      status: status,
      reason: reason,
      dept  : localStorage.getItem('empdept'),
      colg  : localStorage.getItem('empcolg'),
      id    : localStorage.getItem('emp_id'),
      name  : name,
      uname : uname,
      uid   : uid,
      email : email

    }
    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');
    if (localStorage.getItem('currentUser')) {
      headers.append('token', localStorage.getItem('currentUser'));
    }

    return this.http.post(this.alternateAcceptUrl, bodyString, options);
    // .map(this.extractData);

  }
  private extractData(res: Response) {
    return res.text() ? res.json(): {};
  }

  cancelStatus(lid) {


    const value = {
      lid: lid,

    }
    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');
    if (localStorage.getItem('currentUser')) {
      headers.append('token', localStorage.getItem('currentUser'));
    }


    return this.http.post(this.cancelStatusUrl, bodyString, options)
    // .map((res: Response) => res.json());
  }

  collegeData() {

    const value = {}

    return this.callApi(this.collegedataUrl, 'get', value);
    // return this.http.post(this.collegedataUrl, bodyString, options)
    // .map((res: Response) => res.json());
  }

  departmentData(colg) {
    const value = {
      colg: colg
    }
    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');

    return this.callApi(this.departmentdataUrl, 'post', value);
    // return this.http.post(this.departmentdataUrl, bodyString, options)
    //   .map((res: Response) => res.json());

  }
  personData(colg, dept, reg_no) {
    const value = {
      colg  : colg,
      dept  : dept,
      emp_id: reg_no
    }
    let bodyString = JSON.stringify(value);
    let headers    = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    console.log(bodyString, 'body');
    return this.callApi(this.persondataUrl, 'post', value);

    // return this.http.post(this.persondataUrl, bodyString, options)
    //   .map((res: Response) => res.json());

  }

  // responsible for making api calls
  callApi(url: string, method: string, body: Object): Observable<any> {
    console.log(`Http call - url: ${url}, body: ${JSON.stringify(body)}`);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    // if user is logged in, append token to header

    if (localStorage.getItem('currentUser')) {
      headers.append('token', localStorage.getItem('currentUser'));
    }


    //  headers.append('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZWdfbm8iOiJSRUNDU0UwMDEifQ._bKC0f-KOjAkw_a6iPar6b2ldyOpP9ucY7U2sXp0oTs');

    switch (method) {
      case 'post': return this.http.post(url, body, options).map((response: Response) => response.json());
      case 'get' : return this.http.get(url, options).map((response: Response) => response.json());
    }
  }


}
