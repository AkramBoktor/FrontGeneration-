import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExternalBodiesEquippedForSchoolsGuard } from './shared/external-bodies-equipped-for-schools.guard';
import { ExternalBodiesEquippedForSchoolsNewComponent } from './external-bodies-equipped-for-schools-new/external-bodies-equipped-for-schools-new.component';
import { ExternalBodiesEquippedForSchoolsEditComponent } from './external-bodies-equipped-for-schools-edit/external-bodies-equipped-for-schools-edit.component';
import { ExternalBodiesEquippedForSchoolsListComponent } from './external-bodies-equipped-for-schools-list/external-bodies-equipped-for-schools-list.component';
import { ExternalBodiesEquippedForSchoolsViewComponent } from './external-bodies-equipped-for-schools-view/external-bodies-equipped-for-schools-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalBodiesEquippedForSchoolsListComponent,
    canActivate: [ExternalBodiesEquippedForSchoolsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExternalBodiesEquippedForSchoolsNewComponent,
    canActivate: [ExternalBodiesEquippedForSchoolsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExternalBodiesEquippedForSchoolsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExternalBodiesEquippedForSchoolsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExternalBodiesEquippedForSchoolsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExternalBodiesEquippedForSchoolsRoutingModule {
}
