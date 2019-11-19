
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TimeManagementComponent } from './time-management.component';


const routes: Routes = [
  {
    path: '',
    component: TimeManagementComponent,
  },
  
  
{
    path: 'occasion', loadChildren: './components/occasion/occasion.module#OccasionModule',
    data: {
      moduleName: 'Occasion'
    },
},

{
    path: 'feeding-hour', loadChildren: './components/feeding-hour/feeding-hour.module#FeedingHourModule',
    data: {
      moduleName: 'FeedingHour'
    },
},

{
    path: 'continuity-data-for-authority-employee', loadChildren: './components/continuity-data-for-authority-employee/continuity-data-for-authority-employee.module#ContinuityDataForAuthorityEmployeeModule',
    data: {
      moduleName: 'ContinuityDataForAuthorityEmployee'
    },
},

{
    path: 'additional-mission', loadChildren: './components/additional-mission/additional-mission.module#AdditionalMissionModule',
    data: {
      moduleName: 'AdditionalMission'
    },
},

{
    path: 'daily-print-error-data', loadChildren: './components/daily-print-error-data/daily-print-error-data.module#DailyPrintErrorDataModule',
    data: {
      moduleName: 'DailyPrintErrorData'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TimeManagementRoutingModule {
}

