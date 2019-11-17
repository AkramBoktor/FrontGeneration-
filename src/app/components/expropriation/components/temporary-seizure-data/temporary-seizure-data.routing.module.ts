import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TemporarySeizureDataGuard } from './shared/temporary-seizure-data.guard';
import { TemporarySeizureDataNewComponent } from './temporary-seizure-data-new/temporary-seizure-data-new.component';
import { TemporarySeizureDataEditComponent } from './temporary-seizure-data-edit/temporary-seizure-data-edit.component';
import { TemporarySeizureDataListComponent } from './temporary-seizure-data-list/temporary-seizure-data-list.component';
import { TemporarySeizureDataViewComponent } from './temporary-seizure-data-view/temporary-seizure-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: TemporarySeizureDataListComponent,
    canActivate: [TemporarySeizureDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TemporarySeizureDataNewComponent,
    canActivate: [TemporarySeizureDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TemporarySeizureDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TemporarySeizureDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TemporarySeizureDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TemporarySeizureDataRoutingModule {
}
