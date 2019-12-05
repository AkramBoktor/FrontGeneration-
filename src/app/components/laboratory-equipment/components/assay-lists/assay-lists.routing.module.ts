import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayListsGuard } from './shared/assay-lists.guard';
import { AssayListsNewComponent } from './assay-lists-new/assay-lists-new.component';
import { AssayListsEditComponent } from './assay-lists-edit/assay-lists-edit.component';
import { AssayListsListComponent } from './assay-lists-list/assay-lists-list.component';
import { AssayListsViewComponent } from './assay-lists-view/assay-lists-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssayListsListComponent,
    canActivate: [AssayListsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssayListsNewComponent,
    canActivate: [AssayListsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssayListsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssayListsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssayListsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayListsRoutingModule {
}
