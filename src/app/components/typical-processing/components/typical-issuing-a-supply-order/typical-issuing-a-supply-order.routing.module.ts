import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalIssuingASupplyOrderGuard } from './shared/typical-issuing-a-supply-order.guard';
import { TypicalIssuingASupplyOrderNewComponent } from './typical-issuing-a-supply-order-new/typical-issuing-a-supply-order-new.component';
import { TypicalIssuingASupplyOrderEditComponent } from './typical-issuing-a-supply-order-edit/typical-issuing-a-supply-order-edit.component';
import { TypicalIssuingASupplyOrderListComponent } from './typical-issuing-a-supply-order-list/typical-issuing-a-supply-order-list.component';
import { TypicalIssuingASupplyOrderViewComponent } from './typical-issuing-a-supply-order-view/typical-issuing-a-supply-order-view.component';

const routes: Routes = [
  {
    path: '',
    component: TypicalIssuingASupplyOrderListComponent,
    canActivate: [TypicalIssuingASupplyOrderGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TypicalIssuingASupplyOrderNewComponent,
    canActivate: [TypicalIssuingASupplyOrderGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TypicalIssuingASupplyOrderEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TypicalIssuingASupplyOrderListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TypicalIssuingASupplyOrderViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalIssuingASupplyOrderRoutingModule {
}
