import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayWeightsFactorItemsGuard } from './shared/assay-weights-factor-items.guard';
import { AssayWeightsFactorItemsNewComponent } from './assay-weights-factor-items-new/assay-weights-factor-items-new.component';
import { AssayWeightsFactorItemsEditComponent } from './assay-weights-factor-items-edit/assay-weights-factor-items-edit.component';
import { AssayWeightsFactorItemsListComponent } from './assay-weights-factor-items-list/assay-weights-factor-items-list.component';
import { AssayWeightsFactorItemsViewComponent } from './assay-weights-factor-items-view/assay-weights-factor-items-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssayWeightsFactorItemsListComponent,
    canActivate: [AssayWeightsFactorItemsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssayWeightsFactorItemsNewComponent,
    canActivate: [AssayWeightsFactorItemsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssayWeightsFactorItemsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssayWeightsFactorItemsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssayWeightsFactorItemsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayWeightsFactorItemsRoutingModule {
}
