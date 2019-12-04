
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExtractComponent } from './extract.component';


const routes: Routes = [
  {
    path: '',
    component: ExtractComponent,
  },
{
    path: 'password-for-the-supervisor-engineer', loadChildren: './components/password-for-the-supervisor-engineer/password-for-the-supervisor-engineer.module#PasswordForTheSupervisorEngineerModule',
    data: {
      moduleName: 'PasswordForTheSupervisorEngineer'
    },
},

{
    path: 'price-for-new-item', loadChildren: './components/price-for-new-item/price-for-new-item.module#PriceForNewItemModule',
    data: {
      moduleName: 'PriceForNewItem'
    },
},

{
    path: 'abstract-statement-maintenance', loadChildren: './components/abstract-statement-maintenance/abstract-statement-maintenance.module#AbstractStatementMaintenanceModule',
    data: {
      moduleName: 'AbstractStatementMaintenance'
    },
},

{
    path: 'abstract-statement-structural', loadChildren: './components/abstract-statement-structural/abstract-statement-structural.module#AbstractStatementStructuralModule',
    data: {
      moduleName: 'AbstractStatementStructural'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExtractRoutingModule {
}

