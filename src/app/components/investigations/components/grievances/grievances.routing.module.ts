import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GrievancesGuard } from './shared/grievances.guard';
import { GrievancesNewComponent } from './grievances-new/grievances-new.component';
import { GrievancesEditComponent } from './grievances-edit/grievances-edit.component';
import { GrievancesListComponent } from './grievances-list/grievances-list.component';
import { GrievancesViewComponent } from './grievances-view/grievances-view.component';

const routes: Routes = [
  {
    path: '',
    component: GrievancesListComponent,
    canActivate: [GrievancesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GrievancesNewComponent,
    canActivate: [GrievancesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GrievancesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GrievancesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GrievancesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GrievancesRoutingModule {
}
