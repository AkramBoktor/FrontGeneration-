import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SmoothDataGuard } from './shared/smooth-data.guard';
import { SmoothDataNewComponent } from './smooth-data-new/smooth-data-new.component';
import { SmoothDataEditComponent } from './smooth-data-edit/smooth-data-edit.component';
import { SmoothDataListComponent } from './smooth-data-list/smooth-data-list.component';
import { SmoothDataViewComponent } from './smooth-data-view/smooth-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: SmoothDataListComponent,
    canActivate: [SmoothDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SmoothDataNewComponent,
    canActivate: [SmoothDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SmoothDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SmoothDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SmoothDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SmoothDataRoutingModule {
}
