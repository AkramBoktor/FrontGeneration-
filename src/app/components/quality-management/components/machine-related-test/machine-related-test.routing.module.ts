import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MachineRelatedTestGuard } from './shared/machine-related-test.guard';
import { MachineRelatedTestNewComponent } from './machine-related-test-new/machine-related-test-new.component';
import { MachineRelatedTestEditComponent } from './machine-related-test-edit/machine-related-test-edit.component';
import { MachineRelatedTestListComponent } from './machine-related-test-list/machine-related-test-list.component';
import { MachineRelatedTestViewComponent } from './machine-related-test-view/machine-related-test-view.component';

const routes: Routes = [
  {
    path: '',
    component: MachineRelatedTestListComponent,
    canActivate: [MachineRelatedTestGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MachineRelatedTestNewComponent,
    canActivate: [MachineRelatedTestGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MachineRelatedTestEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MachineRelatedTestListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MachineRelatedTestViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MachineRelatedTestRoutingModule {
}
