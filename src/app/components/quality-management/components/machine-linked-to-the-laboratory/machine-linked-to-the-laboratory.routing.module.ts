import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MachineLinkedToTheLaboratoryGuard } from './shared/machine-linked-to-the-laboratory.guard';
import { MachineLinkedToTheLaboratoryNewComponent } from './machine-linked-to-the-laboratory-new/machine-linked-to-the-laboratory-new.component';
import { MachineLinkedToTheLaboratoryEditComponent } from './machine-linked-to-the-laboratory-edit/machine-linked-to-the-laboratory-edit.component';
import { MachineLinkedToTheLaboratoryListComponent } from './machine-linked-to-the-laboratory-list/machine-linked-to-the-laboratory-list.component';
import { MachineLinkedToTheLaboratoryViewComponent } from './machine-linked-to-the-laboratory-view/machine-linked-to-the-laboratory-view.component';

const routes: Routes = [
  {
    path: '',
    component: MachineLinkedToTheLaboratoryListComponent,
    canActivate: [MachineLinkedToTheLaboratoryGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MachineLinkedToTheLaboratoryNewComponent,
    canActivate: [MachineLinkedToTheLaboratoryGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MachineLinkedToTheLaboratoryEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MachineLinkedToTheLaboratoryListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MachineLinkedToTheLaboratoryViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MachineLinkedToTheLaboratoryRoutingModule {
}
