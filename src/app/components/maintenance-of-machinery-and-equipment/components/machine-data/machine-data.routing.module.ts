import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MachineDataGuard } from './shared/machine-data.guard';
import { MachineDataNewComponent } from './machine-data-new/machine-data-new.component';
import { MachineDataEditComponent } from './machine-data-edit/machine-data-edit.component';
import { MachineDataListComponent } from './machine-data-list/machine-data-list.component';
import { MachineDataViewComponent } from './machine-data-view/machine-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: MachineDataListComponent,
    canActivate: [MachineDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MachineDataNewComponent,
    canActivate: [MachineDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MachineDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MachineDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MachineDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MachineDataRoutingModule {
}
