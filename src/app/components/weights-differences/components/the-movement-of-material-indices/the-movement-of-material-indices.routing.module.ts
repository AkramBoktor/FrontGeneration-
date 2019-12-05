import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TheMovementOfMaterialIndicesGuard } from './shared/the-movement-of-material-indices.guard';
import { TheMovementOfMaterialIndicesNewComponent } from './the-movement-of-material-indices-new/the-movement-of-material-indices-new.component';
import { TheMovementOfMaterialIndicesEditComponent } from './the-movement-of-material-indices-edit/the-movement-of-material-indices-edit.component';
import { TheMovementOfMaterialIndicesListComponent } from './the-movement-of-material-indices-list/the-movement-of-material-indices-list.component';
import { TheMovementOfMaterialIndicesViewComponent } from './the-movement-of-material-indices-view/the-movement-of-material-indices-view.component';

const routes: Routes = [
  {
    path: '',
    component: TheMovementOfMaterialIndicesListComponent,
    canActivate: [TheMovementOfMaterialIndicesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TheMovementOfMaterialIndicesNewComponent,
    canActivate: [TheMovementOfMaterialIndicesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TheMovementOfMaterialIndicesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TheMovementOfMaterialIndicesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TheMovementOfMaterialIndicesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TheMovementOfMaterialIndicesRoutingModule {
}
