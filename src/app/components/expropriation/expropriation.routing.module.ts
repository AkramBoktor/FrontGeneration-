
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExpropriationComponent } from './expropriation.component';


const routes: Routes = [
  {
    path: '',
    component: ExpropriationComponent,
  },

{
    path: 'people-assembly-approval', loadChildren: './components/people-assembly-approval/people-assembly-approval.module#PeopleAssemblyApprovalModule',
    data: {
      moduleName: 'PeopleAssemblyApproval'
    },
},

{
    path: 'sales-forms', loadChildren: './components/sales-forms/sales-forms.module#SalesFormsModule',
    data: {
      moduleName: 'SalesForms'
    },
},

{
    path: 'temporary-seizure-data', loadChildren: './components/temporary-seizure-data/temporary-seizure-data.module#TemporarySeizureDataModule',
    data: {
      moduleName: 'TemporarySeizureData'
    },
},

{
    path: 'business-cost-checks', loadChildren: './components/business-cost-checks/business-cost-checks.module#BusinessCostChecksModule',
    data: {
      moduleName: 'BusinessCostChecks'
    },
},

{
    path: 'expropriation-data-after-the-prime-minister-decision', loadChildren: './components/expropriation-data-after-the-prime-minister-decision/expropriation-data-after-the-prime-minister-decision.module#ExpropriationDataAfterThePrimeMinisterDecisionModule',
    data: {
      moduleName: 'ExpropriationDataAfterThePrimeMinisterDecision'
    },
},

{
    path: 'expropriation-data-before-the-prime-minister-decision', loadChildren: './components/expropriation-data-before-the-prime-minister-decision/expropriation-data-before-the-prime-minister-decision.module#ExpropriationDataBeforeThePrimeMinisterDecisionModule',
    data: {
      moduleName: 'ExpropriationDataBeforeThePrimeMinisterDecision'
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

