import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TransferOfSupplyOrdersFromSchoolsClosureGuard } from './shared/transfer-of-supply-orders-from-schools-closure.guard';
import { TransferOfSupplyOrdersFromSchoolsClosureNewComponent } from './transfer-of-supply-orders-from-schools-closure-new/transfer-of-supply-orders-from-schools-closure-new.component';
import { TransferOfSupplyOrdersFromSchoolsClosureEditComponent } from './transfer-of-supply-orders-from-schools-closure-edit/transfer-of-supply-orders-from-schools-closure-edit.component';
import { TransferOfSupplyOrdersFromSchoolsClosureListComponent } from './transfer-of-supply-orders-from-schools-closure-list/transfer-of-supply-orders-from-schools-closure-list.component';
import { TransferOfSupplyOrdersFromSchoolsClosureViewComponent } from './transfer-of-supply-orders-from-schools-closure-view/transfer-of-supply-orders-from-schools-closure-view.component';

const routes: Routes = [
  {
    path: '',
    component: TransferOfSupplyOrdersFromSchoolsClosureListComponent,
    canActivate: [TransferOfSupplyOrdersFromSchoolsClosureGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TransferOfSupplyOrdersFromSchoolsClosureNewComponent,
    canActivate: [TransferOfSupplyOrdersFromSchoolsClosureGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TransferOfSupplyOrdersFromSchoolsClosureEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TransferOfSupplyOrdersFromSchoolsClosureListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TransferOfSupplyOrdersFromSchoolsClosureViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TransferOfSupplyOrdersFromSchoolsClosureRoutingModule {
}
