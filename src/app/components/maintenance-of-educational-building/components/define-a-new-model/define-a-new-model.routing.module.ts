import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DefineANewModelGuard } from './shared/define-a-new-model.guard';
import { DefineANewModelNewComponent } from './define-a-new-model-new/define-a-new-model-new.component';
import { DefineANewModelEditComponent } from './define-a-new-model-edit/define-a-new-model-edit.component';
import { DefineANewModelListComponent } from './define-a-new-model-list/define-a-new-model-list.component';
import { DefineANewModelViewComponent } from './define-a-new-model-view/define-a-new-model-view.component';

const routes: Routes = [
  {
    path: '',
    component: DefineANewModelListComponent,
    canActivate: [DefineANewModelGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DefineANewModelNewComponent,
    canActivate: [DefineANewModelGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DefineANewModelEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DefineANewModelListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DefineANewModelViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DefineANewModelRoutingModule {
}
