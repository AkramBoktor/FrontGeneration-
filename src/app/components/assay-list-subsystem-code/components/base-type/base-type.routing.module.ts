import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BaseTypeGuard } from './shared/base-type.guard';
import { BaseTypeNewComponent } from './base-type-new/base-type-new.component';
import { BaseTypeEditComponent } from './base-type-edit/base-type-edit.component';
import { BaseTypeListComponent } from './base-type-list/base-type-list.component';
import { BaseTypeViewComponent } from './base-type-view/base-type-view.component';

const routes: Routes = [
  {
    path: '',
    component: BaseTypeListComponent,
    canActivate: [BaseTypeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BaseTypeNewComponent,
    canActivate: [BaseTypeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BaseTypeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BaseTypeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BaseTypeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BaseTypeRoutingModule {
}
