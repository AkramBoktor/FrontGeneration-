import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LabDataGuard } from './shared/lab-data.guard';
import { LabDataNewComponent } from './lab-data-new/lab-data-new.component';
import { LabDataEditComponent } from './lab-data-edit/lab-data-edit.component';
import { LabDataListComponent } from './lab-data-list/lab-data-list.component';
import { LabDataViewComponent } from './lab-data-view/lab-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: LabDataListComponent,
    canActivate: [LabDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LabDataNewComponent,
    canActivate: [LabDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LabDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LabDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LabDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LabDataRoutingModule {
}
