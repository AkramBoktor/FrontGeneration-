
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ComputerMaintenanceComponent } from './computer-maintenance.component';


const routes: Routes = [
  {
    path: '',
    component: ComputerMaintenanceComponent,
  },
   
   
	{
		path: 'add-plan-conditioning', loadChildren: './components/add-plan-conditioning/add-plan-conditioning.module#AddPlanConditioningModule',
		data: {
		  moduleName: 'AddPlanConditioning'
		},
	},

	{
		path: 'add-plan', loadChildren: './components/add-plan/add-plan.module#AddPlanModule',
		data: {
		  moduleName: 'AddPlan'
		},
	},

	{
		path: 'add-the-implementation-of-air-conditioning-maintenance', loadChildren: './components/add-the-implementation-of-air-conditioning-maintenance/add-the-implementation-of-air-conditioning-maintenance.module#AddTheImplementationOfAirConditioningMaintenanceModule',
		data: {
		  moduleName: 'AddTheImplementationOfAirConditioningMaintenance'
		},
	},

	{
		path: 'device-cancellation', loadChildren: './components/device-cancellation/device-cancellation.module#DeviceCancellationModule',
		data: {
		  moduleName: 'DeviceCancellation'
		},
	},

	{
		path: 'laboratory-space', loadChildren: './components/laboratory-space/laboratory-space.module#LaboratorySpaceModule',
		data: {
		  moduleName: 'LaboratorySpace'
		},
	},

	{
		path: 'malfunction', loadChildren: './components/malfunction/malfunction.module#MalfunctionModule',
		data: {
		  moduleName: 'Malfunction'
		},
	},

	{
		path: 'master-file', loadChildren: './components/master-file/master-file.module#MasterFileModule',
		data: {
		  moduleName: 'MasterFile'
		},
	},

	{
		path: 'master-files-department', loadChildren: './components/master-files-department/master-files-department.module#MasterFilesDepartmentModule',
		data: {
		  moduleName: 'MasterFilesDepartment'
		},
	},

	{
		path: 'school-lab', loadChildren: './components/school-lab/school-lab.module#SchoolLabModule',
		data: {
		  moduleName: 'SchoolLab'
		},
	},

	{
		path: 'add-maintenance-implementation', loadChildren: './components/add-maintenance-implementation/add-maintenance-implementation.module#AddMaintenanceImplementationModule',
		data: {
		  moduleName: 'AddMaintenanceImplementation'
		},
	}


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ComputerMaintenanceRoutingModule {
}

