import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayModelGuard } from './shared/assay-model.guard';
import { AssayModelNewComponent } from './assay-model-new/assay-model-new.component';
import { AssayModelEditComponent } from './assay-model-edit/assay-model-edit.component';
import { AssayModelListComponent } from './assay-model-list/assay-model-list.component';
import { AssayModelViewComponent } from './assay-model-view/assay-model-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssayModelListComponent,
    canActivate: [AssayModelGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssayModelNewComponent,
    canActivate: [AssayModelGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssayModelEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssayModelListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssayModelViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayModelRoutingModule {
}
