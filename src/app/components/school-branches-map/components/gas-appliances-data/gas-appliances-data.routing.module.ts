import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GasAppliancesDataGuard } from './shared/gas-appliances-data.guard';
import { GasAppliancesDataNewComponent } from './gas-appliances-data-new/gas-appliances-data-new.component';
import { GasAppliancesDataEditComponent } from './gas-appliances-data-edit/gas-appliances-data-edit.component';
import { GasAppliancesDataListComponent } from './gas-appliances-data-list/gas-appliances-data-list.component';
import { GasAppliancesDataViewComponent } from './gas-appliances-data-view/gas-appliances-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: GasAppliancesDataListComponent,
    canActivate: [GasAppliancesDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GasAppliancesDataNewComponent,
    canActivate: [GasAppliancesDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GasAppliancesDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GasAppliancesDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GasAppliancesDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GasAppliancesDataRoutingModule {
}
