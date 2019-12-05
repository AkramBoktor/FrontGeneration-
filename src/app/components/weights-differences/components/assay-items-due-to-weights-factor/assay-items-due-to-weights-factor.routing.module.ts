import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayItemsDueToWeightsFactorGuard } from './shared/assay-items-due-to-weights-factor.guard';
import { AssayItemsDueToWeightsFactorNewComponent } from './assay-items-due-to-weights-factor-new/assay-items-due-to-weights-factor-new.component';
import { AssayItemsDueToWeightsFactorEditComponent } from './assay-items-due-to-weights-factor-edit/assay-items-due-to-weights-factor-edit.component';
import { AssayItemsDueToWeightsFactorListComponent } from './assay-items-due-to-weights-factor-list/assay-items-due-to-weights-factor-list.component';
import { AssayItemsDueToWeightsFactorViewComponent } from './assay-items-due-to-weights-factor-view/assay-items-due-to-weights-factor-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssayItemsDueToWeightsFactorListComponent,
    canActivate: [AssayItemsDueToWeightsFactorGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssayItemsDueToWeightsFactorNewComponent,
    canActivate: [AssayItemsDueToWeightsFactorGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssayItemsDueToWeightsFactorEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssayItemsDueToWeightsFactorListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssayItemsDueToWeightsFactorViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayItemsDueToWeightsFactorRoutingModule {
}
