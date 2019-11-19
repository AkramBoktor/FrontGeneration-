import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { VacationsBalanceGuard } from './shared/vacations-balance.guard';
import { VacationsBalanceNewComponent } from './vacations-balance-new/vacations-balance-new.component';
import { VacationsBalanceEditComponent } from './vacations-balance-edit/vacations-balance-edit.component';
import { VacationsBalanceListComponent } from './vacations-balance-list/vacations-balance-list.component';
import { VacationsBalanceViewComponent } from './vacations-balance-view/vacations-balance-view.component';

const routes: Routes = [
  {
    path: '',
    component: VacationsBalanceListComponent,
    canActivate: [VacationsBalanceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: VacationsBalanceNewComponent,
    canActivate: [VacationsBalanceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: VacationsBalanceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: VacationsBalanceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: VacationsBalanceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class VacationsBalanceRoutingModule {
}
