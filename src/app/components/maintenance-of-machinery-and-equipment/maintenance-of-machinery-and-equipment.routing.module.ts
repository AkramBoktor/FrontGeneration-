
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MaintenanceOfMachineryAndEquipmentComponent } from './maintenance-of-machinery-and-equipment.component';


const routes: Routes = [
  {
    path: '',
    component: MaintenanceOfMachineryAndEquipmentComponent,
  },
  
{
    path: 'machine-data', loadChildren: './components/machine-data/machine-data.module#MachineDataModule',
    data: {
      moduleName: 'MachineData'
    },
},

{
    path: 'periodic-maintenance-data', loadChildren: './components/periodic-maintenance-data/periodic-maintenance-data.module#PeriodicMaintenanceDataModule',
    data: {
      moduleName: 'PeriodicMaintenanceData'
    },
},

{
    path: 'different-form-not-extracted', loadChildren: './components/different-form-not-extracted/different-form-not-extracted.module#DifferentFormNotExtractedModule',
    data: {
      moduleName: 'DifferentFormNotExtracted'
    },
},

{
    path: 'equipment-maintenance-plan-data', loadChildren: './components/equipment-maintenance-plan-data/equipment-maintenance-plan-data.module#EquipmentMaintenancePlanDataModule',
    data: {
      moduleName: 'EquipmentMaintenancePlanData'
    },
},

{
    path: 'last-maintenance-date', loadChildren: './components/last-maintenance-date/last-maintenance-date.module#LastMaintenanceDateModule',
    data: {
      moduleName: 'LastMaintenanceDate'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MaintenanceOfMachineryAndEquipmentRoutingModule {
}

