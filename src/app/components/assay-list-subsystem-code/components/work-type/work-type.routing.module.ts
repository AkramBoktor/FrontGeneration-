import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { WorkTypeGuard } from './shared/work-type.guard';
import { WorkTypeNewComponent } from './work-type-new/work-type-new.component';
import { WorkTypeEditComponent } from './work-type-edit/work-type-edit.component';
import { WorkTypeListComponent } from './work-type-list/work-type-list.component';
import { WorkTypeViewComponent } from './work-type-view/work-type-view.component';

const routes: Routes = [
  {
    path: '',
    component: WorkTypeListComponent,
    canActivate: [WorkTypeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: WorkTypeNewComponent,
    canActivate: [WorkTypeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: WorkTypeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: WorkTypeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: WorkTypeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class WorkTypeRoutingModule {
}
