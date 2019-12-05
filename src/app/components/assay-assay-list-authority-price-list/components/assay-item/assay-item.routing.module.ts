import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayItemGuard } from './shared/assay-item.guard';
import { AssayItemNewComponent } from './assay-item-new/assay-item-new.component';
import { AssayItemEditComponent } from './assay-item-edit/assay-item-edit.component';
import { AssayItemListComponent } from './assay-item-list/assay-item-list.component';
import { AssayItemViewComponent } from './assay-item-view/assay-item-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssayItemListComponent,
    canActivate: [AssayItemGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssayItemNewComponent,
    canActivate: [AssayItemGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssayItemEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssayItemListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssayItemViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayItemRoutingModule {
}
