import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FactoryNameForOrderGuard } from './shared/factory-name-for-order.guard';
import { FactoryNameForOrderNewComponent } from './factory-name-for-order-new/factory-name-for-order-new.component';
import { FactoryNameForOrderEditComponent } from './factory-name-for-order-edit/factory-name-for-order-edit.component';
import { FactoryNameForOrderListComponent } from './factory-name-for-order-list/factory-name-for-order-list.component';
import { FactoryNameForOrderViewComponent } from './factory-name-for-order-view/factory-name-for-order-view.component';

const routes: Routes = [
  {
    path: '',
    component: FactoryNameForOrderListComponent,
    canActivate: [FactoryNameForOrderGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FactoryNameForOrderNewComponent,
    canActivate: [FactoryNameForOrderGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FactoryNameForOrderEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FactoryNameForOrderListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FactoryNameForOrderViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FactoryNameForOrderRoutingModule {
}
