
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssayBuildingWeightFactorListComponent } from './assay-building-weight-factor-list.component';


const routes: Routes = [
  {
    path: '',
    component: AssayBuildingWeightFactorListComponent,
  },
  

{
    path: 'elements-of-assay-items-for-weights-factor-of-a-building', loadChildren: './components/elements-of-assay-items-for-weights-factor-of-a-building/elements-of-assay-items-for-weights-factor-of-a-building.module#ElementsOfAssayItemsForWeightsFactorOfABuildingModule',
    data: {
      moduleName: 'ElementsOfAssayItemsForWeightsFactorOfABuilding'
    },
},

{
    path: 'schedule-on-building-scope', loadChildren: './components/schedule-on-building-scope/schedule-on-building-scope.module#ScheduleOnBuildingScopeModule',
    data: {
      moduleName: 'ScheduleOnBuildingScope'
    },
},

{
    path: 'assay-weights-factor-items', loadChildren: './components/assay-weights-factor-items/assay-weights-factor-items.module#AssayWeightsFactorItemsModule',
    data: {
      moduleName: 'AssayWeightsFactorItems'
    },
},

{
    path: 'binding-item-with-schedule-activities', loadChildren: './components/binding-item-with-schedule-activities/binding-item-with-schedule-activities.module#BindingItemWithScheduleActivitiesModule',
    data: {
      moduleName: 'BindingItemWithScheduleActivities'
    },
},

{
    path: 'binding-items-with-elements-codes', loadChildren: './components/binding-items-with-elements-codes/binding-items-with-elements-codes.module#BindingItemsWithElementsCodesModule',
    data: {
      moduleName: 'BindingItemsWithElementsCodes'
    },
},

];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayBuildingWeightFactorListRoutingModule {
}

