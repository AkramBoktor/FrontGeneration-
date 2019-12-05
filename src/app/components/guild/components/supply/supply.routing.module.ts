import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SupplyGuard } from './shared/supply.guard';
import { SupplyNewComponent } from './supply-new/supply-new.component';
import { SupplyEditComponent } from './supply-edit/supply-edit.component';
import { SupplyListComponent } from './supply-list/supply-list.component';
import { SupplyViewComponent } from './supply-view/supply-view.component';

const routes: Routes = [
  {
    path: '',
    component: SupplyListComponent,
    canActivate: [SupplyGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SupplyNewComponent,
    canActivate: [SupplyGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SupplyEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SupplyListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SupplyViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SupplyRoutingModule {
}
