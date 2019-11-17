import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DeliveryWarehousesToKeepersGuard } from './shared/delivery-warehouses-to-keepers.guard';
import { DeliveryWarehousesToKeepersNewComponent } from './delivery-warehouses-to-keepers-new/delivery-warehouses-to-keepers-new.component';
import { DeliveryWarehousesToKeepersEditComponent } from './delivery-warehouses-to-keepers-edit/delivery-warehouses-to-keepers-edit.component';
import { DeliveryWarehousesToKeepersListComponent } from './delivery-warehouses-to-keepers-list/delivery-warehouses-to-keepers-list.component';
import { DeliveryWarehousesToKeepersViewComponent } from './delivery-warehouses-to-keepers-view/delivery-warehouses-to-keepers-view.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryWarehousesToKeepersListComponent,
    canActivate: [DeliveryWarehousesToKeepersGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DeliveryWarehousesToKeepersNewComponent,
    canActivate: [DeliveryWarehousesToKeepersGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DeliveryWarehousesToKeepersEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DeliveryWarehousesToKeepersListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DeliveryWarehousesToKeepersViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DeliveryWarehousesToKeepersRoutingModule {
}
