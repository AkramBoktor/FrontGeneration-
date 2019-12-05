
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HealthUnitsMinistryOfSolidarityPostalAuthorityComponent } from './health-units-ministry.component';


const routes: Routes = [
  {
    path: '',
    component: HealthUnitsMinistryOfSolidarityPostalAuthorityComponent,
  },
  

{
    path: 'external-services-codes-and-cost', loadChildren: './components/external-services-codes-and-cost/external-services-codes-and-cost.module#ExternalServicesCodesAndCostModule',
    data: {
      moduleName: 'ExternalServicesCodesAndCost'
    },
},

{
    path: 'new-services-requests', loadChildren: './components/new-services-requests/new-services-requests.module#NewServicesRequestsModule',
    data: {
      moduleName: 'NewServicesRequests'
    },
},

{
    path: 'required-serviceses', loadChildren: './components/required-serviceses/required-serviceses.module#RequiredServicesesModule',
    data: {
      moduleName: 'RequiredServiceses'
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

