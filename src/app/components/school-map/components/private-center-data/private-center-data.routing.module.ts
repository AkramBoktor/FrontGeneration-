import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PrivateCenterDataGuard } from './shared/private-center-data.guard';
import { PrivateCenterDataNewComponent } from './private-center-data-new/private-center-data-new.component';
import { PrivateCenterDataEditComponent } from './private-center-data-edit/private-center-data-edit.component';
import { PrivateCenterDataListComponent } from './private-center-data-list/private-center-data-list.component';
import { PrivateCenterDataViewComponent } from './private-center-data-view/private-center-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateCenterDataListComponent,
    canActivate: [PrivateCenterDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PrivateCenterDataNewComponent,
    canActivate: [PrivateCenterDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PrivateCenterDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PrivateCenterDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PrivateCenterDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PrivateCenterDataRoutingModule {
}
