
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { WeightsDifferencesComponent } from './weights-differences.component';


const routes: Routes = [
  {
    path: '',
    component: WeightsDifferencesComponent,
  },
  
{
    path: 'elements-of-the-measured-items-due-to-the-weights-factor-of-a-building', loadChildren: './components/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building.module#ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingModule',
    data: {
      moduleName: 'ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding'
    },
},

{
    path: 'link-item-to-time-table', loadChildren: './components/link-item-to-time-table/link-item-to-time-table.module#LinkItemToTimeTableModule',
    data: {
      moduleName: 'LinkItemToTimeTable'
    },
},

{
    path: 'link-items-to-object-codes', loadChildren: './components/link-items-to-object-codes/link-items-to-object-codes.module#LinkItemsToObjectCodesModule',
    data: {
      moduleName: 'LinkItemsToObjectCodes'
    },
},

{
    path: 'schedule-at-the-building-level', loadChildren: './components/schedule-at-the-building-level/schedule-at-the-building-level.module#ScheduleAtTheBuildingLevelModule',
    data: {
      moduleName: 'ScheduleAtTheBuildingLevel'
    },
},

{
    path: 'the-movement-of-material-indices', loadChildren: './components/the-movement-of-material-indices/the-movement-of-material-indices.module#TheMovementOfMaterialIndicesModule',
    data: {
      moduleName: 'TheMovementOfMaterialIndices'
    },
},

{
    path: 'the-planned-start-date-for-the-schedule', loadChildren: './components/the-planned-start-date-for-the-schedule/the-planned-start-date-for-the-schedule.module#ThePlannedStartDateForTheScheduleModule',
    data: {
      moduleName: 'ThePlannedStartDateForTheSchedule'
    },
},

{
    path: 'timetable', loadChildren: './components/timetable/timetable.module#TimetableModule',
    data: {
      moduleName: 'Timetable'
    },
},

{
    path: 'weights-factor', loadChildren: './components/weights-factor/weights-factor.module#WeightsFactorModule',
    data: {
      moduleName: 'WeightsFactor'
    },
},

{
    path: 'assay-items-due-to-weights-factor', loadChildren: './components/assay-items-due-to-weights-factor/assay-items-due-to-weights-factor.module#AssayItemsDueToWeightsFactorModule',
    data: {
      moduleName: 'AssayItemsDueToWeightsFactor'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class WeightsDifferencesRoutingModule {
}

