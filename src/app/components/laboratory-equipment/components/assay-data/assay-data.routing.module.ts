import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayDataGuard } from './shared/assay-data.guard';
import { AssayDataNewComponent } from './assay-data-new/assay-data-new.component';
import { AssayDataEditComponent } from './assay-data-edit/assay-data-edit.component';
import { AssayDataListComponent } from './assay-data-list/assay-data-list.component';
import { AssayDataViewComponent } from './assay-data-view/assay-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssayDataListComponent,
    canActivate: [AssayDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssayDataNewComponent,
    canActivate: [AssayDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssayDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssayDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssayDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayDataRoutingModule {
}
