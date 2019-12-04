import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalExternalBodyEquippedForSchoolsGuard } from './shared/typical-external-body-equipped-for-schools.guard';
import { TypicalExternalBodyEquippedForSchoolsNewComponent } from './typical-external-body-equipped-for-schools-new/typical-external-body-equipped-for-schools-new.component';
import { TypicalExternalBodyEquippedForSchoolsEditComponent } from './typical-external-body-equipped-for-schools-edit/typical-external-body-equipped-for-schools-edit.component';
import { TypicalExternalBodyEquippedForSchoolsListComponent } from './typical-external-body-equipped-for-schools-list/typical-external-body-equipped-for-schools-list.component';
import { TypicalExternalBodyEquippedForSchoolsViewComponent } from './typical-external-body-equipped-for-schools-view/typical-external-body-equipped-for-schools-view.component';

const routes: Routes = [
  {
    path: '',
    component: TypicalExternalBodyEquippedForSchoolsListComponent,
    canActivate: [TypicalExternalBodyEquippedForSchoolsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TypicalExternalBodyEquippedForSchoolsNewComponent,
    canActivate: [TypicalExternalBodyEquippedForSchoolsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TypicalExternalBodyEquippedForSchoolsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TypicalExternalBodyEquippedForSchoolsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TypicalExternalBodyEquippedForSchoolsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalExternalBodyEquippedForSchoolsRoutingModule {
}
