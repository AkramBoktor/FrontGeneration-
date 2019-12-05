
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BusinessToOthersComponent } from './business-to-others.component';


const routes: Routes = [
  {
    path: '',
    component: BusinessToOthersComponent,
  },
  {
    path: 'service-codes', loadChildren: './components/service-codes/service-codes.module#ServiceCodesModule',
    data: {
      moduleName: 'ServiceCodes'
    },
},

{
    path: 'statement-of-employee-performance-during-a-certain-period', loadChildren: './components/statement-of-employee-performance-during-a-certain-period/statement-of-employee-performance-during-a-certain-period.module#StatementOfEmployeePerformanceDuringACertainPeriodModule',
    data: {
      moduleName: 'StatementOfEmployeePerformanceDuringACertainPeriod'
    },
},

{
    path: 'the-position-of-the-offices-received-from-the-post-office', loadChildren: './components/the-position-of-the-offices-received-from-the-post-office/the-position-of-the-offices-received-from-the-post-office.module#ThePositionOfTheOfficesReceivedFromThePostOfficeModule',
    data: {
      moduleName: 'ThePositionOfTheOfficesReceivedFromThePostOffice'
    },
},

{
    path: 'health-unit-data', loadChildren: './components/health-unit-data/health-unit-data.module#HealthUnitDataModule',
    data: {
      moduleName: 'HealthUnitData'
    },
},

{
    path: 'internal-training-plans', loadChildren: './components/internal-training-plans/internal-training-plans.module#InternalTrainingPlansModule',
    data: {
      moduleName: 'InternalTrainingPlans'
    },
},

{
    path: 'ministry-unit-data', loadChildren: './components/ministry-unit-data/ministry-unit-data.module#MinistryUnitDataModule',
    data: {
      moduleName: 'MinistryUnitData'
    },
},

{
    path: 'new-service-request', loadChildren: './components/new-service-request/new-service-request.module#NewServiceRequestModule',
    data: {
      moduleName: 'NewServiceRequest'
    },
},

{
    path: 'offices-from-the-post-office', loadChildren: './components/offices-from-the-post-office/offices-from-the-post-office.module#OfficesFromThePostOfficeModule',
    data: {
      moduleName: 'OfficesFromThePostOffice'
    },
},

{
    path: 'required-services', loadChildren: './components/required-services/required-services.module#RequiredServicesModule',
    data: {
      moduleName: 'RequiredServices'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BusinessToOthersRoutingModule {
}

