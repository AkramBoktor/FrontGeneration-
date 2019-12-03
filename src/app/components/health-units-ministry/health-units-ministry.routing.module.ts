
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HealthUnitsMinistryOfSolidarityPostalAuthorityComponent } from './health-units-ministry.component';


const routes: Routes = [
  {
    path: '',
    component: HealthUnitsMinistryOfSolidarityPostalAuthorityComponent,
  },
  
{
    path: 'new-service-request', loadChildren: './components/new-service-request/new-service-request.module#NewServiceRequestModule',
    data: {
      moduleName: 'NewServiceRequest'
    },
},

{
    path: 'required-services', loadChildren: './components/required-services/required-services.module#RequiredServicesModule',
    data: {
      moduleName: 'RequiredServices'
    },
},

{
    path: 'external-services-codes-and-cost', loadChildren: './components/external-services-codes-and-cost/external-services-codes-and-cost.module#ExternalServicesCodesAndCostModule',
    data: {
      moduleName: 'ExternalServicesCodesAndCost'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class HealthUnitsMinistryOfSolidarityPostalAuthorityRoutingModule {
}

