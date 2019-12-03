
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayListSubsystemCodeComponent } from './assay-list-subsystem-code.component';


const routes: Routes = [
  {
    path: '',
    component: AssayListSubsystemCodeComponent,
	
  },
  
{
    path: 'implementation-activity-schedule', loadChildren: './components/implementation-activity-schedule/implementation-activity-schedule.module#ImplementationActivityScheduleModule',
    data: {
      moduleName: 'ImplementationActivitySchedule'
    },
},

{
    path: 'implementation-data-schedule', loadChildren: './components/implementation-data-schedule/implementation-data-schedule.module#ImplementationDataScheduleModule',
    data: {
      moduleName: 'ImplementationDataSchedule'
    },
},

{
    path: 'material-type', loadChildren: './components/material-type/material-type.module#MaterialTypeModule',
    data: {
      moduleName: 'MaterialType'
    },
},

{
    path: 'measurement-unit', loadChildren: './components/measurement-unit/measurement-unit.module#MeasurementUnitModule',
    data: {
      moduleName: 'MeasurementUnit'
    },
},

{
    path: 'sub-activity-type', loadChildren: './components/sub-activity-type/sub-activity-type.module#SubActivityTypeModule',
    data: {
      moduleName: 'SubActivityType'
    },
},

{
    path: 'work-type', loadChildren: './components/work-type/work-type.module#WorkTypeModule',
    data: {
      moduleName: 'WorkType'
    },
},

{
    path: 'activity-type', loadChildren: './components/activity-type/activity-type.module#ActivityTypeModule',
    data: {
      moduleName: 'ActivityType'
    },
},

{
    path: 'assay-model', loadChildren: './components/assay-model/assay-model.module#AssayModelModule',
    data: {
      moduleName: 'AssayModel'
    },
},

{
    path: 'base-type', loadChildren: './components/base-type/base-type.module#BaseTypeModule',
    data: {
      moduleName: 'BaseType'
    },
},

{
    path: 'implementation-activity-schedule', loadChildren: './components/implementation-activity-schedule/implementation-activity-schedule.module#ImplementationActivityScheduleModule',
    data: {
      moduleName: 'ImplementationActivitySchedule'
    },
},

{
    path: 'implementation-data-schedule', loadChildren: './components/implementation-data-schedule/implementation-data-schedule.module#ImplementationDataScheduleModule',
    data: {
      moduleName: 'ImplementationDataSchedule'
    },
},

{
    path: 'material-type', loadChildren: './components/material-type/material-type.module#MaterialTypeModule',
    data: {
      moduleName: 'MaterialType'
    },
},

{
    path: 'measurement-unit', loadChildren: './components/measurement-unit/measurement-unit.module#MeasurementUnitModule',
    data: {
      moduleName: 'MeasurementUnit'
    },
},

{
    path: 'sub-activity-type', loadChildren: './components/sub-activity-type/sub-activity-type.module#SubActivityTypeModule',
    data: {
      moduleName: 'SubActivityType'
    },
},

{
    path: 'work-type', loadChildren: './components/work-type/work-type.module#WorkTypeModule',
    data: {
      moduleName: 'WorkType'
    },
},

{
    path: 'activity-type', loadChildren: './components/activity-type/activity-type.module#ActivityTypeModule',
    data: {
      moduleName: 'ActivityType'
    },
},

{
    path: 'assay-model', loadChildren: './components/assay-model/assay-model.module#AssayModelModule',
    data: {
      moduleName: 'AssayModel'
    },
},

{
    path: 'base-type', loadChildren: './components/base-type/base-type.module#BaseTypeModule',
    data: {
      moduleName: 'BaseType'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayListSubsystemCodeRoutingModule {
}

