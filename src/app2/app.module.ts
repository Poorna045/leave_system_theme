import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NumfilterPipe } from './numfilter.pipe';
import { DatatablesPipe } from './datatables.pipe';
import { AppService } from "app/Services/app.service";


//third party

import { MyDatePickerModule } from 'mydatepicker';
import { DataTableModule } from "angular2-datatable";
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { PopupModule } from 'ng2-opd-popup';
import { TooltipModule } from "ng2-tooltip";
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {SelectModule} from 'ng2-select';




import { AppComponent } from './app.component';
import { AlternateviewComponent } from './alternateview/alternateview.component';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleavesdataComponent } from './empleavesdata/empleavesdata.component';
import { FDashboardComponent } from './f-dashboard/fDashboard.component';
import { LeaveapprovalComponent } from './leaveapproval/leaveapproval.component';
import { LeavehistoryComponent } from './leavehistory/leavehistory.component';
import { LoginComponent } from './login/login.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { ReportdashboardComponent } from './reportdashboard/reportdashboard.component';
import { YearPickerComponent } from './year-picker/year-picker.component';


import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
import { RemovespacesPipe } from './removespaces.pipe';
import { CoffComponent } from './coff/coff.component';
import { CoffapprovalComponent } from './coffapproval/coffapproval.component';
import { CoffhistoryComponent } from './coffhistory/coffhistory.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminleavetypesComponent } from './adminleavetypes/adminleavetypes.component';
import { AdminholidaysComponent } from './adminholidays/adminholidays.component';
import { AssignRolesComponent } from './assign-roles/assign-roles.component';
import { AssignleavesComponent } from './assignleaves/assignleaves.component';
import { AuthGuard } from "app/_guards/auth.guard";
import { routing } from "app/app.routing";
import { LeavesassignsearchPipe } from './leavesassignsearch.pipe';
import { ConfigComponent } from './config/config.component';
import { RtableComponent } from './rtable/rtable.component';
import { DaterangePipe } from './daterange.pipe';

  declare var require: any;

export function highchartsFactory() {

  var hc = require('highcharts');
    var hcm = require('highcharts/highcharts-more');
    var exp = require('highcharts/modules/drilldown');
    var sg = require('highcharts/modules/solid-gauge');

    hcm(hc);
    exp(hc);
    sg(hc);
    return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    LeavehistoryComponent,
    DatatablesPipe,
    LeaveapprovalComponent,
    FDashboardComponent,
    MonthPickerComponent,
    ReportdashboardComponent,
    YearPickerComponent,
    AlternateviewComponent,
    ApplyleaveComponent,
    EmpleavesdataComponent,
    NumfilterPipe,
    RemovespacesPipe,
    CoffComponent,
    CoffapprovalComponent,
    CoffhistoryComponent,
    AdmindashboardComponent,
    AdminleavetypesComponent,
    AdminholidaysComponent,
    AssignRolesComponent,
    AssignleavesComponent,
    LeavesassignsearchPipe,
    ConfigComponent,
    RtableComponent,
    DaterangePipe,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    ToasterModule,
    TooltipModule,
    PopupModule.forRoot(),
    DataTableModule,
   ChartModule,
   routing,
    // AngularMultiSelectModule,
    SelectModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'applyleave', component: ApplyleaveComponent },

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ])

  ],
  providers: [AppService, AuthGuard, ToasterService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }






