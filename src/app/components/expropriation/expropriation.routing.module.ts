
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExpropriationComponent } from './expropriation.component';


const routes: Routes = [
  {
    path: '',
    component: ExpropriationComponent,
  },
  

{
    path: 'expropriation-before-decision', loadChildren: './components/expropriation-before-decision/expropriation-before-decision.module#ExpropriationBeforeDecisionModule',
    data: {
      moduleName: 'ExpropriationBeforeDecision'
    },
},

{
    path: 'expropriation-after-decision', loadChildren: './components/expropriation-after-decision/expropriation-after-decision.module#ExpropriationAfterDecisionModule',
    data: {
      moduleName: 'ExpropriationAfterDecision'
    },
},


{
    path: 'sales-forms', loadChildren: './components/sales-forms/sales-forms.module#SalesFormsModule',
    data: {
      moduleName: 'SalesForms'
    },
},

{
    path: 'business-cost-checks', loadChildren: './components/business-cost-checks/business-cost-checks.module#BusinessCostChecksModule',
    data: {
      moduleName: 'BusinessCostChecks'
    },
},

{
    path: 'temporary-seizure-data', loadChildren: './components/temporary-seizure-data/temporary-seizure-data.module#TemporarySeizureDataModule',
    data: {
      moduleName: 'TemporarySeizureData'
    },
},
 

{
    path: 'people-assembly-approval', loadChildren: './components/people-assembly-approval/people-assembly-approval.module#PeopleAssemblyApprovalModule',
    data: {
      moduleName: 'PeopleAssemblyApproval'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExpropriationRoutingModule {
}

