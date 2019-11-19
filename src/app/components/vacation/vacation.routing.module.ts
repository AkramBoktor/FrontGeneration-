
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacationComponent } from './vacation.component';


const routes: Routes = [
  {
    path: '',
    component: VacationComponent,
  },

{
    path: 'vacation-contract', loadChildren: './components/vacation-contract/vacation-contract.module#VacationContractModule',
    data: {
      moduleName: 'VacationContract'
    },
},

{
    path: 'vacations-balance', loadChildren: './components/vacations-balance/vacations-balance.module#VacationsBalanceModule',
    data: {
      moduleName: 'VacationsBalance'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class VacationRoutingModule {
}

