import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MaterialTypeGuard } from './shared/material-type.guard';
import { MaterialTypeNewComponent } from './material-type-new/material-type-new.component';
import { MaterialTypeEditComponent } from './material-type-edit/material-type-edit.component';
import { MaterialTypeListComponent } from './material-type-list/material-type-list.component';
import { MaterialTypeViewComponent } from './material-type-view/material-type-view.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialTypeListComponent,
    canActivate: [MaterialTypeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MaterialTypeNewComponent,
    canActivate: [MaterialTypeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MaterialTypeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MaterialTypeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MaterialTypeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MaterialTypeRoutingModule {
}
