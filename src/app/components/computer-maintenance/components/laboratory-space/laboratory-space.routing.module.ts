import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LaboratorySpaceGuard } from './shared/laboratory-space.guard';
import { LaboratorySpaceNewComponent } from './laboratory-space-new/laboratory-space-new.component';
import { LaboratorySpaceEditComponent } from './laboratory-space-edit/laboratory-space-edit.component';
import { LaboratorySpaceListComponent } from './laboratory-space-list/laboratory-space-list.component';
import { LaboratorySpaceViewComponent } from './laboratory-space-view/laboratory-space-view.component';

const routes: Routes = [
  {
    path: '',
    component: LaboratorySpaceListComponent,
    canActivate: [LaboratorySpaceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LaboratorySpaceNewComponent,
    canActivate: [LaboratorySpaceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LaboratorySpaceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LaboratorySpaceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LaboratorySpaceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LaboratorySpaceRoutingModule {
}
